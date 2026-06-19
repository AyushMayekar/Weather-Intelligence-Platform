import { AlertTriangle, CloudSun, Inbox } from 'lucide-react';

export function ErrorBanner({ message, onDismiss }) {
  if (!message) return null;
  return (
    <div
      className="card p-4 flex items-start gap-3 fade-in"
      style={{ borderColor: 'var(--danger)', background: 'rgba(239,68,68,0.06)' }}
    >
      <AlertTriangle size={18} style={{ color: 'var(--danger)' }} className="shrink-0 mt-0.5" />
      <p className="text-sm flex-1" style={{ color: 'var(--text-primary)' }}>{message}</p>
      {onDismiss && (
        <button onClick={onDismiss} className="text-xs font-semibold shrink-0" style={{ color: 'var(--danger)' }}>
          Dismiss
        </button>
      )}
    </div>
  );
}

export function EmptyState({ icon: Icon = CloudSun, title, description }) {
  return (
    <div className="card p-12 flex flex-col items-center text-center fade-in">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: 'var(--bg-muted)' }}
      >
        <Icon size={28} style={{ color: 'var(--text-muted)' }} />
      </div>
      <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{title}</h3>
      <p className="text-sm max-w-sm" style={{ color: 'var(--text-muted)' }}>{description}</p>
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="card p-8 flex flex-col items-center justify-center gap-3 fade-in" style={{ minHeight: '200px' }}>
      <span className="spinner" style={{ width: 32, height: 32, borderWidth: 3 }} />
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Fetching weather data…</p>
    </div>
  );
}
