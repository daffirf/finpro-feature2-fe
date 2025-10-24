import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export interface RegisterTenantCredentials {
  name: string;
  email: string;
}

export function useRegisterTenant() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const registerTenant = async (credentials: RegisterTenantCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      // Register tenant with role 'tenant'
      const response = await api.post<{
        success: boolean;
        message: string;
        email: string;
      }>('/auth/register', {
        name: credentials.name,
        email: credentials.email,
        role: 'tenant',
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
    registerTenant,
    isLoading,
    error,
  };
}

