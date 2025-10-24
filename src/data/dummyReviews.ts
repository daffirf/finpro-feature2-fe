/**
 * Dummy Review Data
 * Synchronized with dummyProperties.ts
 */

export interface ReviewDetail {
  id: number
  propertyId: number
  rating: number // 1-5
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

export const dummyReviews: ReviewDetail[] = [
  // Reviews for Property 1: Luxury Beach Villa Seminyak
  {
    id: 1,
    propertyId: 1,
    rating: 5,
    comment: "Absolutely amazing villa! The location is perfect, just steps away from the beach. The pool area is stunning and we loved having breakfast by the pool every morning. Staff was incredibly helpful and friendly. Will definitely come back!",
    createdAt: "2024-10-15T10:30:00Z",
    user: {
      id: 201,
      name: "Sarah Johnson",
      avatarUrl: "https://i.pravatar.cc/150?img=1"
    },
    reply: {
      id: 1001,
      content: "Thank you so much for your wonderful review, Sarah! We're thrilled to hear you enjoyed your stay. We look forward to welcoming you back soon! 🙏",
      createdAt: "2024-10-16T09:00:00Z",
      tenant: {
        id: 101,
        name: "Bali Luxury Villas Management",
        avatarUrl: "https://i.pravatar.cc/150?img=50"
      }
    }
  },
  {
    id: 2,
    propertyId: 1,
    rating: 5,
    comment: "Perfect honeymoon destination! The villa exceeded all our expectations. Everything was spotless, beautifully decorated, and the amenities were top-notch. The sunset views from the pool are breathtaking. Highly recommended!",
    createdAt: "2024-10-10T14:20:00Z",
    user: {
      id: 202,
      name: "Michael Chen",
      avatarUrl: "https://i.pravatar.cc/150?img=12"
    },
    reply: {
      id: 1002,
      content: "Congratulations on your honeymoon! We're so happy we could be part of your special celebration. Thank you for choosing our villa! ❤️",
      createdAt: "2024-10-11T08:30:00Z",
      tenant: {
        id: 101,
        name: "Bali Luxury Villas Management",
        avatarUrl: "https://i.pravatar.cc/150?img=50"
      }
    }
  },
  {
    id: 3,
    propertyId: 1,
    rating: 4,
    comment: "Great villa with excellent facilities. The rooms are spacious and comfortable. Only minor issue was the WiFi was a bit slow in some areas, but overall a wonderful experience. Great value for money!",
    createdAt: "2024-10-05T16:45:00Z",
    user: {
      id: 203,
      name: "Amanda Rodriguez",
      avatarUrl: "https://i.pravatar.cc/150?img=5"
    },
    reply: {
      id: 1003,
      content: "Thank you for your feedback, Amanda! We're glad you enjoyed your stay. We've noted your comment about the WiFi and are currently upgrading our internet infrastructure. We hope to see you again soon!",
      createdAt: "2024-10-06T10:15:00Z",
      tenant: {
        id: 101,
        name: "Bali Luxury Villas Management",
        avatarUrl: "https://i.pravatar.cc/150?img=50"
      }
    }
  },
  {
    id: 4,
    propertyId: 1,
    rating: 5,
    comment: "Best villa we've stayed at in Bali! The private pool is amazing, and the location can't be beat. Walking distance to great restaurants and beach clubs. The staff went above and beyond to make our stay special.",
    createdAt: "2024-09-28T11:00:00Z",
    user: {
      id: 204,
      name: "David Thompson",
      avatarUrl: "https://i.pravatar.cc/150?img=15"
    },
    reply: null
  },
  {
    id: 5,
    propertyId: 1,
    rating: 5,
    comment: "Stayed here for a week with my family and we had an incredible time. The kids loved the pool, and we adults enjoyed the tranquil atmosphere. Very clean, well-maintained, and the breakfast service was excellent!",
    createdAt: "2024-09-20T09:30:00Z",
    user: {
      id: 205,
      name: "Emily Wang",
      avatarUrl: "https://i.pravatar.cc/150?img=9"
    },
    reply: {
      id: 1004,
      content: "Thank you Emily! We're so happy your whole family enjoyed the villa. Hope to host you again in the future! 🌴",
      createdAt: "2024-09-21T08:00:00Z",
      tenant: {
        id: 101,
        name: "Bali Luxury Villas Management",
        avatarUrl: "https://i.pravatar.cc/150?img=50"
      }
    }
  },

  // Reviews for Property 2: Modern Family House Jakarta
  {
    id: 6,
    propertyId: 2,
    rating: 5,
    comment: "Perfect untuk keluarga! Rumahnya bersih, modern, dan lokasinya strategis. Dekat dengan mall dan supermarket. Anak-anak senang banget karena ada halaman untuk bermain. Host juga sangat responsif dan helpful!",
    createdAt: "2024-10-12T08:15:00Z",
    user: {
      id: 206,
      name: "Budi Santoso",
      avatarUrl: "https://i.pravatar.cc/150?img=33"
    },
    reply: {
      id: 1005,
      content: "Terima kasih Pak Budi! Senang mendengar keluarga Bapak menikmati tinggal di rumah kami. Ditunggu kunjungan berikutnya! 😊",
      createdAt: "2024-10-13T09:00:00Z",
      tenant: {
        id: 102,
        name: "Jakarta Property Rentals",
        avatarUrl: "https://i.pravatar.cc/150?img=51"
      }
    }
  },
  {
    id: 7,
    propertyId: 2,
    rating: 4,
    comment: "Rumah bagus dan nyaman. Kamarnya luas-luas. Cuma AC di kamar tamu agak kurang dingin. Overall recommended sih untuk yang cari rumah di Jakarta Selatan.",
    createdAt: "2024-09-28T14:30:00Z",
    user: {
      id: 207,
      name: "Rina Wijaya",
      avatarUrl: "https://i.pravatar.cc/150?img=44"
    },
    reply: {
      id: 1006,
      content: "Terima kasih Bu Rina atas reviewnya! Untuk AC sudah kami service dan ganti filter. Terima kasih atas masukan yang membangun!",
      createdAt: "2024-09-29T10:00:00Z",
      tenant: {
        id: 102,
        name: "Jakarta Property Rentals",
        avatarUrl: "https://i.pravatar.cc/150?img=51"
      }
    }
  },

  // Reviews for Property 3: Sky View Apartment Surabaya
  {
    id: 8,
    propertyId: 3,
    rating: 4,
    comment: "Apartemen bersih dan viewnya bagus! Fasilitasnya lengkap, ada gym dan kolam renang. Lokasi strategis di pusat kota. Cuma parkir agak terbatas kalau weekend. Tapi overall puas!",
    createdAt: "2024-10-08T16:20:00Z",
    user: {
      id: 208,
      name: "Andri Kurniawan",
      avatarUrl: "https://i.pravatar.cc/150?img=68"
    },
    reply: {
      id: 1007,
      content: "Terima kasih Mas Andri! Untuk parkir kami sudah koordinasi dengan building management untuk menambah slot parkir. Terima kasih sudah menginap! 🙏",
      createdAt: "2024-10-09T09:00:00Z",
      tenant: {
        id: 103,
        name: "Surabaya Apartments",
        avatarUrl: "https://i.pravatar.cc/150?img=52"
      }
    }
  },
  {
    id: 9,
    propertyId: 3,
    rating: 5,
    comment: "Best apartment in Surabaya! Very clean, modern, and the view is spectacular. Staff is professional and helpful. Will definitely stay here again on my next business trip!",
    createdAt: "2024-09-25T11:45:00Z",
    user: {
      id: 209,
      name: "James Wilson",
      avatarUrl: "https://i.pravatar.cc/150?img=14"
    },
    reply: null
  },

  // Reviews for Property 4: Cozy Mountain Guest House
  {
    id: 10,
    propertyId: 4,
    rating: 5,
    comment: "Tempatnya sejuk banget! Perfect untuk weekend getaway. View pegunungannya indah, udaranya segar. Ownernya ramah dan helpful. Sarapan juga enak! Highly recommended untuk yang mau refreshing dari hiruk pikuk kota.",
    createdAt: "2024-10-10T09:00:00Z",
    user: {
      id: 210,
      name: "Siti Nurhaliza",
      avatarUrl: "https://i.pravatar.cc/150?img=26"
    },
    reply: {
      id: 1008,
      content: "Terima kasih Bu Siti! Senang sekali mendengar Ibu menikmati suasana pegunungan di tempat kami. Ditunggu kunjungan berikutnya! 🏔️",
      createdAt: "2024-10-11T08:00:00Z",
      tenant: {
        id: 104,
        name: "Mountain Retreat Bandung",
        avatarUrl: "https://i.pravatar.cc/150?img=53"
      }
    }
  },
  {
    id: 11,
    propertyId: 4,
    rating: 5,
    comment: "Amazing place to disconnect and relax! The mountain view is breathtaking, especially at sunrise. The rooms are clean and cozy. The fireplace in the common area is a nice touch. Will come back!",
    createdAt: "2024-09-15T15:30:00Z",
    user: {
      id: 211,
      name: "Lisa Anderson",
      avatarUrl: "https://i.pravatar.cc/150?img=10"
    },
    reply: {
      id: 1009,
      content: "Thank you Lisa! We're so glad you enjoyed the mountain retreat experience. Looking forward to your next visit! 🌄",
      createdAt: "2024-09-16T09:00:00Z",
      tenant: {
        id: 104,
        name: "Mountain Retreat Bandung",
        avatarUrl: "https://i.pravatar.cc/150?img=53"
      }
    }
  },

  // Reviews for Property 5: Tropical Paradise Villa Ubud
  {
    id: 12,
    propertyId: 5,
    rating: 5,
    comment: "Heaven on earth! The rice field view is absolutely stunning. Perfect for yoga and meditation. The villa is beautifully designed with a perfect blend of traditional Balinese and modern comfort. Staff is wonderful!",
    createdAt: "2024-10-05T10:00:00Z",
    user: {
      id: 212,
      name: "Sophia Martinez",
      avatarUrl: "https://i.pravatar.cc/150?img=32"
    },
    reply: {
      id: 1010,
      content: "Namaste Sophia! Thank you for your lovely review. We're delighted you found peace and tranquility at our villa. Come back anytime! 🙏✨",
      createdAt: "2024-10-06T08:00:00Z",
      tenant: {
        id: 105,
        name: "Ubud Wellness Retreats",
        avatarUrl: "https://i.pravatar.cc/150?img=54"
      }
    }
  },

  // Reviews for Property 6: Downtown Business Apartment
  {
    id: 13,
    propertyId: 6,
    rating: 4,
    comment: "Excellent location for business travelers! Walking distance to my office. WiFi is super fast, perfect for remote work. The workspace in the room is well-designed. Only downside is the noise from the street, but earplugs helped.",
    createdAt: "2024-10-01T16:00:00Z",
    user: {
      id: 213,
      name: "Robert Kim",
      avatarUrl: "https://i.pravatar.cc/150?img=60"
    },
    reply: {
      id: 1011,
      content: "Thank you for your feedback, Robert! We're installing soundproof windows in all units starting next month. We appreciate your patience and look forward to hosting you again!",
      createdAt: "2024-10-02T09:00:00Z",
      tenant: {
        id: 106,
        name: "Jakarta Executive Suites",
        avatarUrl: "https://i.pravatar.cc/150?img=55"
      }
    }
  },

  // Reviews for Property 7: Sunset Beach House Canggu
  {
    id: 14,
    propertyId: 7,
    rating: 5,
    comment: "Perfect spot for surfers! Beach is literally 2 minutes walk. The sunset view from the rooftop is insane. House is spacious and clean. Great vibe, met cool people. 10/10 would stay again!",
    createdAt: "2024-09-22T18:30:00Z",
    user: {
      id: 214,
      name: "Jake Sullivan",
      avatarUrl: "https://i.pravatar.cc/150?img=11"
    },
    reply: null
  },

  // Reviews for Property 8: Urban Loft Apartment Yogyakarta
  {
    id: 15,
    propertyId: 8,
    rating: 4,
    comment: "Apartemennya keren! Design industrial-nya aesthetic banget. Lokasi super strategis, jalan kaki ke Malioboro. WiFi kenceng, cocok buat remote work. Harga juga affordable. Recommended!",
    createdAt: "2024-10-07T12:00:00Z",
    user: {
      id: 215,
      name: "Dimas Prasetyo",
      avatarUrl: "https://i.pravatar.cc/150?img=70"
    },
    reply: {
      id: 1012,
      content: "Makasih banyak Mas Dimas! Senang apartment kami cocok buat remote work. Ditunggu kunjungan berikutnya! 🙏",
      createdAt: "2024-10-08T08:00:00Z",
      tenant: {
        id: 108,
        name: "Yogya Urban Living",
        avatarUrl: "https://i.pravatar.cc/150?img=56"
      }
    }
  },

  // Reviews for Property 9: Heritage Guest House Solo
  {
    id: 16,
    propertyId: 9,
    rating: 5,
    comment: "Pengalaman menginap yang unik! Arsitektur Jawa klasiknya authentic banget tapi dengan kenyamanan modern. Ownernya ramah dan banyak cerita tentang sejarah Solo. Dekat Keraton dan kuliner Solo. Must try!",
    createdAt: "2024-09-18T14:00:00Z",
    user: {
      id: 216,
      name: "Fitri Handayani",
      avatarUrl: "https://i.pravatar.cc/150?img=47"
    },
    reply: {
      id: 1013,
      content: "Terima kasih Bu Fitri! Senang bisa berbagi cerita tentang budaya Solo. Monggo mampir lagi kapan-kapan! 😊",
      createdAt: "2024-09-19T08:00:00Z",
      tenant: {
        id: 109,
        name: "Solo Heritage Stays",
        avatarUrl: "https://i.pravatar.cc/150?img=57"
      }
    }
  },

  // Reviews for Property 10: Cliffside Villa Uluwatu
  {
    id: 17,
    propertyId: 10,
    rating: 5,
    comment: "Once in a lifetime experience! The cliff view is absolutely breathtaking. Watched the sunset from the infinity pool - pure magic! Butler service was impeccable. Worth every penny for a special occasion!",
    createdAt: "2024-09-10T19:00:00Z",
    user: {
      id: 217,
      name: "Alexandra Bennett",
      avatarUrl: "https://i.pravatar.cc/150?img=24"
    },
    reply: {
      id: 1014,
      content: "Thank you Alexandra! We're honored to have been part of your special celebration. Your happiness is our greatest reward! 🌅✨",
      createdAt: "2024-09-11T08:00:00Z",
      tenant: {
        id: 110,
        name: "Uluwatu Luxury Villas",
        avatarUrl: "https://i.pravatar.cc/150?img=58"
      }
    }
  }
]

// Helper function to get reviews by property ID
export function getReviewsByPropertyId(propertyId: number): ReviewDetail[] {
  return dummyReviews.filter(review => review.propertyId === propertyId)
}

// Helper function to calculate average rating for a property
export function getAverageRating(propertyId: number): number {
  const reviews = getReviewsByPropertyId(propertyId)
  if (reviews.length === 0) return 0
  
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
  return Number((sum / reviews.length).toFixed(1))
}

// Helper function to get review statistics
export function getReviewStats(propertyId: number) {
  const reviews = getReviewsByPropertyId(propertyId)
  
  const ratingCounts = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  }
  
  return {
    totalReviews: reviews.length,
    averageRating: getAverageRating(propertyId),
    ratingDistribution: ratingCounts
  }
}

// Helper function to get recent reviews
export function getRecentReviews(limit: number = 5): ReviewDetail[] {
  return [...dummyReviews]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
}

