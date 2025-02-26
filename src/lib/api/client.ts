import axios from 'axios';
import type { ApiResponse } from '@/types';

export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await apiClient.get(endpoint, options);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    return {
      data: null as T,
      error: error.message,
      status: error.response?.status || 500,
    };
  }
} 