import { Droplets, Wind, Sunrise, Sunset, CloudRain, Gauge, MapPin } from 'lucide-react';
import { getWeatherIcon, formatTime } from '../utils/weatherUtils';

export default function CurrentWeatherCard({ location, current }) {
  const Icon = getWeatherIcon(current.weatherCode);

  const stats = [
    { icon: Droplets, label: 'Humidity', value: `${current.humidity}%` },
    { icon: Wind, label: 'Wind Speed', value: `${Math.round(current.windSpeed)} km/h` },
    { icon: Gauge, label: 'UV Index', value: current.uvIndex?.toFixed(1) ?? '--' },
    { icon: CloudRain, label: 'Rain Chance', value: `${current.precipitationProbability ?? 0}%` },
    { icon: Sunrise, label: 'Sunrise', value: formatTime(current.sunrise) },
    { icon: Sunset, label: 'Sunset', value: formatTime(current.sunset) },
  ];

  return (
    <div className="card p-6 sm:p-8 fade-in relative overflow-hidden">
      <div
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--accent-blue), transparent 70%)' }}
      />

      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-1.5 mb-1" style={{ color: 'var(--text-muted)' }}>
            <MapPin size={14} />
            <span className="text-sm font-medium">{location}</span>
          </div>
          <div className="flex items-end gap-3">
            <span className="text-6xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              {Math.round(current.temperature)}°
            </span>
            <span className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
              Feels like {Math.round(current.feelsLike)}°
            </span>
          </div>
          <p className="text-base font-medium mt-1" style={{ color: 'var(--accent-blue)' }}>
            {current.weatherDescription}
          </p>
        </div>

        <div
          className="w-24 h-24 rounded-2xl flex items-center justify-center shrink-0 mx-auto sm:mx-0"
          style={{ background: 'var(--accent-amber-light)' }}
        >
          <Icon size={52} style={{ color: 'var(--accent-amber)' }} strokeWidth={1.6} />
        </div>
      </div>

      <div className="stat-row mt-6 pt-6 border-t relative" style={{ borderColor: 'var(--border)' }}>
        {stats.map(({ icon: SIcon, label, value }) => (
          <div key={label} className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: 'var(--bg-muted)' }}
            >
              <SIcon size={16} style={{ color: 'var(--accent-blue)' }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</p>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
