import { useDashboardAuth } from './useDashboardAuth'
import { useUserBookings } from './useUserBookings'
import { useUserStats } from './useUserStats'
import { DashboardData } from '@/types/dashboard'

/**
 * Main dashboard hook that combines authentication, bookings, and stats
 * 
 * @returns {DashboardData} Dashboard data including user, bookings, stats, loading state, and error
 * 
 * @example
 * ```tsx
 * const { user, bookings, stats, isLoading, error } = useDashboard()
 * 
 * if (isLoading) return <LoadingSpinner />
 * if (error) return <ErrorMessage error={error} />
 * 
 * return <DashboardContent user={user} bookings={bookings} stats={stats} />
 * ```
 */
export function useDashboard(): DashboardData {
  const { user, isLoading: authLoading, error: authError } = useDashboardAuth()
  
  const { 
    bookings, 
    isLoading: bookingsLoading, 
    error: bookingsError 
  } = useUserBookings({ 
    userId: user?.id,
    enabled: !!user 
  })

  const { 
    stats, 
    isLoading: statsLoading, 
    error: statsError 
  } = useUserStats({ 
    userId: user?.id,
    enabled: !!user 
  })

  // Combine loading states
  const isLoading = authLoading || bookingsLoading || statsLoading

  // Combine errors (prioritize auth error)
  const error = authError || bookingsError || statsError

  return {
    user,
    bookings,
    stats,
    isLoading,
    error
  }
}

