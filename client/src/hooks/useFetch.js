import { useState, useEffect, useCallback } from 'react';

export function useFetch(fetchFn, fallbackData = null) {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchFn();
      if (res && res.data) {
        setData(res.data);
        setIsUsingFallback(false);
      } else {
        setData(res || fallbackData);
      }
    } catch (err) {
      console.warn('Network or API unavailable, using fallback data:', err.message);
      setError(err.message);
      if (fallbackData) {
        setData(fallbackData);
        setIsUsingFallback(true);
      }
    } finally {
      setLoading(false);
    }
  }, [fetchFn, fallbackData]);

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, loading, error, isUsingFallback, refetch: execute, setData };
}
