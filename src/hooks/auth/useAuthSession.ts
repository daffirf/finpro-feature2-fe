/**
 * Hook untuk integrasi NextAuth dengan Zustand Auth Store
 * Sinkronisasi session NextAuth dengan local state
 */

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAuth } from './useAuth';

export function useAuthSession() {
  const { data: session, status } = useSession();
  const { setAuth, logout, user: localUser } = useAuth();

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      // Sync NextAuth session dengan Zustand store
      const user = {
        id: parseInt(session.user.id) || 0,
        email: session.user.email || '',
        name: session.user.name || '',
        role: session.user.role,
        isEmailVerified: session.user.isEmailVerified,
      };

      const token = session.backendToken;

      // Update Zustand store jika data berbeda
      if (!localUser || localUser.id !== user.id) {
        setAuth(user, token);
      }
    } else if (status === 'unauthenticated') {
      // Clear Zustand store jika tidak ada session
      if (localUser) {
        logout();
      }
    }
  }, [status, session, localUser, setAuth, logout]);

  return {
    session,
    status,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
  };
}

