import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, setAuthToken } from '@/lib/api';

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: 'USER' | 'TENANT' | 'ADMIN';
}

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const register = async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      // Register user - backend expects phoneNumber not phone
      const registerData = await api.post<{
        id: number;
        name: string;
        email: string;
        role: string;
        phoneNumber?: string;
      }>('/auth/register', {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        phoneNumber: credentials.phone, // Backend expects phoneNumber
        role: (credentials.role || 'USER').toLowerCase(),
      });

      // Auto-login after successful registration
      const loginData = await api.post<{
        token: string;
        user: {
          id: number;
          name: string;
          email: string;
          role: string;
        };
      }>('/auth/login', {
        email: credentials.email,
        password: credentials.password,
      });

      // Store token and user data
      if (loginData.token) {
        setAuthToken(loginData.token);
        localStorage.setItem('user', JSON.stringify(loginData.user));
        // Trigger custom event for header update
        window.dispatchEvent(new CustomEvent('authChange'));
      }

      // Redirect based on user role
      const userRole = loginData.user?.role?.toLowerCase();
      if (userRole === 'user') {
        router.push('/landing');
      } else if (userRole === 'tenant') {
        router.push('/dashboard');
      } else {
        router.push('/landing');
      }

      return { register: registerData, login: loginData };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registrasi gagal';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
    error,
  };
}