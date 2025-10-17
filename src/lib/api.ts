/**
 * API Client untuk berkomunikasi dengan backend menggunakan Axios
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor untuk menambahkan token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor untuk menangani error
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with error status
      const responseData = error.response.data as { message?: string; error?: string };
      const message = responseData?.message || responseData?.error || 'Terjadi kesalahan pada server';
      throw new Error(message);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Tidak dapat terhubung ke server');
    } else {
      // Something else happened
      throw new Error(error.message || 'Terjadi kesalahan');
    }
  }
);

/**
 * API Client Methods menggunakan Axios
 */
export const api = {
  // GET request
  get: <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.get<T>(endpoint, config).then((response: AxiosResponse<T>) => response.data),

  // POST request
  post: <T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.post<T>(endpoint, data, config).then((response: AxiosResponse<T>) => response.data),

  // PUT request
  put: <T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.put<T>(endpoint, data, config).then((response: AxiosResponse<T>) => response.data),

  // PATCH request
  patch: <T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.patch<T>(endpoint, data, config).then((response: AxiosResponse<T>) => response.data),

  // DELETE request
  delete: <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.delete<T>(endpoint, config).then((response: AxiosResponse<T>) => response.data),

  // Upload file
  upload: <T>(endpoint: string, formData: FormData, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.post<T>(endpoint, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    }).then((response: AxiosResponse<T>) => response.data);
  },
};

/**
 * Helper untuk mendapatkan token dari localStorage
 */
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

/**
 * Helper untuk menyimpan token ke localStorage
 */
export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

/**
 * Helper untuk menghapus token dari localStorage
 */
export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

