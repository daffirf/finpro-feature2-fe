# TODO: Update Components untuk API Integration

File-file berikut masih menggunakan `fetch('/api/...)` dan perlu diupdate untuk menggunakan API client baru dari `@/lib/api.ts`.

## ✅ Sudah Diupdate

- [x] `src/app/login/page.tsx`
- [x] `src/app/register/page.tsx`
- [x] `src/components/Header.tsx`

## ❌ Masih Perlu Diupdate

### High Priority (Core Features)

1. **src/components/BookingForm.tsx** (Line 86)
   ```typescript
   // Sebelum:
   const response = await fetch('/api/bookings', {...})
   
   // Update menjadi:
   import { api, getAuthToken } from '@/lib/api'
   const token = getAuthToken()
   const result = await api.post('/bookings', data, token)
   ```

2. **src/components/PaymentForm.tsx** (Line 56)
   ```typescript
   // Sebelum:
   const response = await fetch('/api/bookings/payment-proof', {...})
   
   // Update menjadi:
   import { api, getAuthToken } from '@/lib/api'
   const token = getAuthToken()
   const result = await api.upload('/bookings/payment-proof', formData, token)
   ```

3. **src/components/ReviewForm.tsx** (Line 43)
   ```typescript
   // Sebelum:
   const response = await fetch('/api/reviews', {...})
   
   // Update menjadi:
   import { api, getAuthToken } from '@/lib/api'
   const token = getAuthToken()
   const result = await api.post('/reviews', data, token)
   ```

### Medium Priority (Tenant Features)

4. **src/components/PropertyForm.tsx** (Line 51)
   ```typescript
   // Sebelum:
   const response = await fetch('/api/tenant/properties', {...})
   
   // Update menjadi:
   import { api, getAuthToken } from '@/lib/api'
   const token = getAuthToken()
   const result = await api.post('/tenant/properties', data, token)
   ```

5. **src/components/PropertyManagement.tsx** (Line 32)
   ```typescript
   // Sebelum:
   const response = await fetch('/api/tenant/properties')
   
   // Update menjadi:
   import { api, getAuthToken } from '@/lib/api'
   const token = getAuthToken()
   const properties = await api.get('/tenant/properties', token)
   ```

6. **src/components/RoomForm.tsx** (Line 41)
   ```typescript
   // Sebelum:
   const response = await fetch('/api/tenant/rooms', {...})
   
   // Update menjadi:
   import { api, getAuthToken } from '@/lib/api'
   const token = getAuthToken()
   const result = await api.post('/tenant/rooms', data, token)
   ```

7. **src/components/PriceRuleForm.tsx** (Line 51)
   ```typescript
   // Sebelum:
   const response = await fetch('/api/tenant/price-rules', {...})
   
   // Update menjadi:
   import { api, getAuthToken } from '@/lib/api'
   const token = getAuthToken()
   const result = await api.post('/tenant/price-rules', data, token)
   ```

8. **src/components/TenantDashboard.tsx** (Line 28)
   ```typescript
   // Sebelum:
   const response = await fetch('/api/tenant/dashboard')
   
   // Update menjadi:
   import { api, getAuthToken } from '@/lib/api'
   const token = getAuthToken()
   const stats = await api.get('/tenant/dashboard', token)
   ```

9. **src/app/tenant/page.tsx** (Line 21)
   ```typescript
   // Sebelum:
   fetch('/api/auth/me', {...})
   
   // Update menjadi:
   import { api, getAuthToken } from '@/lib/api'
   const token = getAuthToken()
   const user = await api.get('/auth/me', token)
   ```

## Pattern untuk Update

### GET Request
```typescript
// Import
import { api, getAuthToken } from '@/lib/api'

// Usage
const token = getAuthToken()
const data = await api.get('/endpoint', token)
```

### POST Request
```typescript
// Import
import { api, getAuthToken } from '@/lib/api'

// Usage
const token = getAuthToken()
const result = await api.post('/endpoint', { ...data }, token)
```

### File Upload
```typescript
// Import
import { api, getAuthToken } from '@/lib/api'

// Usage
const formData = new FormData()
formData.append('file', file)

const token = getAuthToken()
const result = await api.upload('/endpoint', formData, token)
```

### Error Handling
```typescript
try {
  const result = await api.post('/endpoint', data, token)
  // Handle success
} catch (error: any) {
  // error.message akan berisi pesan error dari backend
  setError(error.message || 'Terjadi kesalahan')
}
```

## Catatan Penting

1. **Token Management**: 
   - Token disimpan di localStorage menggunakan `setAuthToken(token)`
   - Token diambil menggunakan `getAuthToken()`
   - Token dihapus menggunakan `removeAuthToken()`

2. **Error Handling**:
   - API client akan throw error jika response tidak ok
   - Catch error dan tampilkan `error.message` ke user

3. **Response Format**:
   - Tidak perlu cek `response.ok` lagi
   - Tidak perlu `await response.json()` lagi
   - API client sudah handle semuanya

4. **TypeScript**:
   - Bisa tambahkan type untuk response: `api.get<Type>('/endpoint')`

## Testing Checklist

Setelah update, pastikan test:
- [ ] Login/Logout flow
- [ ] Registration
- [ ] Booking creation
- [ ] Payment proof upload
- [ ] Review submission
- [ ] Tenant dashboard
- [ ] Property management
- [ ] Room management
- [ ] Price rule management

## Next Steps

1. Update component satu per satu sesuai priority
2. Test setiap component setelah update
3. Update dokumentasi jika ada perubahan API endpoint
4. Pastikan backend API sudah ready dengan endpoint yang sesuai

