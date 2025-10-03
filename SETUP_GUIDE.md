# 🏠 Property Renting Web App - Setup Guide

Selamat! Aplikasi Property Renting Web App telah berhasil dibuat dengan semua fitur yang diminta. Berikut adalah panduan lengkap untuk setup dan menjalankan aplikasi.

## ✅ Fitur yang Sudah Diimplementasi

### 🔐 Sistem Autentikasi
- ✅ Register untuk User dan Tenant
- ✅ Login/Logout dengan JWT
- ✅ Role-based access control
- ✅ Middleware untuk protected routes

### 👤 Fitur User (Penyewa)
- ✅ Landing page dengan form pencarian
- ✅ Pencarian properti berdasarkan destinasi, tanggal, dan jumlah tamu
- ✅ Filter dan sorting (harga, rating, nama)
- ✅ Halaman detail properti dengan kalender harga
- ✅ Perbandingan harga pada tanggal berbeda
- ✅ Sistem booking dengan validasi ketersediaan
- ✅ Upload bukti pembayaran (JPG/PNG, max 1MB)
- ✅ Riwayat pemesanan
- ✅ Review dan rating setelah check-out

### 🏢 Fitur Tenant (Pemilik)
- ✅ Dashboard tenant dengan statistik
- ✅ Manajemen properti (CRUD)
- ✅ Manajemen kamar untuk setiap properti
- ✅ Atur harga dinamis berdasarkan tanggal
- ✅ Konfirmasi/tolak pembayaran manual
- ✅ Laporan penjualan dan analisis
- ✅ Response terhadap review user
- ✅ Kelola ketersediaan properti

### 💰 Sistem Harga Dinamis
- ✅ Harga base untuk setiap properti/kamar
- ✅ Price rules berdasarkan tanggal (persentase atau fixed)
- ✅ Kalender harga real-time
- ✅ Automatic pricing calculation

### 📱 UI/UX Features
- ✅ Mobile-first responsive design
- ✅ Modern UI dengan Tailwind CSS
- ✅ Loading states dan error handling
- ✅ Toast notifications
- ✅ Modal components
- ✅ Image gallery dengan navigation

## 🚀 Cara Setup Aplikasi

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
Buat file `.env.local` di root project:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/property_rent"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-here-change-this-in-production"

# Email Configuration (optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Setup Database dengan Prisma
```bash
# Generate Prisma client
npx prisma generate

# Push schema ke database (untuk development)
npx prisma db push

# Atau buat dan jalankan migration (untuk production)
npx prisma migrate dev --name init
```

### 4. Jalankan Aplikasi
```bash
npm run dev
```

Aplikasi akan berjalan di: http://localhost:3000

## 📂 Struktur Project

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── properties/    # Property management
│   │   ├── bookings/      # Booking system
│   │   ├── reviews/       # Review system
│   │   ├── tenant/        # Tenant management
│   │   └── user/          # User endpoints
│   ├── booking/           # Booking pages
│   ├── property/          # Property detail pages
│   ├── search/            # Search results page
│   ├── tenant/            # Tenant dashboard
│   ├── user/              # User pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── forms/             # Form components
│   ├── ui/                # UI components
│   └── ...
├── lib/                   # Utility libraries
│   ├── auth.ts            # Authentication utilities
│   ├── prisma.ts          # Database client
│   ├── validation.ts      # Validation schemas
│   └── utils.ts           # Helper functions
└── generated/prisma/      # Generated Prisma client
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user/tenant
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Properties
- `GET /api/properties/search` - Search properties
- `GET /api/properties/[id]` - Get property detail
- `GET /api/properties/[id]/prices` - Get dynamic prices

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/[id]` - Get booking detail
- `POST /api/bookings/payment-proof` - Upload payment proof

### Tenant Management
- `GET /api/tenant/dashboard` - Dashboard stats
- `GET /api/tenant/properties` - Get tenant properties
- `POST /api/tenant/properties` - Add property
- `GET /api/tenant/bookings` - Get bookings
- `POST /api/tenant/bookings/[id]/confirm` - Confirm payment
- `GET /api/tenant/reports` - Sales reports

## 🎯 Status Booking

1. **PENDING_PAYMENT** - Menunggu pembayaran (max 2 jam)
2. **PAYMENT_CONFIRMED** - Bukti pembayaran uploaded
3. **CONFIRMED** - Dikonfirmasi oleh tenant
4. **CANCELLED** - Dibatalkan
5. **COMPLETED** - Selesai (bisa review)

## 💡 Cara Menggunakan Aplikasi

### Sebagai User (Penyewa):
1. Buka halaman utama
2. Isi form pencarian (kota, tanggal, jumlah tamu)
3. Browse hasil pencarian dengan filter
4. Pilih properti dan lihat detail + kalender harga
5. Pilih kamar dan buat booking
6. Upload bukti pembayaran
7. Tunggu konfirmasi dari tenant
8. Berikan review setelah check-out

### Sebagai Tenant (Pemilik):
1. Register sebagai Tenant
2. Login ke dashboard tenant
3. Tambah properti dan kamar
4. Atur price rules untuk tanggal khusus
5. Kelola booking dari user
6. Konfirmasi/tolak pembayaran
7. Lihat laporan penjualan
8. Response review dari user

## 🛠️ Customization

### Menambah Amenities Baru
Edit file `src/components/PropertyForm.tsx` dan `src/components/SearchFilters.tsx`

### Mengubah Validation Rules
Edit file `src/lib/validation.ts`

### Menambah Payment Gateway
Implementasi di `src/components/PaymentForm.tsx`

### Email Notifications
Setup SMTP di `.env.local` dan implementasi di API routes

## 📱 Testing

### Test User Flow:
1. Register sebagai USER
2. Search properti
3. Buat booking
4. Upload bukti bayar

### Test Tenant Flow:
1. Register sebagai TENANT
2. Login ke dashboard
3. Tambah properti dan kamar
4. Atur price rules
5. Konfirmasi booking user

## 🔒 Security Features

- ✅ JWT Authentication
- ✅ Role-based access control
- ✅ Input validation (client & server)
- ✅ File upload validation
- ✅ SQL injection protection (Prisma)
- ✅ XSS protection

## 📈 Performance Features

- ✅ Server-side pagination
- ✅ Image optimization
- ✅ Database indexing
- ✅ Efficient queries dengan Prisma
- ✅ Client-side caching

## 🎨 UI/UX Features

- ✅ Responsive design (mobile-first)
- ✅ Loading states
- ✅ Error handling
- ✅ Toast notifications
- ✅ Modern design dengan Tailwind
- ✅ Accessibility considerations

Aplikasi sudah siap digunakan! 🎉
