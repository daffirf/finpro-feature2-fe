import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, setAuthToken } from '@/lib/api';

export interface RegisterCredentials {
  name: string;
  email: string;
  role: 'user' | 'tenant';
}

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const register = async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      // Register user - no password needed, will be set via email verification
      const response = await api.post<{
        message: string;
        user?: {
          id: number;
          name: string;
          email: string;
          role: string;
        };
      }>('/auth/register', {
        name: credentials.name,
        email: credentials.email,
        role: credentials.role,
      });

      // No auto-login - user must verify email first
      return response;
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