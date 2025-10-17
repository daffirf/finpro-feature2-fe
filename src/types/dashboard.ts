export interface UserData {
  id: string
  name: string
  email: string
  role: string
  phone?: string
}

export interface Booking {
  id: string
  propertyName: string
  propertyImage: string
  location: string
  checkIn: string
  checkOut: string
  status: 'upcoming' | 'completed' | 'cancelled'
  totalPrice: number
}

export interface Stats {
  totalBookings: number
  upcomingBookings: number
  completedBookings: number
  totalSpent: number
}

export interface DashboardData {
  user: UserData | null
  bookings: Booking[]
  stats: Stats
  isLoading: boolean
  error: string | null
}

