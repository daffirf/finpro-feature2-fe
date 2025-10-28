import { Booking, BookingStats } from '@/types/booking';

// Dummy bookings data for tenant transaction management
export const dummyTenantBookings: Booking[] = [
  {
    id: 1,
    bookingCode: 'BK-2025-001',
    user: {
      id: 101,
      name: 'Ahmad Rizki',
      email: 'ahmad.rizki@email.com',
      phone: '+62812345678',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    property: {
      id: 1,
      name: 'Luxury Beach Villa Seminyak',
      address: 'Jl. Pantai Seminyak No. 123',
      city: 'Bali',
      images: ['https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800'],
    },
    room: {
      id: 1,
      name: 'Master Suite with Ocean View',
      capacity: 2,
      price: 3500000,
    },
    checkIn: '2025-11-05',
    checkOut: '2025-11-08',
    nights: 3,
    guests: 2,
    totalPrice: 10500000,
    status: 'waiting_confirmation',
    paymentProof: {
      id: 1,
      imageUrl: 'https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=Payment+Proof',
      uploadedAt: '2025-10-28T10:30:00Z',
      accountName: 'Ahmad Rizki',
      bankName: 'BCA',
      amount: 10500000,
    },
    specialRequest: 'Mohon kamar menghadap pantai',
    createdAt: '2025-10-27T15:00:00Z',
    updatedAt: '2025-10-28T10:30:00Z',
  },
  {
    id: 2,
    bookingCode: 'BK-2025-002',
    user: {
      id: 102,
      name: 'Siti Nurhaliza',
      email: 'siti.nur@email.com',
      phone: '+62823456789',
      avatar: 'https://i.pravatar.cc/150?img=32',
    },
    property: {
      id: 1,
      name: 'Luxury Beach Villa Seminyak',
      address: 'Jl. Pantai Seminyak No. 123',
      city: 'Bali',
      images: ['https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800'],
    },
    room: {
      id: 2,
      name: 'Deluxe Garden Room',
      capacity: 2,
      price: 2500000,
    },
    checkIn: '2025-11-10',
    checkOut: '2025-11-15',
    nights: 5,
    guests: 2,
    totalPrice: 12500000,
    status: 'confirmed',
    paymentProof: {
      id: 2,
      imageUrl: 'https://via.placeholder.com/800x600/10B981/FFFFFF?text=Payment+Proof',
      uploadedAt: '2025-10-26T14:20:00Z',
      accountName: 'Siti Nurhaliza',
      bankName: 'Mandiri',
      amount: 12500000,
    },
    confirmedAt: '2025-10-26T16:00:00Z',
    createdAt: '2025-10-25T10:00:00Z',
    updatedAt: '2025-10-26T16:00:00Z',
  },
  {
    id: 3,
    bookingCode: 'BK-2025-003',
    user: {
      id: 103,
      name: 'Budi Santoso',
      email: 'budi.santoso@email.com',
      phone: '+62834567890',
      avatar: 'https://i.pravatar.cc/150?img=15',
    },
    property: {
      id: 1,
      name: 'Luxury Beach Villa Seminyak',
      address: 'Jl. Pantai Seminyak No. 123',
      city: 'Bali',
      images: ['https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800'],
    },
    room: {
      id: 3,
      name: 'Family Suite 2 Bedrooms',
      capacity: 4,
      price: 4500000,
    },
    checkIn: '2025-11-20',
    checkOut: '2025-11-25',
    nights: 5,
    guests: 4,
    totalPrice: 22500000,
    status: 'pending_payment',
    specialRequest: 'Kami akan datang dengan 2 anak kecil, mohon siapkan baby cot',
    createdAt: '2025-10-28T08:00:00Z',
    updatedAt: '2025-10-28T08:00:00Z',
  },
  {
    id: 4,
    bookingCode: 'BK-2025-004',
    user: {
      id: 104,
      name: 'Dewi Lestari',
      email: 'dewi.lestari@email.com',
      phone: '+62845678901',
      avatar: 'https://i.pravatar.cc/150?img=25',
    },
    property: {
      id: 1,
      name: 'Luxury Beach Villa Seminyak',
      address: 'Jl. Pantai Seminyak No. 123',
      city: 'Bali',
      images: ['https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800'],
    },
    room: {
      id: 1,
      name: 'Master Suite with Ocean View',
      capacity: 2,
      price: 3500000,
    },
    checkIn: '2025-10-20',
    checkOut: '2025-10-23',
    nights: 3,
    guests: 2,
    totalPrice: 10500000,
    status: 'completed',
    paymentProof: {
      id: 4,
      imageUrl: 'https://via.placeholder.com/800x600/10B981/FFFFFF?text=Payment+Proof',
      uploadedAt: '2025-10-15T11:00:00Z',
      accountName: 'Dewi Lestari',
      bankName: 'BNI',
      amount: 10500000,
    },
    confirmedAt: '2025-10-15T14:00:00Z',
    createdAt: '2025-10-14T09:00:00Z',
    updatedAt: '2025-10-23T12:00:00Z',
  },
  {
    id: 5,
    bookingCode: 'BK-2025-005',
    user: {
      id: 105,
      name: 'Eko Prasetyo',
      email: 'eko.prasetyo@email.com',
      phone: '+62856789012',
      avatar: 'https://i.pravatar.cc/150?img=18',
    },
    property: {
      id: 1,
      name: 'Luxury Beach Villa Seminyak',
      address: 'Jl. Pantai Seminyak No. 123',
      city: 'Bali',
      images: ['https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800'],
    },
    room: {
      id: 2,
      name: 'Deluxe Garden Room',
      capacity: 2,
      price: 2500000,
    },
    checkIn: '2025-11-01',
    checkOut: '2025-11-03',
    nights: 2,
    guests: 2,
    totalPrice: 5000000,
    status: 'cancelled',
    cancelledAt: '2025-10-26T10:00:00Z',
    createdAt: '2025-10-25T14:00:00Z',
    updatedAt: '2025-10-26T10:00:00Z',
  },
  {
    id: 6,
    bookingCode: 'BK-2025-006',
    user: {
      id: 106,
      name: 'Fitri Handayani',
      email: 'fitri.handayani@email.com',
      phone: '+62867890123',
      avatar: 'https://i.pravatar.cc/150?img=28',
    },
    property: {
      id: 1,
      name: 'Luxury Beach Villa Seminyak',
      address: 'Jl. Pantai Seminyak No. 123',
      city: 'Bali',
      images: ['https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800'],
    },
    room: {
      id: 1,
      name: 'Master Suite with Ocean View',
      capacity: 2,
      price: 3500000,
    },
    checkIn: '2025-11-12',
    checkOut: '2025-11-14',
    nights: 2,
    guests: 2,
    totalPrice: 7000000,
    status: 'rejected',
    paymentProof: {
      id: 6,
      imageUrl: 'https://via.placeholder.com/800x600/EF4444/FFFFFF?text=Invalid+Payment',
      uploadedAt: '2025-10-27T09:00:00Z',
      accountName: 'Fitri H',
      bankName: 'BCA',
      amount: 5000000,
    },
    rejectionReason: 'Nominal pembayaran tidak sesuai. Total yang harus dibayar Rp 7.000.000, tapi transfer hanya Rp 5.000.000',
    createdAt: '2025-10-26T16:00:00Z',
    updatedAt: '2025-10-27T11:00:00Z',
  },
];

// Calculate booking stats
export const calculateBookingStats = (bookings: Booking[]): BookingStats => {
  return {
    total: bookings.length,
    pendingPayment: bookings.filter(b => b.status === 'pending_payment').length,
    waitingConfirmation: bookings.filter(b => b.status === 'waiting_confirmation').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled' || b.status === 'rejected').length,
  };
};

// Get booking stats
export const dummyBookingStats: BookingStats = calculateBookingStats(dummyTenantBookings);

// Filter bookings by status
export const filterBookingsByStatus = (bookings: Booking[], status?: string): Booking[] => {
  if (!status || status === 'all') return bookings;
  return bookings.filter(b => b.status === status);
};

// Get booking by ID
export const getBookingById = (id: number): Booking | undefined => {
  return dummyTenantBookings.find(b => b.id === id);
};

