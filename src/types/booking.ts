// Booking/Transaction Types for Tenant Management

export type BookingStatus = 
  | 'pending_payment'        // Menunggu pembayaran
  | 'waiting_confirmation'   // Bukti bayar uploaded, tunggu konfirmasi
  | 'confirmed'              // Pembayaran dikonfirmasi
  | 'cancelled'              // Dibatalkan
  | 'completed'              // Selesai (check-out)
  | 'rejected';              // Pembayaran ditolak

export interface BookingUser {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface BookingProperty {
  id: number;
  name: string;
  address: string;
  city: string;
  images: string[];
}

export interface BookingRoom {
  id: number;
  name: string;
  capacity: number;
  price: number;
}

export interface PaymentProof {
  id: number;
  imageUrl: string;
  uploadedAt: string;
  accountName?: string;
  accountNumber?: string;
  bankName?: string;
  amount?: number;
}

export interface Booking {
  id: number;
  bookingCode: string;
  user: BookingUser;
  property: BookingProperty;
  room: BookingRoom;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  paymentProof?: PaymentProof;
  specialRequest?: string;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  cancelledAt?: string;
  rejectionReason?: string;
}

export interface BookingStats {
  total: number;
  pendingPayment: number;
  waitingConfirmation: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}

export interface ConfirmPaymentData {
  bookingId: number;
  action: 'approve' | 'reject';
  rejectionReason?: string;
}

export interface SendReminderData {
  bookingId: number;
  type: 'payment_confirmed' | 'checkin_reminder';
  customMessage?: string;
}

export interface CancelOrderData {
  bookingId: number;
  reason: string;
}

export interface BookingFilters {
  status?: BookingStatus;
  propertyId?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
}

