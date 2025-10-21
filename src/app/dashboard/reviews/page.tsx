/**
 * Reviews Page - Tenant Only
 * Halaman untuk tenant mengelola review dari customer
 */

'use client';

import {
  DashboardPageLayout,
  PageHeader,
  StatsGrid,
  StatCard,
  ContentCard,
  EmptyState
} from '@/components/dashboard';
import { Star, ThumbsUp, MessageSquare, TrendingUp } from 'lucide-react';

export default function ReviewsPage() {
  // TODO: Fetch real reviews dari API
  const reviews = [];

  return (
    <DashboardPageLayout>
      <div className="p-8">
        <PageHeader
          icon={Star}
          title="Review Management"
          description="Kelola dan balas review dari customer Anda"
        />

        <StatsGrid columns={4}>
          <StatCard
            title="Avg. Rating"
            value="4.8"
            icon={Star}
            borderColor="border-l-yellow-500"
            iconBgColor="bg-yellow-100"
            iconColor="text-yellow-600"
          />
          <StatCard
            title="Total Reviews"
            value={89}
            icon={MessageSquare}
            borderColor="border-l-blue-500"
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard
            title="Positive Reviews"
            value={76}
            icon={ThumbsUp}
            borderColor="border-l-green-500"
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <StatCard
            title="Response Rate"
            value="92%"
            icon={TrendingUp}
            borderColor="border-l-purple-500"
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
        </StatsGrid>

        <ContentCard title="Semua Review" noPadding>
          {reviews.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={Star}
                title="Belum Ada Review"
                description="Review dari customer akan muncul di sini"
                actionLabel="Lihat Properties"
                actionHref="/dashboard/properties"
              />
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {/* Review items will be here */}
            </div>
          )}
        </ContentCard>
      </div>
    </DashboardPageLayout>
  );
}

