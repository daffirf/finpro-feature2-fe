# 🧪 Dummy Data Testing Guide

## 📋 Overview

Dummy data telah ditambahkan untuk testing property module tanpa perlu backend API. Anda bisa toggle antara **mock data** dan **real API** dengan mudah.

---

## 📁 File Structure

```
src/
├── data/
│   └── dummyProperties.ts      # ✅ Dummy property data
├── lib/
│   └── mockApi.ts              # ✅ Mock API wrapper
├── app/
│   ├── search/page.tsx         # ✅ Updated to use mockApi
│   └── property/[id]/page.tsx  # ✅ Updated to use mockApi
```

---

## 🎯 Dummy Data Contents

### 1. **Property Search Results** (6 Properties)

| ID | Name | Category | City | Price | Rating |
|----|------|----------|------|-------|--------|
| 1 | Luxury Beach Villa Seminyak | Villa | Bali | Rp 2.5jt | 4.8 ⭐ |
| 2 | Modern Family House Jakarta | House | Jakarta | Rp 1.5jt | 4.5 ⭐ |
| 3 | Sky View Apartment Surabaya | Apartment | Surabaya | Rp 800rb | 4.3 ⭐ |
| 4 | Cozy Mountain Guest House | Guest House | Bandung | Rp 500rb | 4.7 ⭐ |
| 5 | Tropical Paradise Villa Ubud | Villa | Ubud | Rp 3jt | 4.9 ⭐ |
| 6 | Downtown Business Apartment | Apartment | Jakarta | Rp 1jt | 4.4 ⭐ |

**Features:**
- ✅ Berbagai kategori (villa, house, apartment, guest_house)
- ✅ Berbagai lokasi (Bali, Jakarta, Surabaya, Bandung, Ubud)
- ✅ Berbagai price range (500rb - 3jt)
- ✅ Multiple rooms per property
- ✅ Real Unsplash images
- ✅ Realistic descriptions

---

### 2. **Property Detail** (ID: 1 - Full Detail)

**Luxury Beach Villa Seminyak** dengan:
- ✅ 8 high-quality images (Unsplash)
- ✅ 3 room types dengan images
- ✅ 5 user reviews dengan ratings
- ✅ 3 tenant replies
- ✅ Complete property info
- ✅ Realistic descriptions

**Other IDs (2-6):**
- Auto-generated dari search results
- Basic detail format
- Sufficient for testing

---

## 🔄 How to Toggle Mock/Real API

### **Enable Mock Data (Testing Mode)**

**File:** `src/lib/mockApi.ts`

```typescript
// Set to TRUE untuk testing dengan dummy data
export const USE_MOCK_DATA = true
```

**What happens:**
- ✅ All API calls menggunakan dummy data
- ✅ Simulate network delay (500-800ms)
- ✅ Console log menampilkan "🔧 MOCK API MODE ACTIVE"
- ✅ No backend needed

---

### **Disable Mock Data (Production Mode)**

```typescript
// Set to FALSE untuk menggunakan real backend API
export const USE_MOCK_DATA = false
```

**What happens:**
- ✅ All API calls ke real backend
- ✅ Console log menampilkan "✅ REAL API MODE"
- ✅ Backend harus running di `http://localhost:8000`

---

## 🧪 Testing Scenarios

### **Scenario 1: Test Landing Page**

1. Set `USE_MOCK_DATA = true`
2. Buka `http://localhost:3000/`
3. ✅ Landing page tampil normal
4. ✅ Category cards bisa diklik
5. ✅ Search form bisa submit

---

### **Scenario 2: Test Search Page**

1. Set `USE_MOCK_DATA = true`
2. Buka `http://localhost:3000/search`
3. Test features:
   - ✅ **Filter by category** - Pilih Villa/House/Apartment/Guest House
   - ✅ **Filter by city** - Type "Bali" atau "Jakarta"
   - ✅ **Sort options** - Harga terendah/tertinggi, Rating
   - ✅ **Price range** - Min 1jt, Max 2jt
   - ✅ **View results** - 6 properties muncul

**URL Examples:**
```
/search?category=villa
/search?city=Bali
/search?category=villa&sortBy=price_asc
/search?minPrice=1000000&maxPrice=2000000
```

---

### **Scenario 3: Test Property Detail**

1. Set `USE_MOCK_DATA = true`
2. Buka `http://localhost:3000/property/1`
3. ✅ Full detail dengan:
   - Image gallery (8 images)
   - Property info
   - Room selection
   - Reviews dengan tenant replies
   - Booking sidebar

**Other IDs:**
```
/property/2  → Modern Family House
/property/3  → Sky View Apartment
/property/4  → Cozy Mountain Guest House
/property/5  → Tropical Paradise Villa
/property/6  → Downtown Business Apartment
```

---

### **Scenario 4: Test Filtering**

**Mock API sudah support:**
- ✅ Filter by **category**
- ✅ Filter by **city** (case insensitive, partial match)
- ✅ Filter by **minPrice**
- ✅ Filter by **maxPrice**
- ✅ Sort by **price_asc**, **price_desc**, **rating_desc**, **name_asc**

