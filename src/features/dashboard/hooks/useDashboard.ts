import { useState, useCallback } from 'react';
import { dashboardService } from '../services/dashboardService';
import { DashboardSummary } from '../models/dashboard';

export function useDashboard() {
  const [summary, setSummary] = useState<DashboardSummary>(() => dashboardService.getSummary());
  const [loading, setLoading] = useState<boolean>(false);

  const refresh = useCallback(() => {
    setLoading(true);
    const data = dashboardService.getSummary();
    setSummary(data);
    setLoading(false);
  }, []);

  return { summary, loading, refresh };
}
