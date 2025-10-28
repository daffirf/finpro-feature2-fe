import { useState } from 'react';
import { Booking } from '@/types/booking';
import { formatCurrency } from '@/lib/utils';
import { X, XCircle, AlertTriangle } from 'lucide-react';

interface CancelOrderModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (bookingId: number, reason: string) => Promise<void>;
}

export function CancelOrderModal({
  booking,
  isOpen,
  onClose,
  onConfirm,
}: CancelOrderModalProps) {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !booking) return null;

  const handleSubmit = async () => {
    if (!reason.trim()) {
      alert('Silakan masukkan alasan pembatalan');
      return;
    }

    setIsSubmitting(true);
    try {
      await onConfirm(booking.id, reason);
      onClose();
      setReason('');
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Gagal membatalkan pesanan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setReason('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-bold text-gray-900">Batalkan Pesanan</h2>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Warning */}
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800 font-semibold mb-2">
              ⚠️ Perhatian: Tindakan ini tidak dapat dibatalkan!
            </p>
            <p className="text-sm text-red-700">
              Pesanan dengan status "Menunggu Pembayaran" akan dibatalkan secara permanen.
            </p>
          </div>

          {/* Booking Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Detail Pesanan</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Kode Booking:</span>
                <span className="font-medium text-gray-900">{booking.bookingCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Penyewa:</span>
                <span className="font-medium text-gray-900">{booking.user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Property:</span>
                <span className="font-medium text-gray-900">{booking.property.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-bold text-blue-600">{formatCurrency(booking.totalPrice)}</span>
              </div>
            </div>
          </div>

          {/* Reason Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alasan Pembatalan <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Contoh: Penyewa membatalkan booking, Properti tidak tersedia, dll."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              rows={4}
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-500 mt-1">
              * Alasan akan dikirimkan ke penyewa via email
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !reason.trim()}
            className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              'Memproses...'
            ) : (
              <>
                <XCircle className="w-5 h-5" />
                Ya, Batalkan Pesanan
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