**Example Test:**
```javascript
// Di console browser
// Filter villa di Bali dengan harga < 3jt
/search?category=villa&city=Bali&maxPrice=3000000&sortBy=price_asc
```

---

## 🎨 Dummy Data Features

### **Realistic Images**
All images dari **Unsplash** dengan high quality:
- Villa: Beach & luxury images
- House: Modern house photos
- Apartment: City apartment views
- Guest House: Cozy accommodation photos

### **Realistic Reviews**
- User names & avatars (using pravatar.cc)
- Varied ratings (4-5 stars)
- Realistic comments
- Tenant replies untuk beberapa reviews
- Timestamps

### **Multiple Rooms**
Setiap property punya 2-3 room types:
- Different capacities (2-4 guests)
- Different prices
- Room images
- Descriptions

---

## 🔍 Mock API Functions

### **searchProperties()**
```typescript
import { searchProperties } from '@/lib/mockApi'

const response = await searchProperties({
  category: 'villa',
  city: 'Bali',
  sortBy: 'price_asc',
  minPrice: 1000000,
  maxPrice: 5000000
})

// Returns: PropertySearchResponse dengan data & meta
```

### **getPropertyDetail()**
```typescript
import { getPropertyDetail } from '@/lib/mockApi'

const response = await getPropertyDetail(1)

// Returns: PropertyDetailResponse dengan full property info
```

### **logApiMode()**
```typescript
import { logApiMode } from '@/lib/mockApi'

logApiMode()
// Console: 🔧 MOCK API MODE ACTIVE atau ✅ REAL API MODE
```

---

## 🐛 Troubleshooting

### Issue: Mock data tidak muncul
**Solution:**
1. Check `USE_MOCK_DATA = true` di `src/lib/mockApi.ts`
2. Refresh browser
3. Check console untuk log mode

### Issue: Infinite loading
**Solution:**
1. Check console untuk errors
2. Verify import statements
3. Check TypeScript types

### Issue: Images tidak muncul
**Solution:**
1. Check internet connection (Unsplash CDN)
2. Check next.config.ts untuk domains:
   ```typescript
   images: {
     domains: ['images.unsplash.com', 'i.pravatar.cc']
   }
   ```

---

## 📊 Testing Checklist

### Landing Page ✅
- [ ] Hero section tampil
- [ ] Category cards tampil dengan Lucide icons
- [ ] Search form bisa diisi
- [ ] Submit redirect ke search page

### Search Page ✅
- [ ] 6 properties tampil
- [ ] Category filter works
- [ ] City filter works
- [ ] Price filter works
- [ ] Sort options works
- [ ] Property cards tampil dengan:
  - [ ] Category badge (colored)
  - [ ] Images (Unsplash)
  - [ ] Rating stars
  - [ ] Available rooms
  - [ ] Prices
- [ ] Click "Lihat Detail" redirect ke detail page

### Property Detail Page ✅
- [ ] Property detail tampil (ID: 1)
- [ ] Image gallery works (8 images)
- [ ] Thumbnails clickable
- [ ] Category badge tampil
- [ ] Room selection works
- [ ] Reviews tampil
- [ ] Tenant replies tampil (nested box)
- [ ] Booking sidebar tampil

---

## 🔄 Switching to Real Backend

Ketika backend sudah ready:

1. **Update mockApi.ts:**
   ```typescript
   export const USE_MOCK_DATA = false
   ```

2. **Verify .env.local:**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

3. **Start backend:**
   ```bash
   # Backend harus running di localhost:8000
   ```

4. **Test:**
   - Refresh browser
   - Check console: "✅ REAL API MODE"
   - Verify data dari backend

---

## 💡 Pro Tips

### **Development Workflow**
1. Start dengan `USE_MOCK_DATA = true` untuk development
2. Test all features dengan dummy data
3. Switch ke `USE_MOCK_DATA = false` saat backend ready
4. Test integration dengan real backend

### **Adding More Dummy Data**
Edit `src/data/dummyProperties.ts`:
```typescript
export const dummyPropertySearchResults: PropertySearchResult[] = [
  // Add more properties here
  {
    id: 7,
    name: "Your New Property",
    // ...
  }
]
```

### **Customizing Mock Delay**
Edit `src/lib/mockApi.ts`:
```typescript
const mockDelay = (ms: number = 500) => // Change 500 to your desired ms
```

---

## 📚 Additional Resources

- **Type Definitions:** `src/types/property.ts`
- **Real API Docs:** `PROPERTY_API_DOCUMENTATION.md`
- **Setup Guide:** `PROPERTY_FRONTEND_SETUP.md`
- **Access Guide:** `CARA_AKSES_PROPERTY.md`

---

**Status:** ✅ **Ready for Testing**

Dummy data sudah complete dan siap digunakan untuk testing tanpa backend! 🎉

**Toggle `USE_MOCK_DATA` untuk switch antara mock dan real API.**

