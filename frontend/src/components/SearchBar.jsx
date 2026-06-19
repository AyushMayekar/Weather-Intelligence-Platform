import { useState } from 'react';
import { Search, MapPin, Calendar, Loader2 } from 'lucide-react';
import { todayISO, addDaysISO } from '../utils/weatherUtils';

export default function SearchBar({ onSearch, onUseLocation, loading, locationLoading }) {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(todayISO());
  const [endDate, setEndDate] = useState(addDaysISO(todayISO(), 4));
  const [touched, setTouched] = useState(false);

  const trimmedLocation = location.trim();
  const locationError = touched && trimmedLocation.length < 2 ? 'Enter at least 2 characters' : null;
  const dateError =
    new Date(endDate) < new Date(startDate)
      ? 'End date cannot precede start date'
      : (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) > 5
      ? 'Date range cannot exceed 5 days'
      : null;

  function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (trimmedLocation.length < 2 || dateError) return;
    onSearch({ location: trimmedLocation, startDate, endDate });
  }

  function handleStartDateChange(value) {
    setStartDate(value);
    if (new Date(endDate) < new Date(value)) {
      setEndDate(addDaysISO(value, 4));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-5 sm:p-6 fade-in">
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="flex-1 relative">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--text-muted)' }}
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="Search city or postal code..."
            className="input-field has-icon"
            aria-label="Search location"
          />
        </div>

        <button
          type="button"
          onClick={onUseLocation}
          disabled={locationLoading}
          className="btn-secondary justify-center"
        >
          {locationLoading ? <Loader2 size={16} className="animate-spin" /> : <MapPin size={16} />}
          <span>Use Current Location</span>
        </button>
      </div>

      {locationError && (
        <p className="text-xs mt-2" style={{ color: 'var(--danger)' }}>{locationError}</p>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 mt-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="flex-1">
          <label className="text-xs font-semibold mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
            <Calendar size={12} /> Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => handleStartDateChange(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="flex-1">
          <label className="text-xs font-semibold mb-1.5 flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
            <Calendar size={12} /> End Date
          </label>
          <input
            type="date"
            value={endDate}
            min={startDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input-field"
          />
        </div>
        <button type="submit" disabled={loading} className="btn-primary justify-center sm:w-auto">
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
          <span>Search</span>
        </button>
      </div>

      {dateError && (
        <p className="text-xs mt-2" style={{ color: 'var(--danger)' }}>{dateError}</p>
      )}
    </form>
  );
}
