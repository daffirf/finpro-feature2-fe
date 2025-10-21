/**
 * Protected Route Component - Simple & Flexible
 * Sync dengan backend RBAC middleware
 * 
 * Bisa digunakan untuk:
 * 1. Protect halaman (dengan redirect)
 * 2. Conditional rendering (tanpa redirect, hanya hide/show)
 */

'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  requireRole?: 'user' | 'tenant' | ('user' | 'tenant')[];
  requireVerification?: boolean;
  redirect?: boolean; // true = redirect (untuk page), false = hide (untuk component)
  fallback?: ReactNode; // untuk mode hide (jika redirect=false)
}

/**
 * Component untuk protect halaman atau component
 */
export function ProtectedRoute({
  children,
  requireRole,
  requireVerification = true,
  redirect = true,
  fallback = null,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, hasRole, isVerified } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);


  useEffect(() => {
    if (!redirect || !isMounted) return;

    
    if (!isAuthenticated()) {
      router.push('/auth/login');
      return;
    }

   
    if (requireRole && !hasRole(requireRole)) {
      router.push('/unauthorized');
      return;
    }


    if (requireVerification && !isVerified()) {
      router.push('/auth/verify-email-required');
      return;
    }
  }, [redirect, isMounted, isAuthenticated, hasRole, isVerified, requireRole, requireVerification, router]);


  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  // Check authorization
  const isAuthorized = 
    isAuthenticated() &&
    (!requireRole || hasRole(requireRole)) &&
    (!requireVerification || isVerified());


  if (redirect) {
    if (!isAuthorized) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        </div>
      );
    }
    return <>{children}</>;
  }


  return <>{isAuthorized ? children : fallback}</>;
}


export function TenantRoute({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requireRole="tenant" requireVerification={true} redirect={true}>
      {children}
    </ProtectedRoute>
  );
}

export function AuthRoute({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute requireVerification={false} redirect={true}>
      {children}
    </ProtectedRoute>
  );
}


export function TenantOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <ProtectedRoute requireRole="tenant" requireVerification={true} redirect={false} fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

export function UserOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <ProtectedRoute requireRole="user" requireVerification={true} redirect={false} fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

export function AuthOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <ProtectedRoute requireVerification={false} redirect={false} fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

export function GuestOnly({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  return <>{!isAuthenticated() ? children : null}</>;
}

