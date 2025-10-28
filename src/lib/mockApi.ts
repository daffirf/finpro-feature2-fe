/**
 * Mock API untuk testing tanpa backend
 * Toggle USE_MOCK_DATA untuk switch antara real API dan mock data
 */

import { 
  dummyPropertySearchResults, 
  dummyPropertyDetail,
  mockPropertySearchResponse,
  filterPropertiesByCategory,
  getPropertyById,
  getPropertyBySlug 
} from '@/data/dummyProperties'
import { PropertySearchResponse, PropertyDetailResponse, PropertySearchParams } from '@/types/property'
import { api } from './api'

// Toggle ini untuk switch antara mock data dan real API
export const USE_MOCK_DATA = true // Set true untuk testing dengan dummy data

/**
 * Mock delay untuk simulate network latency
 */
const mockDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Search Properties - dengan mock data atau real API
 */
export async function searchProperties(params: PropertySearchParams): Promise<PropertySearchResponse> {
  const getMockData = async () => {
    // Simulate network delay
    await mockDelay(800)
    
    console.log('🔧 [MOCK API] Search properties with params:', params)
    
    // Filter by category
    let filteredData = params.category 
      ? filterPropertiesByCategory(params.category)
      : dummyPropertySearchResults
    
    // Filter by city
    if (params.city) {
      filteredData = filteredData.filter(p => 
        p.city.toLowerCase().includes(params.city!.toLowerCase())
      )
    }
    
    // Filter by price
    if (params.minPrice) {
      filteredData = filteredData.filter(p => p.minPrice >= params.minPrice!)
    }
    if (params.maxPrice) {
      filteredData = filteredData.filter(p => p.minPrice <= params.maxPrice!)
    }
    
    // Sort
    if (params.sortBy) {
      switch (params.sortBy) {
        case 'price_asc':
          filteredData.sort((a, b) => a.minPrice - b.minPrice)
          break
        case 'price_desc':
          filteredData.sort((a, b) => b.minPrice - a.minPrice)
          break
        case 'rating_desc':
          filteredData.sort((a, b) => b.averageRating - a.averageRating)
          break
        case 'name_asc':
          filteredData.sort((a, b) => a.name.localeCompare(b.name))
          break
      }
    }
    
    return {
      data: filteredData,
      meta: {
        page: params.page || 1,
        limit: params.limit || 10,
        total: filteredData.length,
        totalPages: Math.ceil(filteredData.length / (params.limit || 10)),
        hasNext: false,
        hasPrev: false
      }
    }
  }

  if (USE_MOCK_DATA) {
    return getMockData()
  }
  
  // Try real API, fallback to mock if fails
  try {
    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, value.toString())
      }
    })
    
    return await api.get<PropertySearchResponse>(`/properties/search?${queryParams.toString()}`)
  } catch (error) {
    console.warn('⚠️ Backend API failed, falling back to mock data:', error)
    return getMockData()
  }
}

/**
 * Get Property Detail - dengan mock data atau real API
 */
export async function getPropertyDetail(id: string | number): Promise<PropertyDetailResponse> {
  const getMockData = async () => {
    // Simulate network delay
    await mockDelay(600)
    
    console.log('🔧 [MOCK API] Get property detail for ID:', id)
    
    let property
    
    // Try to get by slug first (if id is string and not a number)
    if (typeof id === 'string' && isNaN(parseInt(id))) {
      property = getPropertyBySlug(id)
    } else {
      // Get by numeric ID
      const propertyId = typeof id === 'string' ? parseInt(id) : id
      property = getPropertyById(propertyId)
    }
    
    if (!property) {
      throw new Error('Property not found')
    }
    
    return {
      property
    }
  }

  if (USE_MOCK_DATA) {
    return getMockData()
  }
  
  // Try real API, fallback to mock if fails
  try {
    return await api.get<PropertyDetailResponse>(`/properties/${id}`)
  } catch (error) {
    console.warn('⚠️ Backend API failed, falling back to mock data:', error)
    return getMockData()
  }
}

/**
 * Helper untuk check apakah sedang menggunakan mock data
 */
export function isMockMode(): boolean {
  return USE_MOCK_DATA
}

/**
 * Log status API mode
 */
export function logApiMode(): void {
  if (USE_MOCK_DATA) {
    console.log(
      '%c🔧 MOCK API MODE ACTIVE',
      'background: #FFA500; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;'
    )
    console.log('Using dummy data for testing. Set USE_MOCK_DATA=false in src/lib/mockApi.ts to use real backend.')
  } else {
    console.log(
      '%c✅ REAL API MODE',
      'background: #10B981; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;'
    )
    console.log('Using real backend API.')
  }
}

