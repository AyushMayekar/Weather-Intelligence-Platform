import axios from 'axios';

const client = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.error ||
      err.response?.data?.details?.[0]?.message ||
      (err.code === 'ERR_NETWORK' ? 'Network error — is the server running?' : 'Something went wrong');
    return Promise.reject(new Error(message));
  }
);

export const searchByLocation = (data) => client.post('/weather', data).then((r) => r.data);
export const searchByCoordinates = (data) => client.post('/weather/coordinates', data).then((r) => r.data);

export const getHistory = () => client.get('/history').then((r) => r.data);
export const getHistoryById = (id) => client.get(`/history/${id}`).then((r) => r.data);
export const updateHistory = (id, data) => client.put(`/history/${id}`, data).then((r) => r.data);
export const deleteHistory = (id) => client.delete(`/history/${id}`).then((r) => r.data);

export const exportCsvUrl = '/api/export/csv';
export const exportJsonUrl = '/api/export/json';

export default client;
