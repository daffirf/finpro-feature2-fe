# 📸 Fitur Upload Avatar

Fitur untuk mengupload dan mengganti foto profil user dengan drag & drop support.

## ✨ Fitur Utama

### 1. **Upload Avatar**
- Upload foto profil dari file lokal
- Drag & drop support untuk kemudahan
- Preview instant sebelum upload
- Validasi format dan ukuran file

### 2. **Format File Support**
- ✅ JPG / JPEG
- ✅ PNG
- ✅ GIF
- ✅ WebP
- ❌ Max size: **5MB**

### 3. **User Experience**
- Hover effect untuk menampilkan camera icon
- Loading indicator saat upload
- Error handling dengan pesan yang jelas
- Remove avatar button (X) di pojok kanan atas
- Preview foto real-time

### 4. **Responsive Design**
- 4 ukuran avatar: sm, md, lg, xl
- Mobile-friendly
- Touch support untuk mobile devices

## 🎯 Lokasi Implementasi

### 1. **User Profile Page** (`/user`)
- Avatar upload di sidebar profile card
- Size: `xl` (32x32 / 128px)
- Editable dengan remove option

### 2. **Header Component**
- Avatar display di top navigation
- Size: `w-10 h-10` (40px)
- Fallback ke initial jika tidak ada foto

## 📁 File Structure

```
src/
├── components/
│   ├── AvatarUpload.tsx          # Main component
│   └── Header.tsx                # Updated dengan avatar display
├── hooks/
│   └── user/
│       └── useUserProfile.ts     # Added uploadAvatar & removeAvatar
├── types/
│   └── user.ts                   # Added avatarUrl field
└── app/
    └── user/
        └── page.tsx              # Integrated AvatarUpload
```

## 🔧 Cara Penggunaan

### Basic Implementation

```tsx
import AvatarUpload from '@/components/AvatarUpload'
import { useUserProfile } from '@/hooks/user'

function ProfilePage() {
  const { profile, uploadAvatar, removeAvatar, isUpdating } = useUserProfile()

  return (
    <AvatarUpload
      currentAvatarUrl={profile?.avatarUrl}
      userName={profile?.name || 'User'}
      onUpload={uploadAvatar}
      onRemove={removeAvatar}
      isUploading={isUpdating}
      size="xl"
      editable={true}
    />
  )
}
```

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `currentAvatarUrl` | `string \| null` | ❌ | - | URL foto avatar saat ini |
| `userName` | `string` | ✅ | - | Nama user untuk initial fallback |
| `onUpload` | `(file: File) => Promise<void>` | ✅ | - | Callback saat upload |
| `onRemove` | `() => Promise<void>` | ❌ | - | Callback saat remove (optional) |
| `isUploading` | `boolean` | ❌ | `false` | Status loading |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | ❌ | `'lg'` | Ukuran avatar |
| `editable` | `boolean` | ❌ | `true` | Apakah bisa diedit |

## 🎨 Size Variants

```tsx
// Small - 16x16 (64px)
<AvatarUpload size="sm" {...props} />

// Medium - 20x20 (80px)
<AvatarUpload size="md" {...props} />

// Large - 24x24 (96px)
<AvatarUpload size="lg" {...props} />

// Extra Large - 32x32 (128px)
<AvatarUpload size="xl" {...props} />
```

## 🔌 API Integration

### Upload Avatar Endpoint

```typescript
POST /auth/avatar
Headers: Authorization: Bearer {token}
Body: FormData with 'avatar' field
Response: UserProfile with updated avatarUrl
```

### Remove Avatar Endpoint

```typescript
DELETE /auth/avatar
Headers: Authorization: Bearer {token}
Response: UserProfile with avatarUrl = null
```

## 🎭 User Flow

### Upload Flow
1. User hover avatar → camera icon muncul
2. User klik avatar atau drag & drop file
3. File divalidasi (format & size)
4. Preview ditampilkan instant
5. File diupload ke server
6. Avatar updated di UI
7. localStorage & header diupdate otomatis

### Remove Flow
1. User klik tombol X (merah) di pojok kanan atas
2. Konfirmasi delete
3. Avatar dihapus dari server
4. Fallback ke initial
5. localStorage & header diupdate otomatis

## ✅ Validasi

### File Type Validation
```typescript
const validTypes = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/gif',
  'image/webp'
]
```

### File Size Validation
```typescript
const maxSize = 5 * 1024 * 1024 // 5MB
```

## 🎨 Styling

### Teal Theme Consistency
- Border: `border-teal-100`
- Background gradient: `from-teal-500 to-teal-600`
- Hover: `border-teal-500`
- Button: `border-teal-300 text-teal-700 hover:bg-teal-50`

### Animations
- Hover scale: `hover:scale-105`
- Drag over: `border-teal-500 scale-105`
- Loading: `animate-spin` (Loader2 icon)
- Smooth transitions: `transition-all duration-200`

## 🚨 Error Handling

### Client-Side Errors
- ❌ Format tidak didukung → "Format file tidak didukung. Gunakan JPG, PNG, GIF, atau WebP."
- ❌ File terlalu besar → "Ukuran file terlalu besar. Maksimal 5MB."

### Server-Side Errors
- ❌ Upload gagal → Error message dari server
- ❌ Unauthorized → Redirect ke login
- ❌ Network error → "Gagal mengupload foto"

## 🔄 Auto-Update

Setelah upload/remove berhasil:
1. ✅ Profile state di-update
2. ✅ localStorage di-update
3. ✅ Header component di-update (via `authChange` event)
4. ✅ Semua component yang menampilkan user data terupdate otomatis

## 📱 Mobile Support

### Touch Events
- ✅ Touch-friendly button size (min 44x44px)
- ✅ File picker modal di mobile
- ✅ Responsive sizing

### Drag & Drop
- ✅ Works di desktop
- ⚠️ Fallback ke file picker di mobile

## 🧪 Testing Checklist

- [ ] Upload JPG file < 5MB ✅
- [ ] Upload PNG file < 5MB ✅
- [ ] Upload file > 5MB (should show error) ❌
- [ ] Upload .pdf file (should show error) ❌
- [ ] Drag & drop file ✅
- [ ] Remove avatar ✅
- [ ] Check header updates after upload ✅
- [ ] Check localStorage updates ✅
- [ ] Mobile upload flow ✅
- [ ] Error handling ✅

## 🎯 Next Improvements

1. **Image Cropper**
   - Crop & resize sebelum upload
   - Square aspect ratio enforcer
   
2. **Compression**
   - Client-side image compression
   - Reduce file size sebelum upload
   
3. **Multiple Upload**
   - Upload multiple photos
   - Choose from gallery
   
4. **External Sources**
   - Upload from URL
   - Social media integration (Google, Facebook)

## 🐛 Known Issues

- None yet! 🎉

## 📚 Related Components

- `src/components/ui/avatar.tsx` - Base Avatar component
- `src/components/Header.tsx` - Navigation header dengan user avatar
- `src/hooks/user/useUserProfile.ts` - User profile management hook

---

**Created:** October 20, 2025  
**Last Updated:** October 20, 2025  
**Version:** 1.0.0

