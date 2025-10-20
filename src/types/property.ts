/**
 * Property Type Definitions
 * Matching backend API responses
 */

export type PropertyCategory = 'villa' | 'house' | 'apartment' | 'guest_house'

export type SortOption = 
  | 'price_asc'
  | 'price_desc'
  | 'rating_desc'
  | 'newest'
  | 'oldest'
  | 'name_asc'
  | 'name_desc'

// Image interface
export interface PropertyImage {
  id: number
  url: string
  altText?: string | null
  isPrimary: boolean
  order: number
}

export interface RoomImage {
  id: number
  url: string
  altText?: string | null
}

// Property search result (from GET /properties/search)
export interface PropertySearchResult {
  id: number
  name: string
  slug: string
  description: string
  address: string
  city: string
  province: string
  category: PropertyCategory
  latitude: number | null
  longitude: number | null
  primaryImage: string | null
  minPrice: number
  averageRating: number
  totalReviews: number
  availableRooms: number
  rooms: {
    id: number
    name: string
    capacity: number
    basePrice: number
    totalUnits: number
  }[]
}

// Property detail (from GET /properties/:id)
export interface PropertyDetail {
  id: number
  tenantId: number
  name: string
  slug: string
  description: string
  address: string
  city: string
  province: string
  category: PropertyCategory
  latitude: number | null
  longitude: number | null
  published: boolean
  averageRating: number
  minPrice: number
  images: PropertyImage[]
  rooms: Room[]
  reviews: Review[]
  tenant: {
    id: number
    name: string
    email: string
    avatarUrl: string | null
  }
  _count: {
    reviews: number
  }
}

export interface Room {
  id: number
  name: string
  description: string
  capacity: number
  basePrice: number
  totalUnits: number
  images: RoomImage[]
}

export interface Review {
  id: number
  rating: number
  comment: string
  createdAt: string
  user: {
    id: number
    name: string
    avatarUrl: string | null
  }
  reply?: {
    id: number
    content: string
    createdAt: string
    tenant: {
      id: number
      name: string
      avatarUrl: string | null
    }
  } | null
}

// Search parameters
export interface PropertySearchParams {
  city?: string
  category?: PropertyCategory
  checkIn?: string
  checkOut?: string
  guests?: number
  minPrice?: number
  maxPrice?: number
  sortBy?: SortOption
  page?: number
  limit?: number
}

// API Response wrappers
export interface PropertySearchResponse {
  data: PropertySearchResult[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface PropertyDetailResponse {
  property: PropertyDetail
}

// Price calendar
export interface PropertyPrice {
  date: string
  price: number
  isAvailable: boolean
  isWeekend: boolean
}

export interface PropertyPricesResponse {
  prices: PropertyPrice[]
}

