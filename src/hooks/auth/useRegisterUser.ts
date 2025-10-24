import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export interface RegisterUserCredentials {
  name: string;
  email: string;
}

export function useRegisterUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const registerUser = async (credentials: RegisterUserCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      // Register user with role 'user'
      const response = await api.post<{
        success: boolean;
        message: string;
        email: string;
      }>('/auth/register', {
        name: credentials.name,
        email: credentials.email,
        role: 'user',
      });

      // Return response to show success message
      return response;
    } catch (err: any) {
      const errorMessage = 
        err?.response?.data?.message || 
        err?.message || 
        'Registrasi gagal. Silakan coba lagi.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    registerUser,
    isLoading,
    error,
  };
}

