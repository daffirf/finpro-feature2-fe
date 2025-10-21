/**
 * Custom Hook for Peak Season Management
 * Handles CRUD operations for peak season price rules
 */

import { useState, useEffect } from 'react';
import { 
  getPeakSeasons,
  createPeakSeason, 
  updatePeakSeason, 
  deletePeakSeason,
  CreatePeakSeasonPayload,
  UpdatePeakSeasonPayload,
  PeakSeasonResponse
} from '@/lib/api/tenant.api';

export const usePeakSeasons = () => {
  const [peakSeasons, setPeakSeasons] = useState<PeakSeasonResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all peak seasons
  const fetchPeakSeasons = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getPeakSeasons();
      setPeakSeasons(response.data || response.priceRules || []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal memuat peak seasons');
      console.error('Error fetching peak seasons:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Create new peak season
  const addPeakSeason = async (data: CreatePeakSeasonPayload) => {
    try {
      setError(null);
      const response = await createPeakSeason(data);
      await fetchPeakSeasons(); // Refresh list
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Gagal menambahkan peak season';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Update existing peak season
  const editPeakSeason = async (priceRuleId: number, data: UpdatePeakSeasonPayload) => {
    try {
      setError(null);
      const response = await updatePeakSeason(priceRuleId, data);
      await fetchPeakSeasons(); // Refresh list
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Gagal mengupdate peak season';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Delete peak season
  const removePeakSeason = async (priceRuleId: number) => {
    try {
      setError(null);
      await deletePeakSeason(priceRuleId);
      await fetchPeakSeasons(); // Refresh list
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Gagal menghapus peak season';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Load peak seasons on mount
  useEffect(() => {
    fetchPeakSeasons();
  }, []);

  return {
    peakSeasons,
    isLoading,
    error,
    fetchPeakSeasons,
    addPeakSeason,
    editPeakSeason,
    removePeakSeason
  };
};

