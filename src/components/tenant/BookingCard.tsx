import { Booking } from '@/types/booking';
import { formatCurrency } from '@/lib/utils';
import { 
  Calendar, 
  Users, 
  Clock,
  MapPin,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader,
  Package
} from 'lucide-react';

interface BookingCardProps {
  booking: Booking;
  onConfirmPayment?: (bookingId: number) => void;
  onRejectPayment?: (bookingId: number) => void;
  onSendReminder?: (bookingId: number) => void;
  onCancelOrder?: (bookingId: number) => void;
  onViewDetails?: (bookingId: number) => void;
}

const statusConfig = {
  pending_payment: {
    label: 'Menunggu Pembayaran',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: Clock,
  },
  waiting_confirmation: {
    label: 'Menunggu Konfirmasi',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: AlertCircle,
  },
  confirmed: {
    label: 'Dikonfirmasi',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: CheckCircle,
  },
  completed: {
    label: 'Selesai',
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: Package,
  },
  cancelled: {
    label: 'Dibatalkan',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: XCircle,
  },
  rejected: {
    label: 'Ditolak',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: XCircle,
  },
};

export function BookingCard({
  booking,
  onConfirmPayment,
  onRejectPayment,
  onSendReminder,
  onCancelOrder,
  onViewDetails,
}: BookingCardProps) {
  const statusInfo = statusConfig[booking.status];
  const StatusIcon = statusInfo.icon;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-bold text-gray-900">
              {booking.bookingCode}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusInfo.color} flex items-center gap-1`}>
              <StatusIcon className="w-3 h-3" />
              {statusInfo.label}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Dibuat: {formatDate(booking.createdAt)}
          </p>
        </div>
      </div>

      {/* User Info */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={booking.user.avatar || `https://ui-avatars.com/api/?name=${booking.user.name}`}
            alt={booking.user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{booking.user.name}</h3>
            <div className="flex flex-col gap-1 mt-1">
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Mail className="w-3 h-3" />
                {booking.user.email}
              </div>
              {booking.user.phone && (
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Phone className="w-3 h-3" />
                  {booking.user.phone}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Property & Room Info */}
      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-gray-900">{booking.room.name}</p>
            <p className="text-sm text-gray-600">{booking.property.name}</p>
            <p className="text-xs text-gray-500">{booking.property.address}, {booking.property.city}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-3 border-t">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Check-in</p>
              <p className="text-sm font-medium text-gray-900">{formatDate(booking.checkIn)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Check-out</p>
              <p className="text-sm font-medium text-gray-900">{formatDate(booking.checkOut)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-500">Malam</p>
            <p className="text-sm font-semibold text-gray-900">{booking.nights} malam</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Tamu</p>
            <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
              <Users className="w-3 h-3" />
              {booking.guests}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-sm font-bold text-blue-600">{formatCurrency(booking.totalPrice)}</p>
          </div>
        </div>
      </div>

      {/* Special Request */}
      {booking.specialRequest && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-xs font-medium text-blue-800 mb-1">Permintaan Khusus:</p>
          <p className="text-sm text-blue-700">{booking.specialRequest}</p>
        </div>
      )}

      {/* Payment Proof */}
      {booking.paymentProof && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
          <p className="text-xs font-medium text-purple-800 mb-2">Bukti Pembayaran:</p>
          <div className="flex items-center gap-3">
            <img
              src={booking.paymentProof.imageUrl}
              alt="Payment Proof"
              className="w-16 h-16 object-cover rounded border border-purple-300 cursor-pointer hover:opacity-80"
              onClick={() => window.open(booking.paymentProof!.imageUrl, '_blank')}
            />
            <div className="text-xs text-purple-700">
              <p><strong>{booking.paymentProof.bankName}</strong> - {booking.paymentProof.accountName}</p>
              <p className="text-purple-600">
                {booking.paymentProof.amount && formatCurrency(booking.paymentProof.amount)}
              </p>
              <p className="text-purple-500 text-[10px]">
                Upload: {new Date(booking.paymentProof.uploadedAt).toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Reason */}
      {booking.rejectionReason && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-xs font-medium text-red-800 mb-1">Alasan Penolakan:</p>
          <p className="text-sm text-red-700">{booking.rejectionReason}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2 pt-4 border-t">
        {booking.status === 'waiting_confirmation' && (
          <>
            <button
              onClick={() => onConfirmPayment?.(booking.id)}
              className="flex-1 min-w-[120px] px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Terima Pembayaran
            </button>
            <button
              onClick={() => onRejectPayment?.(booking.id)}
              className="flex-1 min-w-[120px] px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              Tolak Pembayaran
            </button>
          </>
        )}

        {booking.status === 'confirmed' && (
          <button
            onClick={() => onSendReminder?.(booking.id)}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Kirim Email Reminder
          </button>
        )}

        {booking.status === 'pending_payment' && (
          <button
            onClick={() => onCancelOrder?.(booking.id)}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <XCircle className="w-4 h-4" />
            Batalkan Pesanan
          </button>
        )}

        <button
          onClick={() => onViewDetails?.(booking.id)}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
        >
          Lihat Detail
        </button>
      </div>
    </div>
  );
}

