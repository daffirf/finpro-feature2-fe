/**
 * Custom Hook for Tenant Analytics & Reports
 * Fetches tenant statistics and reports
 */

import { useState, useEffect } from 'react';
import { 
  getTenantStats,
  getSalesReport,
  TenantStats
} from '@/lib/api/tenant.api';

export const useTenantAnalytics = () => {
  const [stats, setStats] = useState<TenantStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tenant statistics
  const fetchStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getTenantStats();
      setStats(response.data || response.stats || null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal memuat analytics');
      console.error('Error fetching analytics:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch sales report
  const fetchSalesReport = async (startDate?: string, endDate?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getSalesReport(startDate, endDate);
      return response.data || response.report || null;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Gagal memuat sales report';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Load stats on mount
  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    isLoading,
    error,
    fetchStats,
    fetchSalesReport
  };
};

