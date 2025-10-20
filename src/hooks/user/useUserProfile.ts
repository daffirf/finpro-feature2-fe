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
      const data = await api.get<UserProfile>('/user/me');
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
      if (!profile?.id) throw new Error('User ID not found');
      const updatedProfile = await api.patch<UserProfile>(`/user/${profile.id}`, data);
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
      await api.patch('/auth/change-password', {
        oldPassword: data.currentPassword,
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

  // Upload avatar
  const uploadAvatar = async (file: File) => {
    setIsUpdating(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/auth/avatar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Gagal mengupload avatar');
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedProfile));
      
      // Trigger custom event for header update
      window.dispatchEvent(new CustomEvent('authChange'));
      
      return updatedProfile;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal mengupload avatar';
      setError(errorMessage);
      throw err;
    } finally {
      setIsUpdating(false);
    }
  };

  // Remove avatar
  const removeAvatar = async () => {
    setIsUpdating(true);
    setError(null);

    try {
      const updatedProfile = await api.delete<UserProfile>('/auth/avatar');
      setProfile(updatedProfile);
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedProfile));
      
      // Trigger custom event for header update
      window.dispatchEvent(new CustomEvent('authChange'));
      
      return updatedProfile;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gagal menghapus avatar';
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
    uploadAvatar,
    removeAvatar,
    refreshProfile,
  };
}

