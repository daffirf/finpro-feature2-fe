import { useState } from 'react';
import { useRouter } from 'next/navigation';

export interface GoogleAuthCredentials {
  email: string;
  name: string;
  googleId: string;
  avatar?: string;
}

export function useGoogleAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loginWithGoogle = async (credentials?: GoogleAuthCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      // Mock Google OAuth data for demonstration
      const mockGoogleData = credentials || {
        email: 'user@gmail.com',
        name: 'Google User',
        googleId: 'google_' + Math.random().toString(36).substr(2, 9),
        avatar: 'https://via.placeholder.com/150'
      };

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create mock user data
      const mockUser = {
        id: mockGoogleData.googleId,
        name: mockGoogleData.name,
        email: mockGoogleData.email,
        role: 'user', // Default role for Google OAuth users
        avatar: mockGoogleData.avatar
      };

      // Store mock data in localStorage
      localStorage.setItem('token', 'mock-google-token');
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Trigger custom event for header update
      window.dispatchEvent(new CustomEvent('authChange'));

      // Redirect to landing page
      router.push('/landing');

      return mockUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Google authentication failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const registerWithGoogle = async (credentials?: GoogleAuthCredentials) => {
    // For Google OAuth, login and register are the same process
    return loginWithGoogle(credentials);
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Trigger custom event for header update
      window.dispatchEvent(new CustomEvent('authChange'));

      // Redirect to home page
      router.push('/');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    loginWithGoogle,
    registerWithGoogle,
    logout,
    isLoading,
    error,
  };
}
