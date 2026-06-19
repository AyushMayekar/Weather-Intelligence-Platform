import { CloudRain } from 'lucide-react';
import { getWeatherIcon, formatDate } from '../utils/weatherUtils';

export default function ForecastList({ forecast }) {
  return (
    <div className="card p-6 fade-in">
      <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>
        5-Day Forecast
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {forecast.map((day, i) => {
          const Icon = getWeatherIcon(day.weatherCode);
          return (
            <div
              key={day.date}
              className="rounded-xl p-4 flex flex-col items-center text-center transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--bg-muted)', animationDelay: `${i * 60}ms` }}
            >
              <span className="text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>
                {i === 0 ? 'Today' : formatDate(day.date)}
              </span>
              <Icon size={32} style={{ color: 'var(--accent-blue)' }} strokeWidth={1.7} />
              <p className="text-xs mt-2 mb-2 leading-tight" style={{ color: 'var(--text-secondary)' }}>
                {day.weatherDescription}
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                <span>{Math.round(day.tempMax)}°</span>
                <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{Math.round(day.tempMin)}°</span>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs" style={{ color: 'var(--accent-blue)' }}>
                <CloudRain size={12} />
                <span>{day.precipProbability}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
