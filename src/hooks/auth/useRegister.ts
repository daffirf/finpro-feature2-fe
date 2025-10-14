import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          phone: credentials.phone,
          role: credentials.role || 'USER',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store token and user data if auto-login is enabled
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      // Redirect based on user role
      if (data.user?.role === 'TENANT') {
        router.push('/tenant');
      } else if (data.user?.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/search');
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
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