import { useState } from 'react';
// import { api } from '@/lib/api'; // Uncomment when ready for API

export interface ResetPasswordData {
  token: string;
  password: string;
}

export function useResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const resetPassword = async (data: ResetPasswordData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // TODO: Replace with actual API call
      // const response = await api.post('/auth/reset-password', {
      //   token: data.token,
      //   password: data.password
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Gagal mereset password. Link mungkin sudah kadaluarsa.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    resetPassword,
    reset,
    isLoading,
    error,
    success
  };
}

