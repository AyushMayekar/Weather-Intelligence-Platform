import { Trash2, Loader2, AlertTriangle } from 'lucide-react';

export default function DeleteConfirmModal({ record, onClose, onConfirm, deleting }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="card p-6 w-full max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Confirm delete"
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ background: 'rgba(239,68,68,0.1)' }}
        >
          <AlertTriangle size={22} style={{ color: 'var(--danger)' }} />
        </div>

        <h3 className="font-semibold text-base mb-1.5" style={{ color: 'var(--text-primary)' }}>
          Delete this record?
        </h3>
        <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
          This will permanently remove the search for <strong>{record.location}</strong>. This action cannot be undone.
        </p>

        <div className="flex gap-2">
          <button onClick={onClose} className="btn-secondary flex-1 justify-center">
            Cancel
          </button>
          <button onClick={() => onConfirm(record.id)} disabled={deleting} className="btn-danger flex-1 justify-center">
            {deleting ? <Loader2 size={16} className="animate-spin" /> : <><Trash2 size={14} /> Delete</>}
          </button>
        </div>
      </div>
    </div>
  );
}
