import { useState } from 'react';
import { Booking } from '@/types/booking';
import { formatCurrency } from '@/lib/utils';
import { X, Mail, Send } from 'lucide-react';

interface SendReminderModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onSend: (bookingId: number, type: 'payment_confirmed' | 'checkin_reminder', customMessage?: string) => Promise<void>;
}

export function SendReminderModal({
  booking,
  isOpen,
  onClose,
  onSend,
}: SendReminderModalProps) {
  const [reminderType, setReminderType] = useState<'payment_confirmed' | 'checkin_reminder'>('payment_confirmed');
  const [customMessage, setCustomMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !booking) return null;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSend(booking.id, reminderType, customMessage || undefined);
      onClose();
      setCustomMessage('');
    } catch (error) {
      console.error('Error sending reminder:', error);
      alert('Gagal mengirim email. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setCustomMessage('');
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Kirim Email Reminder</h2>
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
        <div className="p-6 space-y-6">
          {/* Booking Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Kepada:</h3>
            <div className="flex items-center gap-3">
              <img
                src={booking.user.avatar || `https://ui-avatars.com/api/?name=${booking.user.name}`}
                alt={booking.user.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-900">{booking.user.name}</p>
                <p className="text-sm text-gray-600">{booking.user.email}</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-blue-200 text-sm space-y-1">
              <p><span className="text-gray-600">Booking:</span> <span className="font-medium">{booking.bookingCode}</span></p>
              <p><span className="text-gray-600">Property:</span> <span className="font-medium">{booking.property.name}</span></p>
              <p><span className="text-gray-600">Check-in:</span> <span className="font-medium">{formatDate(booking.checkIn)}</span></p>
            </div>
          </div>

          {/* Reminder Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Pilih Jenis Email
            </label>
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                style={{ borderColor: reminderType === 'payment_confirmed' ? '#3B82F6' : '#E5E7EB' }}>
                <input
                  type="radio"
                  name="reminderType"
                  value="payment_confirmed"
                  checked={reminderType === 'payment_confirmed'}
                  onChange={(e) => setReminderType(e.target.value as any)}
                  className="mt-1"
                />
                <div>
                  <p className="font-semibold text-gray-900">Konfirmasi Pembayaran Diterima</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Email berisi konfirmasi pembayaran telah diterima, detail booking, dan tata cara check-in.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                style={{ borderColor: reminderType === 'checkin_reminder' ? '#3B82F6' : '#E5E7EB' }}>
                <input
                  type="radio"
                  name="reminderType"
                  value="checkin_reminder"
                  checked={reminderType === 'checkin_reminder'}
                  onChange={(e) => setReminderType(e.target.value as any)}
                  className="mt-1"
                />
                <div>
                  <p className="font-semibold text-gray-900">Pengingat Check-in (H-1)</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Email pengingat bahwa check-in akan dilakukan besok, termasuk lokasi dan kontak properti.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-xs font-medium text-gray-500 mb-2">PREVIEW EMAIL:</p>
            <div className="bg-white border border-gray-300 rounded p-3 text-sm">
              {reminderType === 'payment_confirmed' ? (
                <>
                  <p className="font-semibold text-gray-900 mb-2">Pembayaran Anda Telah Dikonfirmasi! ✅</p>
                  <p className="text-gray-700 mb-2">Halo {booking.user.name},</p>
                  <p className="text-gray-700 mb-2">
                    Pembayaran Anda untuk booking <strong>{booking.bookingCode}</strong> telah kami terima dan dikonfirmasi.
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Detail Booking:</strong><br />
                    - Property: {booking.property.name}<br />
                    - Check-in: {formatDate(booking.checkIn)}<br />
                    - Check-out: {formatDate(booking.checkOut)}<br />
                    - Total: {formatCurrency(booking.totalPrice)}
                  </p>
                  <p className="text-gray-700">
                    Kami tunggu kedatangan Anda! 🏡
                  </p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-gray-900 mb-2">Pengingat Check-in Besok! 📅</p>
                  <p className="text-gray-700 mb-2">Halo {booking.user.name},</p>
                  <p className="text-gray-700 mb-2">
                    Ini adalah pengingat bahwa check-in Anda di <strong>{booking.property.name}</strong> akan dilakukan besok.
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Detail Check-in:</strong><br />
                    - Tanggal: {formatDate(booking.checkIn)}<br />
                    - Lokasi: {booking.property.address}, {booking.property.city}
                  </p>
                  <p className="text-gray-700">
                    Kami tunggu kedatangan Anda besok! 🎉
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Custom Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pesan Tambahan (Opsional)
            </label>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Tambahkan pesan khusus untuk tamu (opsional)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
              disabled={isSubmitting}
            />
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
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              'Mengirim...'
            ) : (
              <>
                <Send className="w-5 h-5" />
                Kirim Email
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

