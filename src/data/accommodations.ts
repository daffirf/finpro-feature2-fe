export interface RoomType {
  price: number;
}

export interface Accommodation {
  id: string;
  name: string;
  description: string;
  location: string;
  category: string;
  checkInDate: string; // ISO date
  checkOutDate: string; // ISO date
  createdAt: string; // ISO date
  roomTypes?: RoomType[];
  averageRating?: number;
  totalReviews?: number;
}

export const categories: string[] = [
  'All',
  'Hotel',
  'Villa',
  'Apartment',
  'Guest House',
];

export const dummyAccommodations: Accommodation[] = [
  {
    id: 'acc-1',
    name: 'PropertyRent City Hotel',
    description: 'Hotel nyaman di pusat kota dekat transportasi umum dan pusat perbelanjaan.',
    location: 'Jakarta',
    category: 'Hotel',
    checkInDate: '2025-01-01',
    checkOutDate: '2025-12-31',
    createdAt: '2025-01-01T00:00:00.000Z',
    roomTypes: [
      { price: 550000 },
      { price: 750000 },
    ],
    averageRating: 4.5,
    totalReviews: 128,
  },
  {
    id: 'acc-2',
    name: 'Seaside Villa PropertyRent',
    description: 'Villa tepi pantai dengan pemandangan laut dan kolam renang pribadi.',
    location: 'Bali',
    category: 'Villa',
    checkInDate: '2025-01-01',
    checkOutDate: '2025-12-31',
    createdAt: '2025-02-01T00:00:00.000Z',
    roomTypes: [
      { price: 1500000 },
      { price: 2500000 },
    ],
    averageRating: 4.8,
    totalReviews: 256,
  },
  {
    id: 'acc-3',
    name: 'Cozy Apartment PropertyRent',
    description: 'Apartemen modern dekat pusat bisnis, cocok untuk perjalanan dinas.',
    location: 'Bandung',
    category: 'Apartment',
    checkInDate: '2025-01-01',
    checkOutDate: '2025-12-31',
    createdAt: '2025-03-10T00:00:00.000Z',
    roomTypes: [
      { price: 450000 },
      { price: 650000 },
    ],
    averageRating: 4.3,
    totalReviews: 74,
  },
];


