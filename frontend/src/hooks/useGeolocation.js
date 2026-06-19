import { useState, useCallback } from 'react';

export function useGeolocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPosition = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const err = 'Geolocation is not supported by your browser.';
        setError(err);
        reject(new Error(err));
        return;
      }

      setLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoading(false);
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setLoading(false);
          let message = 'Unable to retrieve your location.';
          if (err.code === err.PERMISSION_DENIED) {
            message = 'Location permission denied. Please allow access or search manually.';
          } else if (err.code === err.TIMEOUT) {
            message = 'Location request timed out. Please try again.';
          }
          setError(message);
          reject(new Error(message));
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    });
  }, []);

  return { getPosition, loading, error };
}
