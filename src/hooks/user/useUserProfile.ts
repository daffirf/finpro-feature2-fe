import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { UserProfile, UpdateUserData } from '@/types/user';

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  // Fetch user profile
  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if user is authenticated
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      // Get user from localStorage first (for immediate display)
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const userData = JSON.parse(userStr);
        setProfile(userData);
      }

      // Then fetch fresh data from API
      const data = await api.get<UserProfile>('/auth/me');
      setProfile(data);
      
      // Update localStorage with fresh data
      localStorage.setItem('user', JSON.stringify(data));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal memuat profil';
      setError(errorMessage);
      
      // If unauthorized, redirect to login
      if (errorMessage.includes('401') || errorMessage.includes('unauthorized')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/auth/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (data: UpdateUserData) => {
    setIsUpdating(true);
    setError(null);

    try {
      const updatedProfile = await api.patch<UserProfile>('/auth/profile', data);
      setProfile(updatedProfile);
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedProfile));
      
      // Trigger custom event for header update
      window.dispatchEvent(new CustomEvent('authChange'));
      
      return updatedProfile;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal memperbarui profil';
      setError(errorMessage);
      throw err;
    } finally {
      setIsUpdating(false);
    }
  };

  // Change password
  const changePassword = async (data: ChangePasswordData) => {
    setIsUpdating(true);
    setError(null);

    try {
      await api.post('/auth/change-password', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal mengubah password';
      setError(errorMessage);
      throw err;
    } finally {
      setIsUpdating(false);
    }
  };

  // Refresh profile data
  const refreshProfile = () => {
    fetchProfile();
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    isLoading,
    error,
    isUpdating,
    updateProfile,
    changePassword,
    refreshProfile,
  };
}

