import { PropertySearchResult, PropertyDetail, PropertySearchResponse } from '@/types/property'

// Dummy Property Search Results (for Search Page)
export const dummyPropertySearchResults: PropertySearchResult[] = [
  {
    id: 1,
    name: "Luxury Beach Villa Seminyak",
    slug: "luxury-beach-villa-seminyak",
    description: "Villa mewah dengan pemandangan pantai yang menakjubkan. Dilengkapi dengan private pool, jacuzzi, dan akses langsung ke pantai. Perfect untuk honeymoon atau family vacation.",
    address: "Jl. Pantai Seminyak No. 123",
    city: "Bali",
    province: "Bali",
    category: "villa",
    latitude: -8.691950,
    longitude: 115.167171,
    primaryImage: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&auto=format&fit=crop",
    minPrice: 2500000,
    averageRating: 4.8,
    totalReviews: 124,
    availableRooms: 5,
    rooms: [
      { id: 1, name: "Master Suite", capacity: 2, basePrice: 3500000, totalUnits: 1 },
      { id: 2, name: "Deluxe Room", capacity: 2, basePrice: 2500000, totalUnits: 3 },
      { id: 3, name: "Family Suite", capacity: 4, basePrice: 4500000, totalUnits: 1 }
    ]
  },
  {
    id: 2,
    name: "Modern Family House Jakarta",
    slug: "modern-family-house-jakarta",
    description: "Rumah modern 3 lantai di area premium Jakarta Selatan. Fully furnished dengan design interior minimalis. Dekat dengan mall, sekolah, dan akses tol.",
    address: "Jl. Kemang Raya No. 88",
    city: "Jakarta",
    province: "DKI Jakarta",
    category: "house",
    latitude: -6.265650,
    longitude: 106.817810,
    primaryImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop",
    minPrice: 1500000,
    averageRating: 4.5,
    totalReviews: 89,
    availableRooms: 4,
    rooms: [
      { id: 4, name: "Master Bedroom", capacity: 2, basePrice: 2000000, totalUnits: 1 },
      { id: 5, name: "Standard Room", capacity: 2, basePrice: 1500000, totalUnits: 2 },
      { id: 6, name: "Kids Room", capacity: 2, basePrice: 1500000, totalUnits: 1 }
    ]
  },
  {
    id: 3,
    name: "Sky View Apartment Surabaya",
    slug: "sky-view-apartment-surabaya",
    description: "Apartemen modern dengan view kota yang spektakuler. Lokasi strategis di pusat kota Surabaya. Dilengkapi dengan gym, swimming pool, dan 24h security.",
    address: "Jl. HR Muhammad No. 123",
    city: "Surabaya",
    province: "Jawa Timur",
    category: "apartment",
    latitude: -7.257472,
    longitude: 112.752090,
    primaryImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop",
    minPrice: 800000,
    averageRating: 4.3,
    totalReviews: 67,
    availableRooms: 8,
    rooms: [
      { id: 7, name: "Studio 35m²", capacity: 2, basePrice: 800000, totalUnits: 5 },
      { id: 8, name: "2BR 55m²", capacity: 4, basePrice: 1200000, totalUnits: 3 }
    ]
  },
  {
    id: 4,
    name: "Cozy Mountain Guest House",
    slug: "cozy-mountain-guest-house",
    description: "Guest house nyaman di kawasan pegunungan Bandung. Suasana sejuk dan tenang, perfect untuk retreat atau weekend getaway. Pemandangan indah dan udara segar.",
    address: "Jl. Lembang No. 45",
    city: "Bandung",
    province: "Jawa Barat",
    category: "guest_house",
    latitude: -6.812050,
    longitude: 107.616890,
    primaryImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop",
    minPrice: 500000,
    averageRating: 4.7,
    totalReviews: 156,
    availableRooms: 6,
    rooms: [
      { id: 9, name: "Mountain View", capacity: 2, basePrice: 650000, totalUnits: 4 },
      { id: 10, name: "Garden View", capacity: 2, basePrice: 500000, totalUnits: 2 }
    ]
  },
  {
    id: 5,
    name: "Tropical Paradise Villa Ubud",
    slug: "tropical-paradise-villa-ubud",
    description: "Villa eksotis di tengah sawah Ubud. Private pool dengan view rice terrace. Tranquil dan peaceful ambiance. Perfect untuk yoga retreat atau peaceful vacation.",
    address: "Jl. Raya Ubud No. 77",
    city: "Ubud",
    province: "Bali",
    category: "villa",
    latitude: -8.506830,
    longitude: 115.263168,
    primaryImage: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&auto=format&fit=crop",
    minPrice: 3000000,
    averageRating: 4.9,
    totalReviews: 203,
    availableRooms: 3,
    rooms: [
      { id: 11, name: "Pool Villa Suite", capacity: 2, basePrice: 4000000, totalUnits: 1 },
      { id: 12, name: "Deluxe Bungalow", capacity: 2, basePrice: 3000000, totalUnits: 2 }
    ]
  },
  {
    id: 6,
    name: "Downtown Business Apartment",
    slug: "downtown-business-apartment",
    description: "Apartemen strategis untuk business travelers. Lokasi di pusat bisnis Jakarta dengan akses mudah ke kantor dan meeting venues. High-speed WiFi dan workspace.",
    address: "Jl. Sudirman No. 234",
    city: "Jakarta",
    province: "DKI Jakarta",
    category: "apartment",
    latitude: -6.208763,
    longitude: 106.845599,
    primaryImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
    minPrice: 1000000,
    averageRating: 4.4,
    totalReviews: 92,
    availableRooms: 10,
    rooms: [
      { id: 13, name: "Studio Exec", capacity: 2, basePrice: 1000000, totalUnits: 6 },
      { id: 14, name: "1BR Executive", capacity: 2, basePrice: 1500000, totalUnits: 4 }
    ]
  },
  {
    id: 7,
    name: "Sunset Beach House Canggu",
    slug: "sunset-beach-house-canggu",
    description: "Beach house dengan pemandangan sunset yang memukau. Lokasi strategis dekat dengan beach clubs dan surfing spots. Ideal untuk digital nomads dan surfers.",
    address: "Jl. Batu Bolong No. 56",
    city: "Canggu",
    province: "Bali",
    category: "house",
    latitude: -8.648892,
    longitude: 115.137817,
    primaryImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop",
    minPrice: 1800000,
    averageRating: 4.6,
    totalReviews: 78,
    availableRooms: 4,
    rooms: [
      { id: 15, name: "Ocean View Master", capacity: 2, basePrice: 2500000, totalUnits: 1 },
      { id: 16, name: "Garden Room", capacity: 2, basePrice: 1800000, totalUnits: 3 }
    ]
  },
  {
    id: 8,
    name: "Urban Loft Apartment Yogyakarta",
    slug: "urban-loft-apartment-yogyakarta",
    description: "Loft apartment dengan design industrial chic. Dekat Malioboro dan kraton. Perfect untuk culture enthusiasts dan solo travelers. Akses mudah ke tempat wisata.",
    address: "Jl. Malioboro No. 45A",
    city: "Yogyakarta",
    province: "DI Yogyakarta",
    category: "apartment",
    latitude: -7.795580,
    longitude: 110.369492,
    primaryImage: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&auto=format&fit=crop",
    minPrice: 400000,
    averageRating: 4.2,
    totalReviews: 143,
    availableRooms: 12,
    rooms: [
      { id: 17, name: "Studio Loft", capacity: 2, basePrice: 400000, totalUnits: 8 },
      { id: 18, name: "Deluxe Loft", capacity: 3, basePrice: 600000, totalUnits: 4 }
    ]
  },
  {
    id: 9,
    name: "Heritage Guest House Solo",
    slug: "heritage-guest-house-solo",
    description: "Guest house dengan nuansa Jawa klasik. Arsitektur tradisional dengan modern comfort. Dekat Keraton Solo dan pasar tradisional. Pengalaman budaya yang autentik.",
    address: "Jl. Slamet Riyadi No. 234",
    city: "Solo",
    province: "Jawa Tengah",
    category: "guest_house",
    latitude: -7.565830,
    longitude: 110.826263,
    primaryImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop",
    minPrice: 350000,
    averageRating: 4.8,
    totalReviews: 112,
    availableRooms: 8,
    rooms: [
      { id: 19, name: "Javanese Room", capacity: 2, basePrice: 450000, totalUnits: 4 },
      { id: 20, name: "Standard Room", capacity: 2, basePrice: 350000, totalUnits: 4 }
    ]
  },
  {
    id: 10,
    name: "Cliffside Villa Uluwatu",
    slug: "cliffside-villa-uluwatu",
    description: "Villa eksklusif di tebing dengan ocean view 180 derajat. Infinity pool menghadap Samudera Hindia. Ultimate luxury experience dengan sunset view yang tak terlupakan.",
    address: "Jl. Labuansait No. 12",
    city: "Uluwatu",
    province: "Bali",
    category: "villa",
    latitude: -8.829090,
    longitude: 115.084930,
    primaryImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop",
    minPrice: 5000000,
    averageRating: 4.9,
    totalReviews: 87,
    availableRooms: 2,
    rooms: [
      { id: 21, name: "Presidential Suite", capacity: 2, basePrice: 8000000, totalUnits: 1 },
      { id: 22, name: "Ocean View Suite", capacity: 2, basePrice: 5000000, totalUnits: 1 }
    ]
  },
  {
    id: 11,
    name: "Colonial House Medan",
    slug: "colonial-house-medan",
    description: "Rumah kolonial dengan arsitektur klasik. Fully restored dengan modern amenities. Taman luas dan parkir pribadi. Cocok untuk acara keluarga besar.",
    address: "Jl. Imam Bonjol No. 88",
    city: "Medan",
    province: "Sumatera Utara",
    category: "house",
    latitude: 3.595196,
    longitude: 98.672226,
    primaryImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
    minPrice: 1200000,
    averageRating: 4.4,
    totalReviews: 56,
    availableRooms: 6,
    rooms: [
      { id: 23, name: "Master Suite", capacity: 2, basePrice: 1800000, totalUnits: 2 },
      { id: 24, name: "Classic Room", capacity: 2, basePrice: 1200000, totalUnits: 4 }
    ]
  },
  {
    id: 12,
    name: "Riverfront Guest House Makassar",
    slug: "riverfront-guest-house-makassar",
    description: "Guest house pinggir sungai dengan suasana tenang. View sungai dari setiap kamar. Dekat pelabuhan dan Fort Rotterdam. Ideal untuk backpackers dan budget travelers.",
    address: "Jl. Penghibur No. 23",
    city: "Makassar",
    province: "Sulawesi Selatan",
    category: "guest_house",
    latitude: -5.147665,
    longitude: 119.432732,
    primaryImage: "https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?w=800&auto=format&fit=crop",
    minPrice: 250000,
    averageRating: 4.1,
    totalReviews: 94,
    availableRooms: 10,
    rooms: [
      { id: 25, name: "River View", capacity: 2, basePrice: 350000, totalUnits: 5 },
      { id: 26, name: "Standard", capacity: 2, basePrice: 250000, totalUnits: 5 }
    ]
  },
  {
    id: 13,
    name: "Modern Minimalist House Semarang",
    slug: "modern-minimalist-house-semarang",
    description: "Rumah minimalis modern di kawasan elite Semarang. Smart home system, solar panel, dan eco-friendly design. Dekat dengan mall dan area bisnis.",
    address: "Jl. Pandanaran No. 156",
    city: "Semarang",
    province: "Jawa Tengah",
    category: "house",
    latitude: -7.005145,
    longitude: 110.438126,
    primaryImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop",
    minPrice: 1400000,
    averageRating: 4.6,
    totalReviews: 71,
    availableRooms: 5,
    rooms: [
      { id: 27, name: "Smart Master", capacity: 2, basePrice: 2000000, totalUnits: 1 },
      { id: 28, name: "Modern Room", capacity: 2, basePrice: 1400000, totalUnits: 4 }
    ]
  },
  {
    id: 14,
    name: "Luxury Penthouse Jakarta",
    slug: "luxury-penthouse-jakarta",
    description: "Penthouse mewah lantai 45 dengan city view 360 derajat. Private lift access, rooftop terrace, dan smart home automation. Kemewahan maksimal di jantung Jakarta.",
    address: "Jl. Jend. Sudirman Kav. 52-53",
    city: "Jakarta",
    province: "DKI Jakarta",
    category: "apartment",
    latitude: -6.209660,
    longitude: 106.823156,
    primaryImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
    minPrice: 4500000,
    averageRating: 4.8,
    totalReviews: 45,
    availableRooms: 1,
    rooms: [
      { id: 29, name: "Penthouse Suite", capacity: 4, basePrice: 4500000, totalUnits: 1 }
    ]
  },
  {
    id: 15,
    name: "Tropical Villa Lombok",
    slug: "tropical-villa-lombok",
    description: "Villa tropis dengan private beach access. Pemandangan Gunung Rinjani dan laut. Snorkeling equipment included. Paradise for beach lovers.",
    address: "Jl. Pantai Senggigi No. 99",
    city: "Lombok",
    province: "Nusa Tenggara Barat",
    category: "villa",
    latitude: -8.490470,
    longitude: 116.042320,
    primaryImage: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop",
    minPrice: 2800000,
    averageRating: 4.7,
    totalReviews: 98,
    availableRooms: 4,
    rooms: [
      { id: 30, name: "Beachfront Villa", capacity: 2, basePrice: 3500000, totalUnits: 2 },
      { id: 31, name: "Garden Villa", capacity: 2, basePrice: 2800000, totalUnits: 2 }
    ]
  },
  {
    id: 16,
    name: "Budget Studio Apartment Bandung",
    slug: "budget-studio-apartment-bandung",
    description: "Studio apartment terjangkau untuk mahasiswa dan young professionals. Fully furnished, WiFi cepat, dan dekat kampus ITB. Budget-friendly dengan fasilitas lengkap.",
    address: "Jl. Dago No. 234",
    city: "Bandung",
    province: "Jawa Barat",
    category: "apartment",
    latitude: -6.870120,
    longitude: 107.613690,
    primaryImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
    minPrice: 300000,
    averageRating: 4.0,
    totalReviews: 187,
    availableRooms: 20,
    rooms: [
      { id: 32, name: "Studio Basic", capacity: 2, basePrice: 300000, totalUnits: 15 },
      { id: 33, name: "Studio Plus", capacity: 2, basePrice: 400000, totalUnits: 5 }
    ]
  },
  {
    id: 17,
    name: "Family Beach House Anyer",
    slug: "family-beach-house-anyer",
    description: "Beach house langsung pinggir pantai. BBQ area, kids playground, dan private beach. Perfect untuk family gathering dan reunion. Sunset view yang indah.",
    address: "Jl. Raya Anyer No. 78",
    city: "Anyer",
    province: "Banten",
    category: "house",
    latitude: -6.032860,
    longitude: 105.869217,
    primaryImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop",
    minPrice: 2000000,
    averageRating: 4.5,
    totalReviews: 63,
    availableRooms: 5,
    rooms: [
      { id: 34, name: "Family Suite", capacity: 4, basePrice: 3000000, totalUnits: 2 },
      { id: 35, name: "Standard Room", capacity: 2, basePrice: 2000000, totalUnits: 3 }
    ]
  },
  {
    id: 18,
    name: "Rustic Mountain Guest House Bogor",
    slug: "rustic-mountain-guest-house-bogor",
    description: "Guest house bergaya rustic di kawasan Puncak. Udara sejuk, view pegunungan, dan taman teh. Fireplace untuk malam yang dingin. Perfect mountain retreat.",
    address: "Jl. Raya Puncak KM 87",
    city: "Bogor",
    province: "Jawa Barat",
    category: "guest_house",
    latitude: -6.692090,
    longitude: 106.976890,
    primaryImage: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&auto=format&fit=crop",
    minPrice: 600000,
    averageRating: 4.6,
    totalReviews: 129,
    availableRooms: 7,
    rooms: [
      { id: 36, name: "Mountain View Deluxe", capacity: 2, basePrice: 800000, totalUnits: 3 },
      { id: 37, name: "Standard Room", capacity: 2, basePrice: 600000, totalUnits: 4 }
    ]
  },
  {
    id: 19,
    name: "Modern Executive Apartment Surabaya",
    slug: "modern-executive-apartment-surabaya",
    description: "Executive apartment dengan fasilitas premium. Swimming pool infinity, gym 24h, dan sky lounge. Lokasi strategis di pusat bisnis Surabaya.",
    address: "Jl. Mayjen Sungkono No. 89",
    city: "Surabaya",
    province: "Jawa Timur",
    category: "apartment",
    latitude: -7.289140,
    longitude: 112.734490,
    primaryImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop",
    minPrice: 1100000,
    averageRating: 4.5,
    totalReviews: 76,
    availableRooms: 8,
    rooms: [
      { id: 38, name: "1BR Executive", capacity: 2, basePrice: 1100000, totalUnits: 5 },
      { id: 39, name: "2BR Executive", capacity: 4, basePrice: 1800000, totalUnits: 3 }
    ]
  },
  {
    id: 20,
    name: "Beachfront Villa Nusa Dua",
    slug: "beachfront-villa-nusa-dua",
    description: "Villa eksklusif di area resort Nusa Dua. Private beach, butler service, dan spa treatment. Ultimate luxury untuk honeymoon atau special occasion.",
    address: "Kawasan ITDC Nusa Dua",
    city: "Nusa Dua",
    province: "Bali",
    category: "villa",
    latitude: -8.801540,
    longitude: 115.229670,
    primaryImage: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&auto=format&fit=crop",
    minPrice: 6000000,
    averageRating: 5.0,
    totalReviews: 52,
    availableRooms: 2,
    rooms: [
      { id: 40, name: "Royal Villa Suite", capacity: 2, basePrice: 9000000, totalUnits: 1 },
      { id: 41, name: "Luxury Beach Villa", capacity: 2, basePrice: 6000000, totalUnits: 1 }
    ]
  }
]

