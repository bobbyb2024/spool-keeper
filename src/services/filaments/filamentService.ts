import { fetchApi } from '@/lib/api/client';
import type { Filament } from '@/types/models/filament';

export const filamentService = {
  async getFilaments() {
    return fetchApi<Filament[]>('/filaments');
  },

  async getFilament(id: string) {
    return fetchApi<Filament>(`/filaments/${id}`);
  },

  async createFilament(data: Partial<Filament>) {
    return fetchApi<Filament>('/filaments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // ... other methods
}; 