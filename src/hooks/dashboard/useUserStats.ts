import { useState, useEffect } from 'react'
import { Stats } from '@/types/dashboard'
// import { api } from '@/lib/api' // Uncomment when ready for API integration

interface UseUserStatsOptions {
  userId?: string
  enabled?: boolean
}

export function useUserStats({ userId, enabled = true }: UseUserStatsOptions = {}) {
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    upcomingBookings: 0,
    completedBookings: 0,
    totalSpent: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled || !userId) {
      setIsLoading(false)
      return
    }

    const fetchStats = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // TODO: Replace with actual API call
        // const data = await api.get<Stats>(`/stats/user/${userId}`)
        
        // Mock data for now
        await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
        
        const mockStats: Stats = {
          totalBookings: 5,
          upcomingBookings: 2,
          completedBookings: 3,
          totalSpent: 12500000
        }

        setStats(mockStats)
      } catch (err) {
        console.error('Error fetching stats:', err)
        setError('Failed to load statistics')
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [userId, enabled])

  const refetch = () => {
    if (userId) {
      setIsLoading(true)
      // Trigger re-fetch
    }
  }

  return { stats, isLoading, error, refetch }
}