// Dummy Property Detail (for Property Detail Page)
export const dummyPropertyDetail: PropertyDetail = {
  id: 1,
  tenantId: 101,
  name: "Luxury Beach Villa Seminyak",
  slug: "luxury-beach-villa-seminyak",
  description: `Selamat datang di Luxury Beach Villa Seminyak, destinasi impian Anda untuk liburan yang tak terlupakan di Bali!

Villa mewah kami menawarkan pengalaman menginap yang luar biasa dengan pemandangan pantai yang menakjubkan dan akses langsung ke pasir putih Seminyak Beach. Didesain dengan perpaduan sempurna antara kemewahan modern dan sentuhan tradisional Bali.

Fasilitas Utama:
• Private swimming pool dengan sun deck
• Jacuzzi outdoor dengan ocean view
• Tropical garden yang asri
• Open-air living room
• Fully equipped kitchen dengan peralatan modern
• BBQ area untuk dinner party
• 24-hour security & housekeeping
• Complimentary breakfast

Lokasi strategis, hanya 5 menit dari:
- Seminyak Beach Club
- Potato Head Beach Club
- Ku De Ta
- Shopping area Seminyak
- Fine dining restaurants`,
  address: "Jl. Pantai Seminyak No. 123",
  city: "Bali",
  province: "Bali",
  category: "villa",
  latitude: -8.691950,
  longitude: 115.167171,
  published: true,
  averageRating: 4.8,
  minPrice: 2500000,
  images: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&auto=format&fit=crop",
      altText: "Villa Exterior with Pool",
      isPrimary: true,
      order: 0
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&auto=format&fit=crop",
      altText: "Private Pool View",
      isPrimary: false,
      order: 1
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop",
      altText: "Living Room",
      isPrimary: false,
      order: 2
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop",
      altText: "Bedroom Master Suite",
      isPrimary: false,
      order: 3
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&auto=format&fit=crop",
      altText: "Bathroom with Bathtub",
      isPrimary: false,
      order: 4
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop",
      altText: "Kitchen and Dining",
      isPrimary: false,
      order: 5
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&auto=format&fit=crop",
      altText: "Garden Area",
      isPrimary: false,
      order: 6
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&auto=format&fit=crop",
      altText: "Sunset View",
      isPrimary: false,
      order: 7
    }
  ],
  rooms: [
    {
      id: 1,
      name: "Master Suite with Ocean View",
      description: "Kamar utama dengan king bed, balcony private menghadap ke laut, walk-in closet, dan en-suite bathroom dengan bathtub dan rain shower. AC, Smart TV 55\", mini bar, dan safe box.",
      capacity: 2,
      basePrice: 3500000,
      totalUnits: 1,
      images: [
        {
          id: 101,
          url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop",
          altText: "Master Suite"
        },
        {
          id: 102,
          url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&auto=format&fit=crop",
          altText: "Master Bathroom"
        }
      ]
    },
    {
      id: 2,
      name: "Deluxe Garden Room",
      description: "Kamar nyaman dengan queen bed, garden view, AC, Smart TV 43\", mini fridge, dan en-suite bathroom dengan shower. Perfect untuk couples atau solo travelers.",
      capacity: 2,
      basePrice: 2500000,
      totalUnits: 3,
      images: [
        {
          id: 103,
          url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&auto=format&fit=crop",
          altText: "Deluxe Room"
        }
      ]
    },
    {
      id: 3,
      name: "Family Suite 2 Bedrooms",
      description: "Suite luas dengan 2 kamar tidur (1 king bed + 2 single beds), living room, kitchenette, dan 2 bathrooms. Ideal untuk keluarga dengan anak-anak.",
      capacity: 4,
      basePrice: 4500000,
      totalUnits: 1,
      images: [
        {
          id: 104,
          url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop",
          altText: "Family Suite"
        }
      ]
    }
  ],
  reviews: [
    {
      id: 1,
      rating: 5,
      comment: "Absolutely amazing villa! The location is perfect, just steps away from the beach. The pool area is stunning and we loved having breakfast by the pool every morning. Staff was incredibly helpful and friendly. Will definitely come back!",
      createdAt: "2025-10-15T10:30:00Z",
      user: {
        id: 201,
        name: "Sarah Johnson",
        avatarUrl: "https://i.pravatar.cc/150?img=1"
      },
      reply: {
        id: 1001,
        content: "Thank you so much for your wonderful review, Sarah! We're thrilled to hear you enjoyed your stay. We look forward to welcoming you back soon! 🙏",
        createdAt: "2025-10-16T09:00:00Z",
        tenant: {
          id: 101,
          name: "Bali Luxury Villas Management",
          avatarUrl: "https://i.pravatar.cc/150?img=50"
        }
      }
    },
    {
      id: 2,
      rating: 5,
      comment: "Perfect honeymoon destination! The villa exceeded all our expectations. Everything was spotless, beautifully decorated, and the amenities were top-notch. The sunset views from the pool are breathtaking. Highly recommended!",
      createdAt: "2025-10-10T14:20:00Z",
      user: {
        id: 202,
        name: "Michael Chen",
        avatarUrl: "https://i.pravatar.cc/150?img=12"
      },
      reply: {
        id: 1002,
        content: "Congratulations on your honeymoon! We're so happy we could be part of your special celebration. Thank you for choosing our villa! ❤️",
        createdAt: "2025-10-11T08:30:00Z",
        tenant: {
          id: 101,
          name: "Bali Luxury Villas Management",
          avatarUrl: "https://i.pravatar.cc/150?img=50"
        }
      }
    },
    {
      id: 3,
      rating: 4,
      comment: "Great villa with excellent facilities. The rooms are spacious and comfortable. Only minor issue was the WiFi was a bit slow in some areas, but overall a wonderful experience. Great value for money!",
      createdAt: "2025-10-05T16:45:00Z",
      user: {
        id: 203,
        name: "Amanda Rodriguez",
        avatarUrl: "https://i.pravatar.cc/150?img=5"
      },
      reply: {
        id: 1003,
        content: "Thank you for your feedback, Amanda! We're glad you enjoyed your stay. We've noted your comment about the WiFi and are currently upgrading our internet infrastructure. We hope to see you again soon!",
        createdAt: "2025-10-06T10:15:00Z",
        tenant: {
          id: 101,
          name: "Bali Luxury Villas Management",
          avatarUrl: "https://i.pravatar.cc/150?img=50"
        }
      }
    },
    {
      id: 4,
      rating: 5,
      comment: "Best villa we've stayed at in Bali! The private pool is amazing, and the location can't be beat. Walking distance to great restaurants and beach clubs. The staff went above and beyond to make our stay special.",
      createdAt: "2025-09-28T11:00:00Z",
      user: {
        id: 204,
        name: "David Thompson",
        avatarUrl: "https://i.pravatar.cc/150?img=15"
      },
      reply: null
    },
    {
      id: 5,
      rating: 5,
      comment: "Stayed here for a week with my family and we had an incredible time. The kids loved the pool, and we adults enjoyed the tranquil atmosphere. Very clean, well-maintained, and the breakfast service was excellent!",
      createdAt: "2025-09-20T09:30:00Z",
      user: {
        id: 205,
        name: "Emily Wang",
        avatarUrl: "https://i.pravatar.cc/150?img=9"
      },
      reply: {
        id: 1004,
        content: "Thank you Emily! We're so happy your whole family enjoyed the villa. Hope to host you again in the future! 🌴",
        createdAt: "2025-09-21T08:00:00Z",
        tenant: {
          id: 101,
          name: "Bali Luxury Villas Management",
          avatarUrl: "https://i.pravatar.cc/150?img=50"
        }
      }
    }
  ],
  tenant: {
    id: 101,
    name: "Bali Luxury Villas Management",
    email: "info@baliluxuryvillas.com",
    avatarUrl: "https://i.pravatar.cc/150?img=50"
  },
  _count: {
    reviews: 124
  }
}

