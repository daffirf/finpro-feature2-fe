import { useState } from 'react';
import { Booking } from '@/types/booking';
import { formatCurrency } from '@/lib/utils';
import { X, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface ConfirmPaymentModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (bookingId: number, action: 'approve' | 'reject', rejectionReason?: string) => Promise<void>;
}

export function ConfirmPaymentModal({
  booking,
  isOpen,
  onClose,
  onConfirm,
}: ConfirmPaymentModalProps) {
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !booking) return null;

  const handleSubmit = async () => {
    if (!action) return;
    
    if (action === 'reject' && !rejectionReason.trim()) {
      alert('Silakan masukkan alasan penolakan');
      return;
    }

    setIsSubmitting(true);
    try {
      await onConfirm(booking.id, action, rejectionReason);
      onClose();
      setAction(null);
      setRejectionReason('');
    } catch (error) {
      console.error('Error confirming payment:', error);
      alert('Gagal memproses pembayaran. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setAction(null);
      setRejectionReason('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Konfirmasi Pembayaran</h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Booking Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Detail Booking</h3>
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
                <span className="text-gray-600">Email:</span>
                <span className="font-medium text-gray-900">{booking.user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Pembayaran:</span>
                <span className="font-bold text-blue-600">{formatCurrency(booking.totalPrice)}</span>
              </div>
            </div>
          </div>

          {/* Payment Proof */}
          {booking.paymentProof && (
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Bukti Pembayaran</h3>
              <div className="flex gap-4">
                <img
                  src={booking.paymentProof.imageUrl}
                  alt="Payment Proof"
                  className="w-32 h-32 object-cover rounded-lg border-2 border-purple-300 cursor-pointer hover:opacity-80"
                  onClick={() => window.open(booking.paymentProof!.imageUrl, '_blank')}
                />
                <div className="text-sm space-y-1">
                  <div>
                    <span className="text-gray-600">Bank:</span>{' '}
                    <span className="font-medium text-gray-900">{booking.paymentProof.bankName}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Nama Akun:</span>{' '}
                    <span className="font-medium text-gray-900">{booking.paymentProof.accountName}</span>
                  </div>
                  {booking.paymentProof.amount && (
                    <div>
                      <span className="text-gray-600">Nominal Transfer:</span>{' '}
                      <span className="font-bold text-purple-600">
                        {formatCurrency(booking.paymentProof.amount)}
                      </span>
                    </div>
                  )}
                  <div className="text-xs text-gray-500">
                    Upload: {new Date(booking.paymentProof.uploadedAt).toLocaleString('id-ID')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Selection */}
          {!action ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-4">
                Silakan pilih tindakan yang akan diambil:
              </p>
              <button
                onClick={() => setAction('approve')}
                className="w-full px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-3"
              >
                <CheckCircle className="w-5 h-5" />
                Terima Pembayaran
              </button>
              <button
                onClick={() => setAction('reject')}
                className="w-full px-6 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-3"
              >
                <XCircle className="w-5 h-5" />
                Tolak Pembayaran
              </button>
            </div>
          ) : action === 'approve' ? (
            /* Approval Confirmation */
            <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-12 h-12 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-green-900 mb-2">
                    Terima Pembayaran
                  </h4>
                  <p className="text-sm text-green-700 mb-4">
                    Dengan menerima pembayaran ini:
                  </p>
                  <ul className="text-sm text-green-700 space-y-1 list-disc list-inside mb-4">
                    <li>Status booking akan berubah menjadi <strong>"Dikonfirmasi"</strong></li>
                    <li>Email konfirmasi akan dikirim ke <strong>{booking.user.email}</strong></li>
                    <li>Detail booking dan tata cara check-in akan dikirimkan</li>
                  </ul>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Memproses...' : 'Ya, Terima Pembayaran'}
                    </button>
                    <button
                      onClick={() => setAction(null)}
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Rejection Form */
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
              <div className="flex items-start gap-4 mb-4">
                <AlertTriangle className="w-12 h-12 text-red-600 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-red-900 mb-2">
                    Tolak Pembayaran
                  </h4>
                  <p className="text-sm text-red-700 mb-2">
                    Silakan berikan alasan penolakan:
                  </p>
                </div>
              </div>
              
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Contoh: Nominal pembayaran tidak sesuai, Rekening pengirim tidak valid, dll."
                className="w-full px-4 py-3 border-2 border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                rows={4}
                disabled={isSubmitting}
              />
              
              <p className="text-xs text-red-600 mt-2 mb-4">
                * Alasan penolakan akan dikirimkan ke user via email
              </p>
              
              <div className="flex gap-2">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !rejectionReason.trim()}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Memproses...' : 'Ya, Tolak Pembayaran'}
                </button>
                <button
                  onClick={() => setAction(null)}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
                >
                  Batal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

