/**
 * Dashboard Page Layout - Wrapper untuk semua dashboard pages
 * Mengurangi boilerplate code dengan shared structure
 */

'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { TenantRoute } from '@/components/auth';
import { DashboardSidebar } from './DashboardSidebar';
import { useAuth } from '@/hooks/auth/useAuth';

interface DashboardPageLayoutProps {
  children: ReactNode;
}

export function DashboardPageLayout({ children }: DashboardPageLayoutProps) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    // Clear Zustand store
    logout();
    
    // Clear legacy localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Trigger custom event for header update
    window.dispatchEvent(new CustomEvent('authChange'));
    
    router.push('/auth/login');
  };

  return (
    <TenantRoute>
      <div className="flex h-screen overflow-hidden">
        <DashboardSidebar onLogout={handleLogout} />
        
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </TenantRoute>
  );
}

