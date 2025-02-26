import { fetchApi } from '@/lib/api/client';
import type { MaterialType } from '@/types/models/materialType';

export const materialTypeService = {
  async getMaterialTypes() {
    return fetchApi<MaterialType[]>('/material-types');
  },

  async getMaterialType(id: string) {
    return fetchApi<MaterialType>(`/material-types/${id}`);
  },

  async createMaterialType(data: Partial<MaterialType>) {
    return fetchApi<MaterialType>('/material-types', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateMaterialType(id: string, data: Partial<MaterialType>) {
    return fetchApi<MaterialType>(`/material-types/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteMaterialType(id: string) {
    return fetchApi<void>(`/material-types/${id}`, {
      method: 'DELETE',
    });
  },
}; 