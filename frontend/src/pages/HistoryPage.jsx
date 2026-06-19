import { useState, useEffect, useMemo } from 'react';
import { Search, Download, FileJson, FileSpreadsheet } from 'lucide-react';
import { getHistory, updateHistory, deleteHistory, exportCsvUrl, exportJsonUrl } from '../api/client';
import HistoryTable from '../components/HistoryTable';
import EditRecordModal from '../components/EditRecordModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { ErrorBanner, EmptyState, LoadingSkeleton } from '../components/StatusViews';
import { History } from 'lucide-react';

export default function HistoryPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    setLoading(true);
    setError(null);
    try {
      const data = await getHistory();
      setRecords(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(id, data) {
    setSaving(true);
    try {
      const updated = await updateHistory(id, data);
      setRecords((prev) => prev.map((r) => (r.id === id ? updated : r)));
      setEditTarget(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    setDeleting(true);
    try {
      await deleteHistory(id);
      setRecords((prev) => prev.filter((r) => r.id !== id));
      setDeleteTarget(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  }

  const filteredRecords = useMemo(() => {
    if (!filter.trim()) return records;
    return records.filter((r) => r.location.toLowerCase().includes(filter.trim().toLowerCase()));
  }, [records, filter]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 fade-in">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>
            Search History
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Manage your saved weather searches.
          </p>
        </div>

        <div className="flex gap-2">
          <a href={exportCsvUrl} className="btn-secondary text-sm">
            <FileSpreadsheet size={14} /> CSV
          </a>
          <a href={exportJsonUrl} className="btn-secondary text-sm">
            <FileJson size={14} /> JSON
          </a>
        </div>
      </div>

      <div className="relative">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: 'var(--text-muted)' }}
        />
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by location..."
          className="input-field pl-10 max-w-sm"
        />
      </div>

      <ErrorBanner message={error} onDismiss={() => setError(null)} />

      {loading && <LoadingSkeleton />}

      {!loading && filteredRecords.length === 0 && (
        <EmptyState
          icon={History}
          title={records.length === 0 ? 'No searches saved yet' : 'No matching records'}
          description={
            records.length === 0
              ? 'Search for a location on the Dashboard to start building your history.'
              : 'Try a different filter term.'
          }
        />
      )}

      {!loading && filteredRecords.length > 0 && (
        <HistoryTable records={filteredRecords} onEdit={setEditTarget} onDelete={setDeleteTarget} />
      )}

      {editTarget && (
        <EditRecordModal
          record={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={handleSave}
          saving={saving}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          record={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          deleting={deleting}
        />
      )}
    </div>
  );
}
