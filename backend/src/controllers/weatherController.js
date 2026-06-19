const { geocodeLocation, reverseGeocode, getWeatherData } = require('../services/weatherService');
const prisma = require('../utils/prisma');

async function searchByLocation(req, res, next) {
  try {
    const { location, startDate, endDate } = req.body;

    const geo = await geocodeLocation(location);
    const weather = await getWeatherData(geo.latitude, geo.longitude);

    const record = await prisma.weatherSearch.create({
      data: {
        location: geo.displayName,
        latitude: geo.latitude,
        longitude: geo.longitude,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        temperature: weather.current.temperature,
        feelsLike: weather.current.feelsLike,
        humidity: weather.current.humidity,
        windSpeed: weather.current.windSpeed,
        weatherCode: weather.current.weatherCode,
        airQualityIndex: weather.airQualityIndex,
        recommendation: weather.recommendation,
      },
    });

    res.json({
      id: record.id,
      location: geo.displayName,
      latitude: geo.latitude,
      longitude: geo.longitude,
      weather,
    });
  } catch (err) {
    next(err);
  }
}

async function searchByCoordinates(req, res, next) {
  try {
    const { latitude, longitude, startDate, endDate } = req.body;

    const [geo, weather] = await Promise.all([
      reverseGeocode(latitude, longitude),
      getWeatherData(latitude, longitude),
    ]);

    const record = await prisma.weatherSearch.create({
      data: {
        location: geo.displayName,
        latitude,
        longitude,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        temperature: weather.current.temperature,
        feelsLike: weather.current.feelsLike,
        humidity: weather.current.humidity,
        windSpeed: weather.current.windSpeed,
        weatherCode: weather.current.weatherCode,
        airQualityIndex: weather.airQualityIndex,
        recommendation: weather.recommendation,
      },
    });

    res.json({
      id: record.id,
      location: geo.displayName,
      latitude,
      longitude,
      weather,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { searchByLocation, searchByCoordinates };
