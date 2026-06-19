import { useState } from 'react';
import { X, Calendar, Loader2 } from 'lucide-react';

export default function EditRecordModal({ record, onClose, onSave, saving }) {
  const [startDate, setStartDate] = useState(record.startDate.split('T')[0]);
  const [endDate, setEndDate] = useState(record.endDate.split('T')[0]);
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (new Date(endDate) < new Date(startDate)) {
      setError('End date cannot precede start date');
      return;
    }
    const diff = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    if (diff > 5) {
      setError('Date range cannot exceed 5 days');
      return;
    }
    setError(null);
    onSave(record.id, { startDate, endDate });
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="card p-6 w-full max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Edit record"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
            Edit Search Record
          </h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center btn-secondary !p-0">
            <X size={16} />
          </button>
        </div>

        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          {record.location}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-semibold mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
              <Calendar size={12} /> Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="text-xs font-semibold mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
              <Calendar size={12} /> End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input-field"
            />
          </div>

          {error && <p className="text-xs" style={{ color: 'var(--danger)' }}>{error}</p>}

          <div className="flex gap-2 mt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center">
              {saving ? <Loader2 size={16} className="animate-spin" /> : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
