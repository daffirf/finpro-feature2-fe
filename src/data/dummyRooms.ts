export interface RoomDetail {
  id: number
  propertyId: number
  name: string
  description: string
  capacity: number
  basePrice: number
  weekendPrice?: number
  totalUnits: number
  availableUnits: number
  amenities: string[]
  images: {
    id: number
    url: string
    altText?: string
  }[]
  size?: string // in m²
  bedType: string
}

export const dummyRooms: RoomDetail[] = [
  // Property 1: Luxury Beach Villa Seminyak
  {
    id: 1,
    propertyId: 1,
    name: "Master Suite with Ocean View",
    description: "Kamar utama dengan king bed, balcony private menghadap ke laut, walk-in closet, dan en-suite bathroom dengan bathtub dan rain shower. AC, Smart TV 55\", mini bar, dan safe box.",
    capacity: 2,
    basePrice: 3500000,
    weekendPrice: 4200000,
    totalUnits: 1,
    availableUnits: 0,
    size: "45m²",
    bedType: "1 King Bed",
    amenities: [
      "Ocean View",
      "Private Balcony",
      "King Bed",
      "Walk-in Closet",
      "Bathtub & Rain Shower",
      "Smart TV 55\"",
      "Mini Bar",
      "Safe Box",
      "AC",
      "WiFi"
    ],
    images: [
      {
        id: 101,
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop",
        altText: "Master Suite Bedroom"
      },
      {
        id: 102,
        url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&auto=format&fit=crop",
        altText: "Master Bathroom"
      },
      {
        id: 103,
        url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop",
        altText: "Ocean View from Balcony"
      }
    ]
  },
  {
    id: 2,
    propertyId: 1,
    name: "Deluxe Garden Room",
    description: "Kamar nyaman dengan queen bed, garden view, AC, Smart TV 43\", mini fridge, dan en-suite bathroom dengan shower. Perfect untuk couples atau solo travelers.",
    capacity: 2,
    basePrice: 2500000,
    weekendPrice: 3000000,
    totalUnits: 3,
    availableUnits: 2,
    size: "32m²",
    bedType: "1 Queen Bed",
    amenities: [
      "Garden View",
      "Queen Bed",
      "Rain Shower",
      "Smart TV 43\"",
      "Mini Fridge",
      "AC",
      "WiFi",
      "Work Desk"
    ],
    images: [
      {
        id: 104,
        url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&auto=format&fit=crop",
        altText: "Deluxe Room"
      }
    ]
  },
  {
    id: 3,
    propertyId: 1,
    name: "Family Suite 2 Bedrooms",
    description: "Suite luas dengan 2 kamar tidur (1 king bed + 2 single beds), living room, kitchenette, dan 2 bathrooms. Ideal untuk keluarga dengan anak-anak.",
    capacity: 4,
    basePrice: 4500000,
    weekendPrice: 5400000,
    totalUnits: 1,
    availableUnits: 1,
    size: "68m²",
    bedType: "1 King + 2 Single Beds",
    amenities: [
      "2 Bedrooms",
      "Living Room",
      "Kitchenette",
      "2 Bathrooms",
      "Smart TV 55\"",
      "Dining Table",
      "Washing Machine",
      "AC",
      "WiFi"
    ],
    images: [
      {
        id: 105,
        url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop",
        altText: "Family Suite"
      }
    ]
  },

  // Property 2: Modern Family House Jakarta
  {
    id: 4,
    propertyId: 2,
    name: "Master Bedroom",
    description: "Kamar utama dengan king bed, private bathroom dengan bathtub, walk-in closet, dan balcony. Modern minimalist design dengan view taman.",
    capacity: 2,
    basePrice: 2000000,
    weekendPrice: 2400000,
    totalUnits: 1,
    availableUnits: 1,
    size: "38m²",
    bedType: "1 King Bed",
    amenities: [
      "King Bed",
      "Private Bathroom",
      "Bathtub",
      "Walk-in Closet",
      "Balcony",
      "Smart TV 50\"",
      "AC",
      "WiFi"
    ],
    images: [
      {
        id: 106,
        url: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&auto=format&fit=crop",
        altText: "Master Bedroom"
      }
    ]
  },
  {
    id: 5,
    propertyId: 2,
    name: "Standard Room",
    description: "Kamar dengan queen bed, shared bathroom, AC, dan TV. Clean dan comfortable untuk single atau couple travelers.",
    capacity: 2,
    basePrice: 1500000,
    weekendPrice: 1800000,
    totalUnits: 2,
    availableUnits: 2,
    size: "25m²",
    bedType: "1 Queen Bed",
    amenities: [
      "Queen Bed",
      "Shared Bathroom",
      "TV 40\"",
      "AC",
      "WiFi",
      "Wardrobe"
    ],
    images: [
      {
        id: 107,
        url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop",
        altText: "Standard Room"
      }
    ]
  },

  // Property 3: Sky View Apartment Surabaya
  {
    id: 7,
    propertyId: 3,
    name: "Studio 35m²",
    description: "Studio apartment dengan city view, queen bed, kitchenette, dan bathroom. Perfect untuk business travelers dan digital nomads.",
    capacity: 2,
    basePrice: 800000,
    weekendPrice: 960000,
    totalUnits: 5,
    availableUnits: 3,
    size: "35m²",
    bedType: "1 Queen Bed",
    amenities: [
      "City View",
      "Queen Bed",
      "Kitchenette",
      "Bathroom",
      "Smart TV 43\"",
      "Work Desk",
      "AC",
      "WiFi",
      "Access to Pool & Gym"
    ],
    images: [
      {
        id: 108,
        url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
        altText: "Studio Apartment"
      }
    ]
  },
  {
    id: 8,
    propertyId: 3,
    name: "2BR 55m²",
    description: "2 bedroom apartment dengan living room, kitchen lengkap, dan 2 bathrooms. Ideal untuk families atau group travelers.",
    capacity: 4,
    basePrice: 1200000,
    weekendPrice: 1440000,
    totalUnits: 3,
    availableUnits: 2,
    size: "55m²",
    bedType: "2 Queen Beds",
    amenities: [
      "2 Bedrooms",
      "Living Room",
      "Full Kitchen",
      "2 Bathrooms",
      "Smart TV 50\"",
      "Dining Table",
      "Balcony",
      "AC",
      "WiFi",
      "Access to Pool & Gym"
    ],
    images: [
      {
        id: 109,
        url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop",
        altText: "2BR Apartment"
      }
    ]
  },

  // Property 4: Cozy Mountain Guest House
  {
    id: 9,
    propertyId: 4,
    name: "Mountain View Room",
    description: "Kamar dengan pemandangan pegunungan yang indah. Queen bed, private bathroom, dan balcony untuk menikmati udara segar pegunungan.",
    capacity: 2,
    basePrice: 650000,
    weekendPrice: 780000,
    totalUnits: 4,
    availableUnits: 3,
    size: "28m²",
    bedType: "1 Queen Bed",
    amenities: [
      "Mountain View",
      "Queen Bed",
      "Private Bathroom",
      "Balcony",
      "TV 40\"",
      "Hot Water",
      "WiFi",
      "Heater"
    ],
    images: [
      {
        id: 110,
        url: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=800&auto=format&fit=crop",
        altText: "Mountain View Room"
      }
    ]
  },
  {
    id: 10,
    propertyId: 4,
    name: "Garden View Room",
    description: "Kamar cozy dengan view taman yang asri. Double bed, shared bathroom, dan akses ke common area dengan fireplace.",
    capacity: 2,
    basePrice: 500000,
    weekendPrice: 600000,
    totalUnits: 2,
    availableUnits: 1,
    size: "22m²",
    bedType: "1 Double Bed",
    amenities: [
      "Garden View",
      "Double Bed",
      "Shared Bathroom",
      "TV 32\"",
      "Hot Water",
      "WiFi",
      "Common Area Access"
    ],
    images: [
      {
        id: 111,
        url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop",
        altText: "Garden View Room"
      }
    ]
  }
]

// Helper function to get rooms by property ID
export function getRoomsByPropertyId(propertyId: number): RoomDetail[] {
  return dummyRooms.filter(room => room.propertyId === propertyId)
}

// Helper function to get room by ID
export function getRoomById(roomId: number): RoomDetail | undefined {
  return dummyRooms.find(room => room.id === roomId)
}

// Helper function to get available rooms
export function getAvailableRooms(propertyId?: number): RoomDetail[] {
  const rooms = propertyId 
    ? getRoomsByPropertyId(propertyId)
    : dummyRooms
  
  return rooms.filter(room => room.availableUnits > 0)
}

