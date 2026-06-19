import {
  Sun, Cloud, CloudSun, CloudFog, CloudDrizzle, CloudRain,
  CloudSnow, CloudLightning, CloudHail,
} from 'lucide-react';

export function getWeatherIcon(code) {
  if (code === 0) return Sun;
  if ([1, 2].includes(code)) return CloudSun;
  if (code === 3) return Cloud;
  if ([45, 48].includes(code)) return CloudFog;
  if ([51, 53, 55].includes(code)) return CloudDrizzle;
  if ([61, 63, 65, 80, 81, 82].includes(code)) return CloudRain;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return CloudSnow;
  if ([95, 96, 99].includes(code)) return CloudLightning;
  return CloudHail;
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export function formatTime(dateStr) {
  if (!dateStr) return '--';
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

export function formatDateShort(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function getAqiCategory(aqi) {
  if (aqi === null || aqi === undefined) return { label: 'Unavailable', color: 'badge-blue', advice: 'Air quality data is not available for this location.' };
  if (aqi <= 20) return { label: 'Good', color: 'badge-teal', advice: 'Air quality is satisfactory for everyone.' };
  if (aqi <= 40) return { label: 'Fair', color: 'badge-teal', advice: 'Air quality is acceptable.' };
  if (aqi <= 60) return { label: 'Moderate', color: 'badge-amber', advice: 'Sensitive groups should consider reducing prolonged outdoor exertion.' };
  if (aqi <= 80) return { label: 'Poor', color: 'badge-amber', advice: 'Limit prolonged outdoor exertion, especially for sensitive groups.' };
  if (aqi <= 100) return { label: 'Very Poor', color: 'badge-rose', advice: 'Avoid prolonged outdoor exertion. Sensitive groups should stay indoors.' };
  return { label: 'Hazardous', color: 'badge-rose', advice: 'Everyone should avoid outdoor exertion.' };
}

export function getTravelReadinessStyle(readiness) {
  if (readiness === 'Great day for travel') return { color: 'badge-teal' };
  if (readiness === 'Moderate weather risk') return { color: 'badge-amber' };
  return { color: 'badge-rose' };
}

export function todayISO() {
  return new Date().toISOString().split('T')[0];
}

export function addDaysISO(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export function youtubeSearchUrl(location) {
  const query = encodeURIComponent(`weather and travel guide ${location}`);
  return `https://www.youtube.com/results?search_query=${query}`;
}
