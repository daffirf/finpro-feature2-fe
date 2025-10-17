import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, setAuthToken } from '@/lib/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await api.post<{
        token?: string;
        user?: { role: string };
      }>('/auth/login', credentials);

      // Store token and user data
      if (data.token) {
        setAuthToken(data.token); // Use helper function for consistency
        localStorage.setItem('user', JSON.stringify(data.user));
        // Trigger custom event for header update
        window.dispatchEvent(new CustomEvent('authChange'));
      }

      // Redirect based on user role (case-insensitive)
      const userRole = data.user?.role?.toLowerCase();
      
      if (userRole === 'user') {
        router.push('/landing');
      } else if (userRole === 'tenant') {
        router.push('/dashboard');
      } else {
        router.push('/dashboard'); // Default fallback to dashboard
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Trigger custom event for header update
    window.dispatchEvent(new CustomEvent('authChange'));
    router.push('/auth/login');
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  };

  return {
    login,
    logout,
    isAuthenticated,
    getCurrentUser,
    isLoading,
    error,
  };
}