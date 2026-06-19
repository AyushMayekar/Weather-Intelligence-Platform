const axios = require('axios');

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const AQI_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality';

// WMO Weather Code descriptions
const WEATHER_DESCRIPTIONS = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Icy fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Heavy drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Slight snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  77: 'Snow grains',
  80: 'Slight showers',
  81: 'Moderate showers',
  82: 'Violent showers',
  85: 'Snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with hail',
  99: 'Thunderstorm with heavy hail',
};

async function geocodeLocation(location) {
  const response = await axios.get(GEO_URL, {
    params: {
      name: location,
      count: 1,
      language: 'en',
      format: 'json',
    },
  });

  if (!response.data.results || response.data.results.length === 0) {
    const err = new Error(`Location "${location}" not found`);
    err.status = 404;
    throw err;
  }

  const result = response.data.results[0];

  return {
    name: result.name,
    country: result.country,
    latitude: result.latitude,
    longitude: result.longitude,
    displayName: `${result.name}${result.admin1 ? `, ${result.admin1}` : ''}, ${result.country}`,
  };
}

async function reverseGeocode(lat, lon) {
  const response = await axios.get(
    'https://nominatim.openstreetmap.org/reverse',
    {
      params: {
        lat,
        lon,
        format: 'json',
      },
      headers: {
        'User-Agent': 'WeatherIntelligenceApp/1.0',
      },
    }
  );

  const addr = response.data.address || {};

  const city =
    addr.city ||
    addr.town ||
    addr.village ||
    addr.county ||
    'Unknown';

  const country = addr.country || '';

  return {
    name: city,
    displayName: `${city}${country ? `, ${country}` : ''}`,
  };
}

async function fetchForecast(lat, lon) {
  try {
    const response = await axios.get(FORECAST_URL, {
      params: {
        latitude: lat,
        longitude: lon,

        current: [
          'temperature_2m',
          'apparent_temperature',
          'relative_humidity_2m',
          'wind_speed_10m',
          'weather_code',
        ].join(','),

        hourly: [
          'uv_index',
          'precipitation_probability',
        ].join(','),

        daily: [
          'weather_code',
          'temperature_2m_max',
          'temperature_2m_min',
          'precipitation_probability_max',
          'sunrise',
          'sunset',
        ].join(','),

        timezone: 'auto',
        forecast_days: 5,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      'Open-Meteo Forecast Error:',
      error.response?.data || error.message
    );

    throw error;
  }
}

async function fetchAirQuality(lat, lon) {
  try {
    const response = await axios.get(AQI_URL, {
      params: {
        latitude: lat,
        longitude: lon,
        current: 'european_aqi',
        timezone: 'auto',
      },
    });

    return response.data?.current?.european_aqi ?? null;
  } catch (error) {
    console.error(
      'Open-Meteo AQI Error:',
      error.response?.data || error.message
    );

    return null;
  }
}

function buildRecommendation(current, aqi) {
  const recommendations = [];

  const code = current.weatherCode;
  const temp = current.temperature;
  const wind = current.windSpeed;
  const uv = current.uvIndex;
  const precip = current.precipitationProbability;

  if ([61, 63, 65, 80, 81, 82].includes(code) || precip > 50) {
    recommendations.push('Carry an umbrella, rain is likely.');
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    recommendations.push('Dress warmly, snow is expected.');
  }

  if (uv >= 8) {
    recommendations.push('Apply sunscreen, UV index is very high.');
  } else if (uv >= 6) {
    recommendations.push('Sunscreen recommended, UV is moderate to high.');
  }

  if (wind > 50) {
    recommendations.push('Strong winds expected, secure loose items.');
  }

  if (aqi !== null && aqi > 100) {
    recommendations.push('Air quality is poor, limit outdoor exposure.');
  } else if (aqi !== null && aqi > 50) {
    recommendations.push(
      'Air quality is moderate, sensitive groups should be cautious.'
    );
  }

  if (temp < 5) {
    recommendations.push('Freezing temperatures, bundle up.');
  } else if (temp > 35) {
    recommendations.push('Extreme heat, stay hydrated and seek shade.');
  }

  if (recommendations.length === 0 && code <= 2) {
    recommendations.push('Great weather for outdoor activities!');
  }

  return recommendations.join(' ');
}

function buildTravelReadiness(current, aqi) {
  const code = current.weatherCode;
  const wind = current.windSpeed;
  const precip = current.precipitationProbability;

  let risk = 0;

  if ([95, 96, 99].includes(code)) risk += 3;
  else if ([61, 63, 65, 80, 81, 82, 71, 73, 75].includes(code)) risk += 2;
  else if ([51, 53, 55].includes(code) || precip > 50) risk += 1;

  if (wind > 60) risk += 2;
  else if (wind > 40) risk += 1;

  if (aqi !== null && aqi > 150) risk += 2;
  else if (aqi !== null && aqi > 100) risk += 1;

  if (risk === 0) return 'Great day for travel';
  if (risk <= 2) return 'Moderate weather risk';

  return 'Severe weather caution';
}

async function getWeatherData(lat, lon) {
  const [forecast, aqi] = await Promise.all([
    fetchForecast(lat, lon),
    fetchAirQuality(lat, lon),
  ]);

  const current = forecast.current;
  const daily = forecast.daily;
  const hourly = forecast.hourly;

  const currentTime = current.time;

  const currentHourIndex = hourly.time.findIndex(
    (time) => time === currentTime
  );

  const uvIndex =
    currentHourIndex >= 0
      ? hourly.uv_index[currentHourIndex]
      : null;

  const precipitationProbability =
    currentHourIndex >= 0
      ? hourly.precipitation_probability[currentHourIndex]
      : null;

  const normalizedCurrent = {
    temperature: current.temperature_2m,
    feelsLike: current.apparent_temperature,
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,
    weatherCode: current.weather_code,
    weatherDescription:
      WEATHER_DESCRIPTIONS[current.weather_code] || 'Unknown',
    uvIndex,
    precipitationProbability,
    sunrise: daily.sunrise[0],
    sunset: daily.sunset[0],
  };

  const recommendation = buildRecommendation(
    normalizedCurrent,
    aqi
  );

  const travelReadiness = buildTravelReadiness(
    normalizedCurrent,
    aqi
  );

  const fiveDayForecast = daily.time.map((date, i) => ({
    date,
    tempMax: daily.temperature_2m_max[i],
    tempMin: daily.temperature_2m_min[i],
    weatherCode: daily.weather_code[i],
    weatherDescription:
      WEATHER_DESCRIPTIONS[daily.weather_code[i]] || 'Unknown',
    precipProbability: daily.precipitation_probability_max[i],
    sunrise: daily.sunrise[i],
    sunset: daily.sunset[i],
  }));

  return {
    current: normalizedCurrent,
    airQualityIndex: aqi,
    fiveDayForecast,
    recommendation,
    travelReadiness,
    timezone: forecast.timezone,
  };
}

module.exports = {
  geocodeLocation,
  reverseGeocode,
  getWeatherData,
  WEATHER_DESCRIPTIONS,
};