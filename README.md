# Property Renting Web App - Frontend

Aplikasi frontend untuk sistem penyewaan properti menggunakan Next.js 15 dengan React 19.

## Fitur Frontend

### Untuk User (Penyewa)
- ✅ Pencarian properti berdasarkan destinasi, tanggal, dan jumlah tamu
- ✅ Filter dan sorting properti (harga, rating, nama)
- ✅ Perbandingan harga pada tanggal yang berbeda
- ✅ Kalender harga dinamis
- ✅ Form booking dengan upload bukti pembayaran
- ✅ Halaman riwayat pemesanan
- ✅ Form review dan rating properti

### Untuk Tenant (Pemilik)
- ✅ Dashboard manajemen properti
- ✅ Form kelola ketersediaan kamar
- ✅ Form atur harga dinamis berdasarkan tanggal
- ✅ Halaman konfirmasi pembayaran
- ✅ Laporan penjualan dan analisis

## Teknologi yang Digunakan

- **Framework**: Next.js 15
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod Validation
- **Date Handling**: date-fns, react-datepicker
- **Utilities**: clsx, class-variance-authority, tailwind-merge

## Setup Development

### 1. Clone Repository
```bash
git clone <repository-url>
cd finpro-feature2-fe
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
# Copy environment file
cp env.example .env.local

# Edit .env.local dengan konfigurasi backend API Anda
# NEXT_PUBLIC_API_URL="http://localhost:8000/api"
# NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Run Development Server
```bash
npm run dev
```

Aplikasi akan berjalan di http://localhost:3000

## Struktur Folder

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── login/             # Halaman login
│   ├── register/          # Halaman registrasi
│   ├── search/            # Halaman pencarian properti
│   ├── property/[id]/     # Detail properti
│   ├── booking/[id]/      # Detail & konfirmasi booking
│   ├── user/              # Dashboard user
│   └── tenant/            # Dashboard tenant
├── components/            # Reusable React components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Modal.tsx
│   ├── PropertyCard.tsx
│   ├── BookingForm.tsx
│   ├── SearchFilters.tsx
│   └── ...
└── lib/                   # Utility functions
    ├── api.ts            # API client untuk backend
    ├── utils.ts          # Helper functions
    └── validation.ts     # Zod schemas

```

## API Integration

Frontend ini berkomunikasi dengan backend melalui REST API. Semua request API ditangani oleh `src/lib/api.ts`.

### Contoh Penggunaan API Client

```typescript
import { api, getAuthToken } from '@/lib/api';

// GET request
const properties = await api.get('/properties/search?city=Jakarta');

// POST request dengan authentication
const token = getAuthToken();
const booking = await api.post('/bookings', {
  propertyId: '123',
  checkIn: '2024-01-01',
  checkOut: '2024-01-05'
}, token);

// Upload file
const formData = new FormData();
formData.append('file', file);
const result = await api.upload('/bookings/payment-proof', formData, token);
```

## Environment Variables

Buat file `.env.local` dengan isi:

```env
# Backend API URL
NEXT_PUBLIC_API_URL="http://localhost:8000/api"

# Frontend App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Build untuk Production

```bash
# Build aplikasi
npm run build

# Jalankan production build
npm start
```

## Deployment

### Vercel (Recommended)
1. Push code ke GitHub
2. Import project di Vercel
3. Set environment variables
4. Deploy

### Deployment Manual
```bash
npm run build
npm start
```

## Fitur Khusus Frontend

### Responsive Design
- Mobile-first approach
- Optimized untuk semua device (mobile, tablet, desktop)
- Touch-friendly interface

### Form Validation
- Client-side validation menggunakan Zod
- Real-time error feedback
- User-friendly error messages

### Image Optimization
- Next.js Image component untuk lazy loading
- Support remote images dari backend

### State Management
- React hooks untuk local state
- LocalStorage untuk authentication token

## Development Tips

### Adding New Pages
```bash
# Buat file baru di src/app/
src/app/new-page/page.tsx
```

### Adding New Components
```bash
# Buat file baru di src/components/
src/components/NewComponent.tsx
```

### Testing API Endpoints
Gunakan browser DevTools Network tab untuk melihat request/response API.

## Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## Troubleshooting

### Error: Cannot connect to backend
- Pastikan backend sudah berjalan
- Cek `NEXT_PUBLIC_API_URL` di `.env.local`
- Cek CORS configuration di backend

### Error: Image not loading
- Pastikan URL gambar benar
- Cek `next.config.ts` untuk image domains

## Lisensi

Distributed under the MIT License.

## Kontak

- Email: your-email@example.com
- Project Link: [https://github.com/your-username/finpro-feature2-fe](https://github.com/your-username/finpro-feature2-fe)

