// Core type definitions
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
  status: number;
} 