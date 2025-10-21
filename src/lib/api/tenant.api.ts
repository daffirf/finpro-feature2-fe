import { api } from '../api';

/**
 * Property Management API
 */

export interface CreatePropertyPayload {
  name: string;
  slug?: string;
  description?: string;
  city?: string;
  province?: string;
  address?: string;
  category: 'villa' | 'hotel' | 'apartment' | 'guest_house';
  imageUrls?: string[];
  facilities?: string[];
}

export interface UpdatePropertyPayload extends Partial<CreatePropertyPayload> {
  published?: boolean;
}

export interface PropertyResponse {
  id: number;
  name: string;
  description: string;
  city: string;
  address: string;
  category: string;
  imageUrls: string[];
  facilities: string[];
  published: boolean;
  tenantId: number;
  totalRooms: number;
  activeRooms: number;
  createdAt: string;
  updatedAt: string;
}

export const getMyProperties = async () => {
  return await api.get('/properties/my-properties');
};

export const getPropertyById = async (propertyId: number) => {
  return await api.get(`/properties/${propertyId}`);
};

export const createProperty = async (data: CreatePropertyPayload) => {
  const slug = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') +
    '-' + Math.random().toString(36).substr(2, 9);
    
  return await api.post('/properties', { ...data, slug });
};

export const updateProperty = async (propertyId: number, data: UpdatePropertyPayload) => {
  return await api.patch(`/properties/${propertyId}`, data);
};

export const deleteProperty = async (propertyId: number) => {
  return await api.delete(`/properties/${propertyId}`);
};

/**
 * Room Management API
 */

export interface CreateRoomPayload {
  propertyId: number;
  name: string;
  description: string;
  basePrice: number;
  capacity: number;
  totalUnits: number;
  imageUrls?: string[];
  facilities?: string[];
}

export interface UpdateRoomPayload extends Partial<Omit<CreateRoomPayload, 'propertyId'>> {}

export interface RoomResponse {
  id: number;
  propertyId: number;
  propertyName: string;
  name: string;
  description: string;
  basePrice: number;
  capacity: number;
  totalUnits: number;
  availableUnits: number;
  imageUrls: string[];
  facilities: string[];
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export const getMyRooms = async () => {
  return await api.get('/tenant/rooms');
};

export const getRoomsByProperty = async (propertyId: number) => {
  return await api.get(`/tenant/properties/${propertyId}/rooms`);
};

export const createRoom = async (data: CreateRoomPayload) => {
  return await api.post('/tenant/rooms', data);
};

export const updateRoom = async (roomId: number, data: UpdateRoomPayload) => {
  return await api.patch(`/tenant/rooms/${roomId}`, data);
};

export const deleteRoom = async (roomId: number) => {
  return await api.delete(`/tenant/rooms/${roomId}`);
};

/**
 * Peak Season & Price Rules API
 */

export interface CreatePeakSeasonPayload {
  name: string;
  startDate: string;
  endDate: string;
  priceMultiplier: number;
  propertyId?: number;
  description?: string;
}

export interface UpdatePeakSeasonPayload extends Partial<CreatePeakSeasonPayload> {
  status?: 'active' | 'inactive';
}

export interface PeakSeasonResponse {
  id: number;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  priceMultiplier: number;
  status: 'active' | 'inactive';
  propertyId?: number;
  propertyName?: string;
  tenantId: number;
  createdAt: string;
  updatedAt: string;
}

export const getPeakSeasons = async () => {
  return await api.get('/tenant/price-rules');
};

export const getPeakSeasonById = async (priceRuleId: number) => {
  return await api.get(`/tenant/price-rules/${priceRuleId}`);
};

export const createPeakSeason = async (data: CreatePeakSeasonPayload) => {
  return await api.post('/tenant/price-rules', data);
};

export const updatePeakSeason = async (priceRuleId: number, data: UpdatePeakSeasonPayload) => {
  return await api.patch(`/tenant/price-rules/${priceRuleId}`, data);
};

export const deletePeakSeason = async (priceRuleId: number) => {
  return await api.delete(`/tenant/price-rules/${priceRuleId}`);
};

/**
 * Analytics & Reports API
 */

export interface TenantStats {
  totalProperties: number;
  totalRooms: number;
  activeRooms: number;
  totalBookings: number;
  totalRevenue: number;
  occupancyRate: number;
  totalGuests: number;
}

export const getTenantStats = async () => {
  return await api.get('/tenant/reports');
};

export const getSalesReport = async (startDate?: string, endDate?: string) => {
  const params = new URLSearchParams();
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  
  return await api.get(`/tenant/reports?${params.toString()}`);
};

/**
 * Calendar API
 */

export interface CalendarEvent {
  id: number;
  date: string;
  roomId: number;
  roomName: string;
  guestName: string;
  bookingId: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  checkIn: string;
  checkOut: string;
}

export const getPropertyCalendar = async (propertyId: number, month?: string) => {
  const params = month ? `?month=${month}` : '';
  return await api.get(`/tenant/properties/${propertyId}/calendar${params}`);
};

export const getAllPropertiesCalendar = async (month?: string) => {
  const params = month ? `?month=${month}` : '';
  return await api.get(`/tenant/properties/calendar${params}`);
};

/**
 * Booking Management API
 */

export interface BookingResponse {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  propertyName: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  totalGuests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentProofUrl?: string;
  createdAt: string;
}

export const getTenantBookings = async (status?: string) => {
  const params = status ? `?status=${status}` : '';
  return await api.get(`/tenant/bookings${params}`);
};

export const confirmBooking = async (bookingId: number) => {
  return await api.post(`/tenant/bookings/${bookingId}/confirm`);
};

export const rejectBooking = async (bookingId: number, reason?: string) => {
  return await api.post(`/tenant/bookings/${bookingId}/reject`, { reason });
};

export const cancelUserBooking = async (bookingId: number) => {
  return await api.post(`/tenant/bookings/${bookingId}/cancel`);
};

