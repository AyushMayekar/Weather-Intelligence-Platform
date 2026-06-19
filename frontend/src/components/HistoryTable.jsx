import { Pencil, Trash2, MapPin } from 'lucide-react';
import { formatDateShort, getWeatherIcon } from '../utils/weatherUtils';

export default function HistoryTable({ records, onEdit, onDelete }) {
  return (
    <div className="card overflow-hidden fade-in">
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Location</th>
              <th>Date Range</th>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>AQI</th>
              <th>Saved</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => {
              const Icon = getWeatherIcon(r.weatherCode);
              return (
                <tr key={r.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} style={{ color: 'var(--text-muted)' }} className="shrink-0" />
                      <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{r.location}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap">
                    {formatDateShort(r.startDate)} → {formatDateShort(r.endDate)}
                  </td>
                  <td className="whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Icon size={16} style={{ color: 'var(--accent-blue)' }} />
                      {Math.round(r.temperature)}°C
                    </div>
                  </td>
                  <td>{r.humidity}%</td>
                  <td>{r.airQualityIndex ?? '--'}</td>
                  <td className="whitespace-nowrap">{formatDateShort(r.createdAt)}</td>
                  <td>
                    <div className="flex items-center gap-1.5 justify-end">
                      <button
                        onClick={() => onEdit(r)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center btn-secondary !p-0"
                        aria-label="Edit record"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => onDelete(r)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                        style={{ color: 'var(--danger)', background: 'rgba(239,68,68,0.08)' }}
                        aria-label="Delete record"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
