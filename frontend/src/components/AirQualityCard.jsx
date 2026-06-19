import { Wind } from 'lucide-react';
import { getAqiCategory } from '../utils/weatherUtils';

export default function AirQualityCard({ aqi }) {
  const category = getAqiCategory(aqi);
  const pct = aqi !== null && aqi !== undefined ? Math.min(100, (aqi / 150) * 100) : 0;

  return (
    <div className="card p-6 fade-in h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: 'var(--accent-teal-light)' }}
        >
          <Wind size={16} style={{ color: 'var(--accent-teal)' }} />
        </div>
        <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
          Air Quality Insights
        </h3>
      </div>

      <div className="flex items-end gap-3 mb-2">
        <span className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
          {aqi ?? '--'}
        </span>
        <span className={`badge ${category.color} mb-1.5`}>{category.label}</span>
      </div>

      <div className="h-2 rounded-full overflow-hidden mb-4" style={{ background: 'var(--bg-muted)' }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, var(--accent-teal), var(--accent-amber), var(--accent-rose))',
          }}
        />
      </div>

      <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
        {category.advice}
      </p>
    </div>
  );
}
