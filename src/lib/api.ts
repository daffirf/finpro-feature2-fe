import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ✅ CRITICAL: Send httpOnly cookies with every request!
});

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

// Track if we're currently refreshing to prevent multiple refresh calls
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach(callback => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    // Handle 401 Unauthorized - try to refresh token
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        // Wait for the refresh to complete
        return new Promise((resolve) => {
          addRefreshSubscriber((token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(apiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Try to refresh the token using httpOnly cookie
        await apiClient.post('/auth/refresh-token');
        isRefreshing = false;
        onRefreshed('refreshed'); // Token is in httpOnly cookie, no need to pass actual token
        
        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        refreshSubscribers = [];
        
        // Refresh failed - redirect to login only if in browser
        if (typeof window !== 'undefined') {
          console.error('Token refresh failed, redirecting to login');
          window.location.href = '/auth/login';
        }
        return Promise.reject(refreshError);
      }
    }
    
    // Handle other errors
    if (error.response) {
      const responseData = error.response.data as { message?: string; error?: string };
      const message = responseData?.message || responseData?.error || 'Terjadi kesalahan pada server';
      error.message = message;
      return Promise.reject(error);
    } else if (error.request) {
      error.message = 'Tidak dapat terhubung ke server';
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export const api = {
  get: <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.get<T>(endpoint, config).then((response: AxiosResponse<T>) => response.data),

  post: <T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.post<T>(endpoint, data, config).then((response: AxiosResponse<T>) => response.data),

  put: <T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.put<T>(endpoint, data, config).then((response: AxiosResponse<T>) => response.data),

  patch: <T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.patch<T>(endpoint, data, config).then((response: AxiosResponse<T>) => response.data),

  delete: <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.delete<T>(endpoint, config).then((response: AxiosResponse<T>) => response.data),

  upload: <T>(endpoint: string, formData: FormData, method: 'POST' | 'PATCH' | 'PUT' = 'POST', config?: AxiosRequestConfig): Promise<T> => {
    const uploadConfig = {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    };

    if (method === 'PATCH') {
      return apiClient.patch<T>(endpoint, formData, uploadConfig).then((response: AxiosResponse<T>) => response.data);
    } else if (method === 'PUT') {
      return apiClient.put<T>(endpoint, formData, uploadConfig).then((response: AxiosResponse<T>) => response.data);
    } else {
      return apiClient.post<T>(endpoint, formData, uploadConfig).then((response: AxiosResponse<T>) => response.data);
    }
  },
};

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  const authStorage = localStorage.getItem('auth-storage');
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      if (parsed.state?.token) {
        return parsed.state.token;
      }
    } catch (e) {
      // Continue to fallback
    }
  }
  
  return localStorage.getItem('token');
};

export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('auth-storage');
  }
};

