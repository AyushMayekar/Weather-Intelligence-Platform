import { useState } from 'react';
import { searchByLocation, searchByCoordinates } from '../api/client';
import { useGeolocation } from '../hooks/useGeolocation';
import SearchBar from '../components/SearchBar';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import RecommendationCard from '../components/RecommendationCard';
import AirQualityCard from '../components/AirQualityCard';
import ForecastList from '../components/ForecastList';
import LocationMap from '../components/LocationMap';
import { ErrorBanner, EmptyState, LoadingSkeleton } from '../components/StatusViews';
import { CloudSun } from 'lucide-react';

export default function Dashboard() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getPosition, loading: locationLoading } = useGeolocation();

  async function handleSearch({ location, startDate, endDate }) {
    setLoading(true);
    setError(null);
    try {
      const data = await searchByLocation({ location, startDate, endDate });
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUseLocation() {
    setError(null);
    try {
      const { latitude, longitude } = await getPosition();
      setLoading(true);
      const today = new Date().toISOString().split('T')[0];
      const end = new Date();
      end.setDate(end.getDate() + 4);
      const endDate = end.toISOString().split('T')[0];

      const data = await searchByCoordinates({
        latitude,
        longitude,
        startDate: today,
        endDate,
      });
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">
      <div className="fade-in">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>
          Weather Dashboard
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Search any location for live weather, forecasts, and travel insight.
        </p>
      </div>

      <SearchBar
        onSearch={handleSearch}
        onUseLocation={handleUseLocation}
        loading={loading}
        locationLoading={locationLoading}
      />

      <ErrorBanner message={error} onDismiss={() => setError(null)} />

      {loading && <LoadingSkeleton />}

      {!loading && !result && !error && (
        <EmptyState
          icon={CloudSun}
          title="Search for a location to get started"
          description="Enter a city, postal code, or use your current location, to see live weather and a 5-day forecast."
        />
      )}

      {!loading && result && (
        <>
          <CurrentWeatherCard location={result.location} current={result.weather.current} />

          <div className="weather-grid">
            <RecommendationCard
              recommendation={result.weather.recommendation}
              travelReadiness={result.weather.travelReadiness}
              location={result.location}
            />
            <AirQualityCard aqi={result.weather.airQualityIndex} />
          </div>

          <ForecastList forecast={result.weather.fiveDayForecast} />

          <LocationMap latitude={result.latitude} longitude={result.longitude} location={result.location} />
        </>
      )}
    </div>
  );
}
