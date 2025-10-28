'use client';

import { useState } from 'react';
import { DashboardPageLayout } from '@/components/dashboard';
import { useTenantBookings } from '@/hooks/tenant';
import { BookingCard } from '@/components/tenant';
import { ConfirmPaymentModal } from '@/components/tenant';
import { CancelOrderModal } from '@/components/tenant';
import { SendReminderModal } from '@/components/tenant';
import { Booking, BookingStatus, ConfirmPaymentData, SendReminderData, CancelOrderData } from '@/types/booking';
import { 
  Package, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Loader2,
  Filter,
  Receipt
} from 'lucide-react';

const statusOptions: { value: string; label: string; icon: any; color: string }[] = [
  { value: 'all', label: 'Semua', icon: Package, color: 'bg-gray-100 text-gray-700' },
  { value: 'pending_payment', label: 'Menunggu Pembayaran', icon: Clock, color: 'bg-yellow-100 text-yellow-700' },
  { value: 'waiting_confirmation', label: 'Menunggu Konfirmasi', icon: AlertCircle, color: 'bg-blue-100 text-blue-700' },
  { value: 'confirmed', label: 'Dikonfirmasi', icon: CheckCircle, color: 'bg-green-100 text-green-700' },
  { value: 'completed', label: 'Selesai', icon: Package, color: 'bg-gray-100 text-gray-700' },
  { value: 'cancelled', label: 'Dibatalkan/Ditolak', icon: XCircle, color: 'bg-red-100 text-red-700' },
];

export default function TenantBookingsPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [confirmPaymentModal, setConfirmPaymentModal] = useState<{ isOpen: boolean; booking: Booking | null }>({
    isOpen: false,
    booking: null,
  });
  const [cancelOrderModal, setCancelOrderModal] = useState<{ isOpen: boolean; booking: Booking | null }>({
    isOpen: false,
    booking: null,
  });
  const [sendReminderModal, setSendReminderModal] = useState<{ isOpen: boolean; booking: Booking | null }>({
    isOpen: false,
    booking: null,
  });

  const { bookings, stats, isLoading, error, refreshBookings, confirmPayment, sendReminder, cancelOrder } = useTenantBookings({
    status: selectedStatus === 'all' ? undefined : (selectedStatus as BookingStatus),
  });

  const handleConfirmPayment = (bookingId: number) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      setConfirmPaymentModal({ isOpen: true, booking });
    }
  };

  const handleRejectPayment = (bookingId: number) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      setConfirmPaymentModal({ isOpen: true, booking });
    }
  };

  const handleSendReminder = (bookingId: number) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      setSendReminderModal({ isOpen: true, booking });
    }
  };

  const handleCancelOrder = (bookingId: number) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      setCancelOrderModal({ isOpen: true, booking });
    }
  };

  const handleConfirmPaymentSubmit = async (bookingId: number, action: 'approve' | 'reject', rejectionReason?: string) => {
    await confirmPayment({ bookingId, action, rejectionReason });
    await refreshBookings();
  };

  const handleSendReminderSubmit = async (bookingId: number, type: 'payment_confirmed' | 'checkin_reminder', customMessage?: string) => {
    await sendReminder({ bookingId, type, customMessage });
  };

  const handleCancelOrderSubmit = async (bookingId: number, reason: string) => {
    await cancelOrder({ bookingId, reason });
    await refreshBookings();
  };

  return (
    <>
      <DashboardPageLayout>
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Receipt className="w-8 h-8 text-teal-600" />
              <h1 className="text-3xl font-bold text-gray-900">Transaction Management</h1>
            </div>
            <p className="text-gray-600">
              Kelola pesanan, konfirmasi pembayaran, dan kirim reminder ke tamu
            </p>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow p-4 border-l-4 border-gray-400">
                <p className="text-sm text-gray-600 mb-1">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-400">
                <p className="text-sm text-gray-600 mb-1">Menunggu Bayar</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendingPayment}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-400">
                <p className="text-sm text-gray-600 mb-1">Perlu Konfirmasi</p>
                <p className="text-2xl font-bold text-blue-600">{stats.waitingConfirmation}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-400">
                <p className="text-sm text-gray-600 mb-1">Dikonfirmasi</p>
                <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4 border-l-4 border-gray-400">
                <p className="text-sm text-gray-600 mb-1">Selesai</p>
                <p className="text-2xl font-bold text-gray-600">{stats.completed}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-400">
                <p className="text-sm text-gray-600 mb-1">Dibatalkan</p>
                <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Filter Status:</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => setSelectedStatus(option.value)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                      selectedStatus === option.value
                        ? `${option.color} ring-2 ring-offset-2 ring-blue-500`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bookings List */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
              <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <p className="text-red-800 font-semibold mb-2">Gagal memuat data</p>
              <p className="text-red-600 text-sm">{error}</p>
              <button
                onClick={refreshBookings}
                className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          ) : bookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Belum ada pesanan
              </h3>
              <p className="text-gray-600">
                {selectedStatus === 'all'
                  ? 'Belum ada pesanan masuk untuk properti Anda'
                  : `Belum ada pesanan dengan status "${statusOptions.find(o => o.value === selectedStatus)?.label}"`}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onConfirmPayment={handleConfirmPayment}
                  onRejectPayment={handleRejectPayment}
                  onSendReminder={handleSendReminder}
                  onCancelOrder={handleCancelOrder}
                  onViewDetails={(id) => alert(`View details for booking ${id} (coming soon)`)}
                />
              ))}
            </div>
          )}
        </div>
      </DashboardPageLayout>

      {/* Modals */}
      <ConfirmPaymentModal
        booking={confirmPaymentModal.booking}
        isOpen={confirmPaymentModal.isOpen}
        onClose={() => setConfirmPaymentModal({ isOpen: false, booking: null })}
        onConfirm={handleConfirmPaymentSubmit}
      />

      <CancelOrderModal
        booking={cancelOrderModal.booking}
        isOpen={cancelOrderModal.isOpen}
        onClose={() => setCancelOrderModal({ isOpen: false, booking: null })}
        onConfirm={handleCancelOrderSubmit}
      />

      <SendReminderModal
        booking={sendReminderModal.booking}
        isOpen={sendReminderModal.isOpen}
        onClose={() => setSendReminderModal({ isOpen: false, booking: null })}
        onSend={handleSendReminderSubmit}
      />
    </>
  );
}

