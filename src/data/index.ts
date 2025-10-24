/**
 * Centralized Data Exports
 */

// Properties
export {
  dummyPropertySearchResults,
  dummyPropertyDetail,
  mockPropertySearchResponse,
  filterPropertiesByCategory,
  getPropertyById,
} from './dummyProperties'

export type {
  PropertySearchResult,
  PropertyDetail,
  PropertySearchResponse,
  PropertyCategory,
  SortOption,
} from '@/types/property'

// Rooms
export {
  dummyRooms,
  getRoomsByPropertyId,
  getRoomById,
  getAvailableRooms,
} from './dummyRooms'

export type { RoomDetail } from './dummyRooms'

// Reviews
export {
  dummyReviews,
  getReviewsByPropertyId,
  getAverageRating,
  getReviewStats,
  getRecentReviews,
} from './dummyReviews'

export type { ReviewDetail } from './dummyReviews'

// Accommodations (legacy)
export { accommodations } from './accommodations'

