# Setup Guide - Property Renting Frontend

Panduan lengkap untuk setup dan menjalankan aplikasi frontend.

## Prerequisites

Pastikan sudah terinstall:
- Node.js (versi 18 atau lebih tinggi)
- npm atau yarn
- Git
- **Backend API sudah berjalan** (lihat repository backend)

## Step-by-Step Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd finpro-feature2-fe
```

### 2. Install Dependencies

```bash
npm install
```

Ini akan menginstall semua dependencies yang diperlukan:
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- dan lainnya...

### 3. Setup Environment Variables

```bash
# Copy file env.example ke .env.local
cp env.example .env.local
```

Edit file `.env.local` dan sesuaikan dengan konfigurasi Anda:

```env
# URL Backend API (ganti dengan URL backend Anda)
NEXT_PUBLIC_API_URL="http://localhost:8000/api"

# URL Frontend App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Penting**: 
- `NEXT_PUBLIC_API_URL` harus sesuai dengan URL backend API Anda
- Jika backend berjalan di port lain, sesuaikan URL-nya

### 4. Jalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di: **http://localhost:3000**

### 5. Verifikasi Setup

Buka browser dan akses:
- Homepage: `http://localhost:3000`
- Login page: `http://localhost:3000/login`
- Register page: `http://localhost:3000/register`

Jika halaman terbuka tanpa error, setup berhasil! ✅

## Konfigurasi Backend

Pastikan backend API sudah:
1. ✅ Berjalan dan dapat diakses
2. ✅ CORS sudah dikonfigurasi untuk menerima request dari frontend
3. ✅ Database sudah setup dan migration sudah dijalankan

### Test Koneksi Backend

Coba akses endpoint backend melalui browser atau Postman:
```
http://localhost:8000/api/properties
```

Jika dapat response, koneksi backend OK!

## Environment Variables Explained

### NEXT_PUBLIC_API_URL
- URL base untuk semua request API ke backend
- Harus dimulai dengan `http://` atau `https://`
- Contoh development: `http://localhost:8000/api`
- Contoh production: `https://api.yourdomain.com/api`

### NEXT_PUBLIC_APP_URL
- URL frontend aplikasi
- Digunakan untuk redirect, sharing links, dll
- Contoh development: `http://localhost:3000`
- Contoh production: `https://yourdomain.com`

## Commands Tersedia

```bash
# Development mode (hot reload)
npm run dev

# Build untuk production
npm run build

# Jalankan production build
npm start

# Linting
npm run lint
```

## Project Structure

```
finpro-feature2-fe/
├── src/
│   ├── app/              # Next.js pages & routes
│   ├── components/       # Reusable components
│   └── lib/             # Utilities & helpers
├── public/              # Static assets
├── .env.local          # Environment variables (gitignored)
├── env.example         # Template environment variables
├── next.config.ts      # Next.js configuration
├── tailwind.config.js  # Tailwind CSS config
└── package.json        # Dependencies
```

## Troubleshooting

### Error: Cannot connect to backend

**Penyebab**: Backend tidak berjalan atau URL salah

**Solusi**:
1. Pastikan backend sudah running
2. Cek `NEXT_PUBLIC_API_URL` di `.env.local`
3. Test endpoint backend dengan browser/Postman

### Error: CORS policy blocking

**Penyebab**: Backend belum konfigurasi CORS

**Solusi**: 
Tambahkan CORS config di backend untuk allow origin dari `http://localhost:3000`

### Error: Module not found

**Penyebab**: Dependencies belum terinstall

**Solusi**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 sudah digunakan

**Solusi**: Gunakan port lain
```bash
PORT=3001 npm run dev
```

## Development Tips

### 1. Hot Reload
File akan otomatis reload saat ada perubahan. Tidak perlu restart server.

### 2. TypeScript Errors
Jika ada TypeScript error, cek di terminal atau browser console.

### 3. Styling dengan Tailwind
Gunakan Tailwind CSS classes. Autocomplete akan muncul di VSCode jika install extension.

### 4. Form Validation
Validation sudah setup dengan Zod. Lihat `src/lib/validation.ts` untuk schema.

### 5. API Calls
Gunakan `src/lib/api.ts` untuk semua API requests:
```typescript
import { api } from '@/lib/api';
const data = await api.get('/properties');
```

## Next Steps

1. ✅ Setup selesai? Coba fitur login/register
2. ✅ Test pencarian properti
3. ✅ Test booking flow
4. ✅ Mulai development fitur baru!

## Deployment

### Deploy ke Vercel (Recommended)

1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Set environment variables di Vercel dashboard
4. Deploy!

### Deploy Manual

```bash
npm run build
npm start
```

## Support

Jika ada masalah:
1. Cek dokumentasi di README.md
2. Cek backend logs
3. Cek browser console untuk errors
4. Contact team lead

Happy coding! 🚀

