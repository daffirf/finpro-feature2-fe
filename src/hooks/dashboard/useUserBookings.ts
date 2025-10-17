import { useState, useEffect } from 'react'
import { Booking } from '@/types/dashboard'
// import { api } from '@/lib/api' // Uncomment when ready for API integration

interface UseUserBookingsOptions {
  userId?: string
  enabled?: boolean
}

export function useUserBookings({ userId, enabled = true }: UseUserBookingsOptions = {}) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled || !userId) {
      setIsLoading(false)
      return
    }

    const fetchBookings = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // TODO: Replace with actual API call
        // const data = await api.get<Booking[]>(`/bookings/user/${userId}`)
        
        // Mock data for now
        await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
        
        const mockBookings: Booking[] = [
          {
            id: '1',
            propertyName: 'Luxury Beach Villa',
            propertyImage: '/placeholder-property.jpg',
            location: 'Bali, Indonesia',
            checkIn: '2025-10-20',
            checkOut: '2025-10-25',
            status: 'upcoming',
            totalPrice: 5000000
          },
          {
            id: '2',
            propertyName: 'Mountain Resort',
            propertyImage: '/placeholder-property.jpg',
            location: 'Bandung, Indonesia',
            checkIn: '2025-09-15',
            checkOut: '2025-09-18',
            status: 'completed',
            totalPrice: 2500000
          },
          {
            id: '3',
            propertyName: 'City Center Hotel',
            propertyImage: '/placeholder-property.jpg',
            location: 'Jakarta, Indonesia',
            checkIn: '2025-11-01',
            checkOut: '2025-11-05',
            status: 'upcoming',
            totalPrice: 3500000
          }
        ]

        setBookings(mockBookings)
      } catch (err) {
        console.error('Error fetching bookings:', err)
        setError('Failed to load bookings')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [userId, enabled])

  const refetch = () => {
    if (userId) {
      setIsLoading(true)
      // Trigger re-fetch by updating a dependency
    }
  }

  return { bookings, isLoading, error, refetch }
}

