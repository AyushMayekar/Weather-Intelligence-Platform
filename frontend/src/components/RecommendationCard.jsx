import { Sparkles, Plane, Youtube } from 'lucide-react';
import { getTravelReadinessStyle, youtubeSearchUrl } from '../utils/weatherUtils';

export default function RecommendationCard({ recommendation, travelReadiness, location }) {
  const readinessStyle = getTravelReadinessStyle(travelReadiness);

  return (
    <div className="card p-6 fade-in h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: 'var(--accent-amber-light)' }}
        >
          <Sparkles size={16} style={{ color: 'var(--accent-amber)' }} />
        </div>
        <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
          Smart Recommendations
        </h3>
      </div>

      <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
        {recommendation || 'No special advisories for this location right now.'}
      </p>

      <div className="flex items-center gap-2 mt-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <Plane size={14} style={{ color: 'var(--text-muted)' }} />
        <span className={`badge ${readinessStyle.color}`}>{travelReadiness}</span>
      </div>

      <a
        href={youtubeSearchUrl(location)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary text-sm mt-3 justify-center"
      >
        <Youtube size={14} /> Explore videos about {location.split(',')[0]}
      </a>
    </div>
  );
}
