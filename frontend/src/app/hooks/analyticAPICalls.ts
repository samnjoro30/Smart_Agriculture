import { useEffect, useState } from 'react';

import axiosInstance from '../API/axiosInstance';

export function useAnalytics() {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      // Fetch everything in parallel for maximum speed
      const [summary, trends, sessions, ranking] = await Promise.all([
        axiosInstance.get(`/analytics/summary?month=${month}&year=${year}`),
        axiosInstance.get(
          `/analytics/production-trends?month=${month}&year=${year}`
        ),
        axiosInstance.get(
          `/analytics/session-revenue?month=${month}&year=${year}`
        ),
        axiosInstance.get(
          `/analytics/cow-ranking?month=${month}&year=${year}`
        ),
      ]);

      setData({
        summary: summary.data,
        trends: trends.data,
        sessions: sessions.data,
        ranking: ranking.data,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [date]); // Re-fetch whenever the date changes

  return { date, setDate, data, loading, error, refresh: fetchDashboardData };
}
