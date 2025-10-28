import { useState, useEffect } from 'react';
import { Booking, BookingStats, BookingFilters, ConfirmPaymentData, SendReminderData, CancelOrderData } from '@/types/booking';
import { dummyTenantBookings, calculateBookingStats, filterBookingsByStatus } from '@/data/dummyBookings';

// Mock delay
const mockDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function useTenantBookings(filters?: BookingFilters) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<BookingStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, [filters?.status]);

  const fetchBookings = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await mockDelay(500);

      // Filter bookings by status
      let filteredBookings = filters?.status
        ? filterBookingsByStatus(dummyTenantBookings, filters.status)
        : dummyTenantBookings;

      // Sort by most recent
      filteredBookings = [...filteredBookings].sort((a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

      setBookings(filteredBookings);
      setStats(calculateBookingStats(dummyTenantBookings));
    } catch (err) {
      setError('Gagal memuat data booking');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmPayment = async (data: ConfirmPaymentData): Promise<void> => {
    await mockDelay(1000);

    console.log('🔧 [MOCK API] Confirm payment:', data);

    // Update booking status
    const updatedBookings = bookings.map(b => {
      if (b.id === data.bookingId) {
        if (data.action === 'approve') {
          return {
            ...b,
            status: 'confirmed' as const,
            confirmedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
        } else {
          return {
            ...b,
            status: 'rejected' as const,
            rejectionReason: data.rejectionReason || 'Pembayaran ditolak',
            updatedAt: new Date().toISOString(),
          };
        }
      }
      return b;
    });

    setBookings(updatedBookings);
    setStats(calculateBookingStats(updatedBookings));

    // In real app, send email notification to user
    console.log(`📧 Email sent to user: Payment ${data.action === 'approve' ? 'approved' : 'rejected'}`);
  };

  const sendReminder = async (data: SendReminderData): Promise<void> => {
    await mockDelay(800);

    console.log('🔧 [MOCK API] Send reminder:', data);

    const booking = bookings.find(b => b.id === data.bookingId);
    if (!booking) throw new Error('Booking not found');

    // In real app, send email via API
    console.log(`📧 Reminder email sent to ${booking.user.email}`);
    console.log(`Type: ${data.type}`);
    console.log(`Custom message: ${data.customMessage || 'N/A'}`);
  };

  const cancelOrder = async (data: CancelOrderData): Promise<void> => {
    await mockDelay(1000);

    console.log('🔧 [MOCK API] Cancel order:', data);

    // Update booking status
    const updatedBookings = bookings.map(b => {
      if (b.id === data.bookingId) {
        return {
          ...b,
          status: 'cancelled' as const,
          cancelledAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          rejectionReason: data.reason,
        };
      }
      return b;
    });

    setBookings(updatedBookings);
    setStats(calculateBookingStats(updatedBookings));

    // In real app, send email notification to user
    console.log(`📧 Cancellation email sent to user`);
  };

  return {
    bookings,
    stats,
    isLoading,
    error,
    refreshBookings: fetchBookings,
    confirmPayment,
    sendReminder,
    cancelOrder,
  };
}

