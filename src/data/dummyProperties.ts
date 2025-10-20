/**
 * Dummy Property Data for Testing
 * Matches backend API response structure
 */

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
  data: dummyPropertySearchResults,
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

