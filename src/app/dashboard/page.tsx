'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '@/components/landing/Header'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatCard, BookingCard, EmptyState } from '@/components/dashboard'
import { useDashboard, useCurrencyFormatter } from '@/hooks/dashboard'
import { 
  Calendar, 
  TrendingUp,
  ChevronRight,
  CheckCircle
} from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  // Use main dashboard hook
  const { user, bookings, stats, isLoading, error } = useDashboard()
  
  // Use formatter hooks
  const { formatCurrency } = useCurrencyFormatter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.dispatchEvent(new CustomEvent('authChange'))
    router.push('/auth/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          <p className="text-gray-600">Memuat dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
            <CardDescription>Terjadi kesalahan saat memuat dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
              <Link href="/auth/login">Kembali ke Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in hook
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Teal accent line */}
      <div className="h-1 bg-gradient-to-r from-teal-500 to-blue-600"></div>

      {/* Dashboard Layout with Sidebar */}
      <div className="flex h-[calc(100vh-65px)]">
        {/* Sidebar */}
        <DashboardSidebar onLogout={handleLogout} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Booking"
            value={stats.totalBookings}
            icon={Calendar}
            borderColor="border-l-teal-500"
            iconBgColor="bg-teal-100"
            iconColor="text-teal-600"
          />
          <StatCard
            title="Akan Datang"
            value={stats.upcomingBookings}
            icon={Calendar}
            borderColor="border-l-blue-500"
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard
            title="Selesai"
            value={stats.completedBookings}
            icon={CheckCircle}
            borderColor="border-l-green-500"
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <StatCard
            title="Total Pengeluaran"
            value={formatCurrency(stats.totalSpent)}
            icon={TrendingUp}
            borderColor="border-l-purple-500"
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
        </div>

        {/* Main Content - Overview Section */}
        <div className="space-y-6">
            {/* Recent Bookings */}
            <Card className="shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Booking Terbaru</CardTitle>
                    <CardDescription>Lihat aktivitas booking terkini Anda</CardDescription>
                  </div>
                  <Button variant="ghost" asChild className="text-teal-600 hover:text-teal-700">
                    <Link href="#" onClick={() => {}}>
                      Lihat Semua
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {bookings.length > 0 ? (
                  bookings.slice(0, 3).map((booking, index) => (
                    <BookingCard 
                      key={booking.id} 
                      booking={booking} 
                      showSeparator={index > 0}
                    />
                  ))
                ) : (
                  <EmptyState
                    icon={Calendar}
                    title="Belum ada booking"
                    description="Mulai jelajahi dan booking penginapan impian Anda"
                    actionLabel="Cari Penginapan"
                    actionHref="/search"
                  />
                )}
              </CardContent>
            </Card>
          </div>
          </div>
        </main>
      </div>
    </div>
  )
}
