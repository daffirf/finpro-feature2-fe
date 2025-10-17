import { z } from 'zod'

// Auth schemas
export const registerSchema = z.object({
  name: z.string()
    .min(2, 'Nama minimal 2 karakter')
    .max(50, 'Nama maksimal 50 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  phone: z.string().optional(),
  role: z.enum(['USER', 'TENANT']).default('USER')
})

export const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Email tidak valid'),
})

export const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Password minimal 6 karakter'),
  confirmPassword: z.string().min(6, 'Konfirmasi password minimal 6 karakter'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password tidak cocok',
  path: ['confirmPassword'],
})

// User profile schemas
export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  phone: z.string().optional().or(z.literal('')),
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, 'Password saat ini minimal 6 karakter'),
  newPassword: z.string().min(6, 'Password baru minimal 6 karakter'),
  confirmPassword: z.string().min(6, 'Konfirmasi password minimal 6 karakter'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Password baru tidak cocok',
  path: ['confirmPassword'],
}).refine((data) => data.currentPassword !== data.newPassword, {
  message: 'Password baru harus berbeda dari password saat ini',
  path: ['newPassword'],
})

// Booking schema
export const bookingSchema = z.object({
  propertyId: z.string(),
  roomId: z.string(),
  checkIn: z.string(),
  checkOut: z.string(),
  guests: z.number().min(1, 'Minimal 1 tamu'),
})

// Property schema
export const propertySchema = z.object({
  name: z.string().min(3, 'Nama properti minimal 3 karakter'),
  description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
  address: z.string().min(5, 'Alamat minimal 5 karakter'),
  city: z.string().min(2, 'Kota minimal 2 karakter'),
  category: z.string(),
  facilities: z.array(z.string()).optional(),
})

// Room schema
export const roomSchema = z.object({
  name: z.string().min(3, 'Nama ruangan minimal 3 karakter'),
  capacity: z.number().min(1, 'Kapasitas minimal 1 orang'),
  basePrice: z.number().min(0, 'Harga tidak boleh negatif'),
})

// Search schema
export const searchSchema = z.object({
  location: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  guests: z.number().optional(),
  category: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
})

// Review schema
export const reviewSchema = z.object({
  rating: z.number().min(1, 'Rating minimal 1').max(5, 'Rating maksimal 5'),
  comment: z.string().min(10, 'Komentar minimal 10 karakter').optional(),
})

// Price rule schema
export const priceRuleSchema = z.object({
  roomId: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  adjustmentType: z.enum(['PERCENTAGE', 'FIXED']),
  adjustmentValue: z.number(),
})

// File validation function
export const validateFile = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
  
  if (file.size > maxSize) {
    return { valid: false, error: 'Ukuran file maksimal 5MB' };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Tipe file harus JPG, PNG, GIF, atau PDF' };
  }
  
  return { valid: true };
}
