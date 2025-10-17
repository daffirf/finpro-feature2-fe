import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Home, MapPin, Clock, CheckCircle, XCircle } from 'lucide-react'

interface BookingCardProps {
  booking: {
    id: string
    propertyName: string
    location: string
    checkIn: string
    checkOut: string
    status: 'upcoming' | 'completed' | 'cancelled'
    totalPrice: number
  }
  showSeparator?: boolean
}

export function BookingCard({ booking, showSeparator = false }: BookingCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return (
          <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100">
            <Clock className="w-3 h-3 mr-1" />
            Akan Datang
          </Badge>
        )
      case 'completed':
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Selesai
          </Badge>
        )
      case 'cancelled':
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Dibatalkan
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <>
      {showSeparator && <Separator className="my-4" />}
      <div className="flex flex-col sm:flex-row gap-4 group hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors">
        <div className="w-full sm:w-32 h-24 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:shadow-md transition-shadow">
          <Home className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 text-lg group-hover:text-teal-600 transition-colors">
                {booking.propertyName}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <MapPin className="w-4 h-4" />
                <span>{booking.location}</span>
              </div>
            </div>
            {getStatusBadge(booking.status)}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{formatDate(booking.checkIn)}</span>
              <span className="mx-2">→</span>
              <span className="font-medium">{formatDate(booking.checkOut)}</span>
            </div>
            <div className="text-lg font-bold text-teal-600">
              {formatCurrency(booking.totalPrice)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

