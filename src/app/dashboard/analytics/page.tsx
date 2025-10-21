/**
 * Analytics Page - Tenant Only
 * Halaman untuk tenant melihat analytics dan reports
 */

'use client';

import { 
  DashboardPageLayout,
  PageHeader,
  StatsGrid,
  StatCard,
  ContentCard
} from '@/components/dashboard';
import { BarChart3, TrendingUp, DollarSign, Users, Calendar, Building2, DoorOpen } from 'lucide-react';
import { useCurrencyFormatter, useTenantAnalytics } from '@/hooks/dashboard';

export default function AnalyticsPage() {
  const { formatCurrency } = useCurrencyFormatter();
  
  // Use custom hook to fetch analytics from backend
  const { stats, isLoading, error } = useTenantAnalytics();

  // Show loading state
  if (isLoading) {
    return (
      <DashboardPageLayout>
        <div className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat analytics...</p>
          </div>
        </div>
      </DashboardPageLayout>
    );
  }

  // Show error state
  if (error) {
    return (
      <DashboardPageLayout>
        <div className="p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </DashboardPageLayout>
    );
  }

  return (
    <DashboardPageLayout>
      <div className="p-8">
        <PageHeader
          icon={BarChart3}
          title="Analytics & Reports"
          description="Monitor performa property dan booking Anda"
        />

        {/* Property & Room Stats */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Property & Room Overview</h2>
          <StatsGrid columns={3}>
            <StatCard
              title="Total Properties"
              value={stats?.totalProperties || 0}
              icon={Building2}
              borderColor="border-l-teal-500"
              iconBgColor="bg-teal-100"
              iconColor="text-teal-600"
            />
            <StatCard
              title="Total Rooms"
              value={stats?.totalRooms || 0}
              icon={DoorOpen}
              borderColor="border-l-blue-500"
              iconBgColor="bg-blue-100"
              iconColor="text-blue-600"
            />
            <StatCard
              title="Active Rooms"
              value={stats?.activeRooms || 0}
              icon={DoorOpen}
              borderColor="border-l-green-500"
              iconBgColor="bg-green-100"
              iconColor="text-green-600"
            />
          </StatsGrid>
        </div>

        {/* Revenue & Performance Stats */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue & Performance</h2>
          <StatsGrid columns={4}>
            <StatCard
              title="Total Revenue"
              value={formatCurrency(stats?.totalRevenue || 0)}
              icon={DollarSign}
              borderColor="border-l-green-500"
              iconBgColor="bg-green-100"
              iconColor="text-green-600"
            />
            <StatCard
              title="Total Bookings"
              value={stats?.totalBookings || 0}
              icon={Calendar}
              borderColor="border-l-blue-500"
              iconBgColor="bg-blue-100"
              iconColor="text-blue-600"
            />
            <StatCard
              title="Occupancy Rate"
              value={`${stats?.occupancyRate || 0}%`}
              icon={TrendingUp}
              borderColor="border-l-purple-500"
              iconBgColor="bg-purple-100"
              iconColor="text-purple-600"
            />
            <StatCard
              title="Total Guests"
              value={stats?.totalGuests || 0}
              icon={Users}
              borderColor="border-l-orange-500"
              iconBgColor="bg-orange-100"
              iconColor="text-orange-600"
            />
          </StatsGrid>
        </div>

        {/* Charts Placeholder */}
        <ContentCard>
          <div className="text-center py-8">
            <BarChart3 className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Analytics Dashboard Coming Soon
            </h3>
            <p className="text-gray-600">
              Fitur analytics lengkap dengan charts dan reports akan segera tersedia
            </p>
          </div>
        </ContentCard>
      </div>
    </DashboardPageLayout>
  );
}

