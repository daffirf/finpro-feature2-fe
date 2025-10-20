# 🏨 Cara Akses Modul Property

## 📍 URL Routes

### 1. Landing Page
```
http://localhost:3000/
http://localhost:3000/landing
```

**Fitur:**
- Hero section dengan search form (city, dates, guests)
- 4 Category cards: Villa 🏖️, House 🏠, Apartment 🏢, Guest House 🏡
- Features section
- Demo section dengan dummy data (scroll down)

**Action:**
- Search langsung → redirect ke `/search` dengan params
- Click category card → redirect ke `/search?category=villa` (contoh)

---

### 2. Search Page (Property List)
```
http://localhost:3000/search
http://localhost:3000/search?city=Bali
http://localhost:3000/search?category=villa
http://localhost:3000/search?city=Bali&category=villa&sortBy=price_asc
```

**Query Parameters:**
- `city` - Filter by city (contoh: `Bali`, `Jakarta`)
- `category` - Filter by type: `villa`, `house`, `apartment`, `guest_house`
- `checkIn` - Check-in date (format: `YYYY-MM-DD`)
- `checkOut` - Check-out date (format: `YYYY-MM-DD`)
- `guests` - Number of guests (contoh: `2`)
- `sortBy` - Sort option: `price_asc`, `price_desc`, `rating_desc`, `newest`
- `minPrice` - Minimum price (contoh: `500000`)
- `maxPrice` - Maximum price (contoh: `2000000`)

**Fitur:**
- Search summary dengan info check-in, check-out, guests
- Filter sidebar:
  - Category dropdown (Villa, House, Apartment, Guest House)
  - Sort options
  - Price range (min/max)
  - Amenities checkboxes
- Property cards grid dengan:
  - Category badge (colored)
  - Primary image
  - Rating & reviews
  - Available rooms
  - Price calculation
- Pagination
- Loading & empty states

---

### 3. Property Detail Page
```
http://localhost:3000/property/1
http://localhost:3000/property/1?city=Bali&checkIn=2025-10-20&checkOut=2025-10-25&guests=2
```

**Fitur:**
- Property header dengan category badge
- Location & rating
- Image gallery dengan navigation & thumbnails
- Property description
- Available rooms section:
  - Room cards dengan image, capacity, price
  - Room selection (radio button)
- Reviews section:
  - User reviews dengan rating
  - Tenant replies (nested)
- Booking sidebar (sticky):
  - Price display
  - Price calendar
  - Booking form

---

## 🎯 User Flow Examples

### Flow 1: Search dari Landing Page
1. User buka `http://localhost:3000/`
2. User isi form:
   - City: "Bali"
   - Check-in: "2025-10-20"
   - Check-out: "2025-10-25"
   - Guests: 2
3. Click "Cari Properti"
4. Redirect ke: `/search?city=Bali&checkIn=2025-10-20&checkOut=2025-10-25&guests=2`
5. Melihat hasil pencarian
6. Click "Lihat Detail" pada property
7. Redirect ke: `/property/1?city=Bali&checkIn=2025-10-20&checkOut=2025-10-25&guests=2`

### Flow 2: Filter by Category dari Landing Page
1. User buka `http://localhost:3000/`
2. User click category card "🏖️ Villa"
3. Redirect ke: `/search?category=villa`
4. Melihat semua villa
5. User bisa tambah filter lain (city, price, etc)

### Flow 3: Direct Search dengan URL
1. User langsung akses:
   ```
   http://localhost:3000/search?city=Bali&category=villa&sortBy=price_asc&minPrice=1000000&maxPrice=5000000
   ```
2. Melihat hasil: Villa di Bali, harga 1jt-5jt, sorted by harga terendah

---

## 🔧 Testing dengan Backend

### Setup Backend
Pastikan backend running di `http://localhost:8000`

### Environment Variable
```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Test Endpoints

#### 1. Test Search API
```bash
# Browser atau Postman
GET http://localhost:8000/api/properties/search?city=Bali&category=villa
```

Expected response:
```json
{
  "data": [
    {
      "id": 1,
      "name": "Luxury Beach Villa",
      "category": "villa",
      "city": "Bali",
      "primaryImage": "https://...",
      "minPrice": 1500000,
      "averageRating": 4.5,
      "totalReviews": 24,
      "availableRooms": 3,
      ...
    }
  ],
  "meta": {
    "page": 1,
    "total": 10,
    "totalPages": 1
  }
}
```

#### 2. Test Property Detail API
```bash
GET http://localhost:8000/api/properties/1
```

Expected response:
```json
{
  "property": {
    "id": 1,
    "name": "Luxury Beach Villa",
    "category": "villa",
    "images": [...],
    "rooms": [...],
    "reviews": [...]
  }
}
```

---

## 📊 Feature Checklist

### Landing Page ✅
- [x] Hero section dengan search form
- [x] Category cards (Villa, House, Apartment, Guest House)
- [x] Features section
- [x] Redirect ke search dengan params

### Search Page ✅
- [x] Integrate dengan backend API
- [x] Category filter
- [x] Sort options (price, rating, newest, name)
- [x] Price range filter
- [x] Amenities filter
- [x] Property cards dengan category badge
- [x] Rating & reviews display
- [x] Pagination support
- [x] Loading states
- [x] Empty states
- [x] Error handling

### Property Detail Page ✅
- [x] Integrate dengan backend API
- [x] Category badge
- [x] Image gallery
- [x] Property info
- [x] Room selection
- [x] Reviews dengan tenant replies
- [x] Booking sidebar

---

## 🎨 UI Components

### Category Badge Colors
- **Villa** 🏖️ - Teal (`bg-teal-100 text-teal-800`)
- **House** 🏠 - Blue (`bg-blue-100 text-blue-800`)
- **Apartment** 🏢 - Purple (`bg-purple-100 text-purple-800`)
- **Guest House** 🏡 - Green (`bg-green-100 text-green-800`)

### Primary Color
- Teal (#14B8A6) - untuk buttons, links, accents

---

## 🐛 Troubleshooting

### Issue: Property tidak muncul
**Solution:**
1. Check backend running: `http://localhost:8000`
2. Check `.env.local` ada dan correct
3. Check browser console untuk errors
4. Check Network tab untuk API calls

### Issue: Images tidak muncul
**Solution:**
1. Backend harus return valid image URLs
2. Check CORS settings di backend
3. Check image URLs accessible

### Issue: Category filter tidak bekerja
**Solution:**
1. Backend harus support `category` parameter di `/properties/search`
2. Category values: `villa`, `house`, `apartment`, `guest_house` (lowercase)

---

## 📱 Responsive Design

### Breakpoints
- Mobile: < 768px (1 column)
- Tablet: 768px - 1024px (2 columns)
- Desktop: > 1024px (3-4 columns)

### Mobile Features
- Collapsible filters
- Touch-friendly buttons
- Optimized images
- Simplified layouts

---

## 🚀 Quick Start

1. **Clone & Install**
   ```bash
   cd finpro-feature2-fe
   npm install
   ```

2. **Setup Environment**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local dengan backend URL
   ```

3. **Run Dev Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   ```
   http://localhost:3000
   ```

---

## 📚 Additional Resources

- **Type Definitions**: `src/types/property.ts`
- **API Client**: `src/lib/api.ts`
- **Utilities**: `src/lib/utils.ts`
- **Backend API Docs**: `PROPERTY_API_DOCUMENTATION.md`
- **Setup Guide**: `PROPERTY_FRONTEND_SETUP.md`

---

**Status**: ✅ **READY TO USE**

Semua fitur property sudah terintegrasi dengan backend dan siap digunakan! 🎉

