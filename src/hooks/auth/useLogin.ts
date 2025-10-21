import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, setAuthToken } from '@/lib/api';
import { useAuth, User } from './useAuth';

export interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: 'user' | 'tenant';
    isEmailVerified?: boolean;
  };
}

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setAuth, logout: zustandLogout } = useAuth();

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await api.post<LoginResponse>('/auth/login', credentials);

      // Store in Zustand store (will persist automatically)
      if (data.token && data.user) {
        // Ensure isEmailVerified has a proper boolean value
        const user = {
          ...data.user,
          isEmailVerified: data.user.isEmailVerified ?? false
        };

        console.log('[useLogin] User data from backend:', user); // Debug log
        
        // Update Zustand store
        setAuth(user, data.token);
        
        // Also store in legacy localStorage for backward compatibility
        setAuthToken(data.token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Trigger custom event for header update
        window.dispatchEvent(new CustomEvent('authChange'));
        
        // Check if email verified before redirect
        if (!user.isEmailVerified) {
          console.log('[useLogin] Email not verified, redirecting to verify page');
          router.push('/auth/verify-email-required');
          return data;
        }
        
        // Redirect based on user role
        const userRole = user.role.toLowerCase();
        
        if (userRole === 'user') {
          router.push('/landing');
        } else if (userRole === 'tenant') {
          router.push('/dashboard');
        } else {
          router.push('/dashboard'); // Default fallback
        }
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
    // Clear Zustand store
    zustandLogout();
    
    // Clear legacy localStorage
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