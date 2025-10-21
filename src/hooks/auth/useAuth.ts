/**
 * Authentication Store using Zustand
 * Sinkron dengan backend RBAC middleware
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Sync dengan backend AuthUser interface
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'user' | 'tenant';
  isEmailVerified?: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  
  // Actions
  setAuth: (user: User, token: string) => void;
  updateUser: (user: User) => void;
  logout: () => void;
  
  // Role checks - sync dengan backend
  isAuthenticated: () => boolean;
  hasRole: (role: 'user' | 'tenant' | ('user' | 'tenant')[]) => boolean;
  isVerified: () => boolean;
  
  // Permission checks - simple
  canMakeBookings: () => boolean;
  canManageProperties: () => boolean;
  checkOwnership: (resourceOwnerId: number) => boolean;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get): AuthState => ({
      user: null,
      token: null,
      
      // Set auth data (after login)
      setAuth: (user: User, token: string) => {
        set({ user, token });
      },
      
      // Update user data (after profile update)
      updateUser: (user: User) => {
        set({ user });
      },
      
      // Logout
      logout: () => {
        set({ user: null, token: null });
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      },
      
      // Check if authenticated
      isAuthenticated: () => {
        const { user, token } = get();
        return !!(user && token);
      },
      
      // Check if user has specific role(s) - sync dengan backend rbac.checkRole
      hasRole: (requiredRole: 'user' | 'tenant' | ('user' | 'tenant')[]) => {
        const { user } = get();
        if (!user) return false;
        
        if (Array.isArray(requiredRole)) {
          return requiredRole.includes(user.role);
        }
        
        return user.role === requiredRole;
      },
      
      // Check if email is verified - sync dengan backend rbac.requireVerified
      isVerified: () => {
        const { user } = get();
        const verified = user?.isEmailVerified === true;
        console.log('[useAuth] isVerified check:', { user, verified }); // Debug log
        return verified;
      },
      
      // Check if user can make bookings (user + verified) - sync dengan backend rbac.onlyUser
      canMakeBookings: () => {
        const { hasRole, isVerified } = get();
        return hasRole('user') && isVerified();
      },
      
      // Check if user can manage properties (tenant + verified) - sync dengan backend rbac.onlyTenant
      canManageProperties: () => {
        const { hasRole, isVerified } = get();
        return hasRole('tenant') && isVerified();
      },
      
      // Check if user owns the resource - sync dengan backend rbac.checkOwnership
      checkOwnership: (resourceOwnerId: number) => {
        const { user } = get();
        if (!user) return false;
        return user.id === resourceOwnerId;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);