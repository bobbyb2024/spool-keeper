import { useState, useCallback } from 'react';
import { filamentService } from '@/services/filaments/filamentService';
import type { Filament } from '@/types/models/filament';

export function useFilaments() {
  const [filaments, setFilaments] = useState<Filament[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFilaments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await filamentService.getFilaments();
      if (response.error) {
        throw new Error(response.error);
      }
      setFilaments(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    filaments,
    loading,
    error,
    fetchFilaments,
  };
} 