// Mock API Response for Search
export const mockPropertySearchResponse: PropertySearchResponse = {
  data: dummyPropertySearchResults.slice(0, 10),
  meta: {
    page: 1,
    limit: 10,
    total: 20,
    totalPages: 2,
    hasNext: true,
    hasPrev: false
  }
}

// Helper function to filter dummy data by category
export function filterPropertiesByCategory(category?: string): PropertySearchResult[] {
  if (!category || category === '') {
    return dummyPropertySearchResults
  }
  return dummyPropertySearchResults.filter(p => p.category === category)
}

// Helper function to get property by ID
export function getPropertyById(id: number): PropertyDetail | undefined {
  if (id === 1) {
    return dummyPropertyDetail
  }
  // For other IDs, return a simplified version
  const searchResult = dummyPropertySearchResults.find(p => p.id === id)
  if (!searchResult) return undefined
  
  // Convert search result to detail format
  return {
    ...searchResult,
    tenantId: 100 + id,
    published: true,
    images: [
      {
        id: id * 10,
        url: searchResult.primaryImage || '',
        altText: searchResult.name,
        isPrimary: true,
        order: 0
      }
    ],
    rooms: searchResult.rooms.map((room, idx) => ({
      ...room,
      description: `Comfortable ${room.name} with modern amenities`,
      images: []
    })),
    reviews: [],
    tenant: {
      id: 100 + id,
      name: "Property Management",
      email: "info@property.com",
      avatarUrl: null
    },
    _count: {
      reviews: searchResult.totalReviews
    }
  }
}

