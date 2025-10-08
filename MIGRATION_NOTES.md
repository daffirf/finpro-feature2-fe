# Migration Notes: Backend Removal

Dokumen ini mencatat semua perubahan yang dilakukan untuk memisahkan frontend dari backend.

## 📅 Tanggal Migrasi
October 8, 2025

## 🎯 Tujuan
Memisahkan frontend dari fullstack Next.js app menjadi frontend-only yang terhubung ke backend terpisah.

## ✅ Yang Sudah Dihapus

### 1. Folder Backend
- ❌ `src/app/api/` - Semua API routes
- ❌ `prisma/` - Database schema
- ❌ `src/generated/` - Prisma client generated files
- ❌ `uploads/` - File upload directory

### 2. File Backend Utilities
- ❌ `src/lib/prisma.ts` - Database connection
- ❌ `src/lib/auth.ts` - Authentication logic
- ❌ `src/middleware.ts` - Auth middleware

### 3. Dependencies yang Dihapus

**Production Dependencies:**
- `@prisma/client` - ORM database
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `multer` - File upload
- `next-auth` - NextAuth.js
- `nodemailer` - Email service

**Dev Dependencies:**
- `prisma` - Prisma CLI
- `@types/bcryptjs`
- `@types/formidable`
- `@types/jsonwebtoken`
- `@types/multer`
- `@types/nodemailer`
- `supertest` - API testing
- `jest` - Testing framework
- `ts-jest` - Jest TypeScript
- `ts-node` - TypeScript execution

**Total: 466 packages dihapus** ✨

## 🆕 Yang Ditambahkan

### 1. API Client
- ✅ `src/lib/api.ts` - Client untuk berkomunikasi dengan backend API

### 2. Configuration Files
- ✅ `env.example` - Template environment variables untuk frontend
- ✅ `.env.local` - Environment variables (local)

### 3. Documentation
- ✅ `README.md` - Updated untuk frontend-only
- ✅ `SETUP_GUIDE.md` - Updated setup guide
- ✅ `MIGRATION_NOTES.md` - Dokumentasi migrasi ini

## 🔄 Yang Diubah

### 1. package.json
```diff
- "name": "property-rent"
+ "name": "property-rent-frontend"

- Removed 16 backend dependencies
+ Kept only frontend dependencies
```

### 2. next.config.ts
```diff
- serverExternalPackages: ['@prisma/client']
- webpack externals configuration
+ Simplified config untuk frontend only
```

### 3. .gitignore
```diff
- /src/generated/prisma
+ (dihapus karena tidak relevan)
```

## 📝 Dependencies yang Dipertahankan

**Framework & Core:**
- `next` 15.5.3
- `react` 19.1.0
- `react-dom` 19.1.0
- `typescript` ^5

**Styling:**
- `tailwindcss` ^4
- `autoprefixer` ^10.4.21
- `class-variance-authority` ^0.7.1
- `clsx` ^2.1.1
- `tailwind-merge` ^2.6.0

**Forms & Validation:**
- `react-hook-form` ^7.53.2
- `@hookform/resolvers` ^3.9.0
- `zod` ^3.23.8

**UI & Utils:**
- `lucide-react` ^0.468.0
- `date-fns` ^4.1.0
- `react-datepicker` ^7.3.0

## 🔌 Integrasi dengan Backend

### API Client Usage
```typescript
import { api, getAuthToken } from '@/lib/api';

// GET request
const data = await api.get('/properties');

// POST with auth
const token = getAuthToken();
const result = await api.post('/bookings', body, token);

// Upload file
const formData = new FormData();
const upload = await api.upload('/upload', formData, token);
```

### Environment Variables
```env
NEXT_PUBLIC_API_URL="http://localhost:8000/api"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## ⚠️ Breaking Changes

### 1. Authentication
**Sebelum:**
```typescript
// Auth di middleware.ts dan API routes
```

**Sekarang:**
```typescript
// Auth token disimpan di localStorage
// Dikirim via Authorization header ke backend
```

### 2. Database Access
**Sebelum:**
```typescript
import { prisma } from '@/lib/prisma';
const users = await prisma.user.findMany();
```

**Sekarang:**
```typescript
import { api } from '@/lib/api';
const users = await api.get('/users');
```

### 3. File Upload
**Sebelum:**
```typescript
// Multer di API routes
```

**Sekarang:**
```typescript
// FormData ke backend API
await api.upload('/upload', formData, token);
```

## 📋 Checklist untuk Development

Sebelum mulai development, pastikan:

- [ ] Backend API sudah running
- [ ] `.env.local` sudah diset dengan URL backend yang benar
- [ ] CORS di backend sudah allow origin frontend
- [ ] Test koneksi API (`http://localhost:8000/api`)
- [ ] Dependencies sudah terinstall (`npm install`)

## 🚀 Cara Menjalankan

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp env.example .env.local
# Edit .env.local dengan URL backend Anda

# 3. Jalankan dev server
npm run dev
```

## 📊 Perbandingan

| Aspek | Sebelum | Setelah |
|-------|---------|---------|
| Total Packages | 889 | 423 |
| Package Dihapus | - | 466 |
| Node Modules Size | ~500 MB | ~200 MB |
| Build Time | ~60s | ~30s |
| Type | Fullstack | Frontend Only |

## 🎉 Benefits

1. **Lebih Ringan**: 466 packages berkurang (~300 MB saved)
2. **Lebih Cepat**: Build time lebih cepat
3. **Separation of Concerns**: Frontend dan backend terpisah
4. **Scalability**: Mudah deploy frontend dan backend secara independen
5. **Team Collaboration**: Frontend dan backend team bisa work independently

## 📚 Next Steps

1. Update komponen yang masih menggunakan API routes lama
2. Test semua fitur untuk memastikan integrasi backend berjalan
3. Setup CI/CD untuk deployment
4. Update testing strategy

## 🆘 Troubleshooting

### Jika ada error "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Jika ada TypeScript errors
```bash
npm run build
```

### Jika API calls gagal
1. Cek backend running
2. Cek NEXT_PUBLIC_API_URL di .env.local
3. Cek CORS configuration di backend
4. Check network tab di browser DevTools

---

**Catatan**: Semua perubahan sudah di-commit. Jika perlu rollback, check git history.

