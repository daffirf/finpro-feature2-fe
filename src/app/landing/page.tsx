"use client";

import { useState } from "react";
import { dummyAccommodations, categories, Accommodation } from "@/data/accommodations";

// Components
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import AccommodationFilters from "@/components/landing/AccommodationFilter";
import AccommodationsSection from "@/components/landing/AccommodationsSection";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [priceRange, setPriceRange] = useState("Semua Harga");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("Terpopuler");

  const getLowestPrice = (roomTypes?: { price: number }[]) => {
    if (!roomTypes || roomTypes.length === 0) return 0;
    return Math.min(...roomTypes.map((room) => room.price));
  };

  // Filter penginapan berdasarkan pencarian dan kategori
  const filteredAccommodations = dummyAccommodations.filter((item: Accommodation) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;

    const matchesCheckIn = !checkInDate || item.checkInDate >= checkInDate;
    const matchesCheckOut = !checkOutDate || item.checkOutDate <= checkOutDate;
    const matchesDate = matchesCheckIn && matchesCheckOut;

    const lowestPrice = getLowestPrice(item.roomTypes);

    let matchesPrice = true;
    switch (priceRange) {
      case "Di bawah Rp 500.000":
        matchesPrice = lowestPrice < 500000;
        break;
      case "Rp 500.000 - Rp 1.000.000":
        matchesPrice = lowestPrice >= 500000 && lowestPrice <= 1000000;
        break;
      case "Rp 1.000.000 - Rp 2.000.000":
        matchesPrice = lowestPrice >= 1000000 && lowestPrice <= 2000000;
        break;
      case "Di atas Rp 2.000.000":
        matchesPrice = lowestPrice > 2000000;
        break;
      case "Semua Harga":
      default:
        matchesPrice = true;
    }

    const matchesLocation = !location || item.location.toLowerCase().includes(location.toLowerCase());

    return matchesSearch && matchesCategory && matchesDate && matchesPrice && matchesLocation;
  });

  // Urutkan penginapan
  const sortedAccommodations = [...filteredAccommodations].sort((a, b) => {
    switch (sortBy) {
      case "Terbaru":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "Harga: Termurah": {
        const priceA = getLowestPrice(a.roomTypes);
        const priceB = getLowestPrice(b.roomTypes);
        return priceA - priceB;
      }
      case "Harga: Termahal": {
        const priceA2 = getLowestPrice(a.roomTypes);
        const priceB2 = getLowestPrice(b.roomTypes);
        return priceB2 - priceA2;
      }
      case "Rating Tertinggi":
        return (b.averageRating || 0) - (a.averageRating || 0);
      case "Terpopuler":
      default:
        return (b.totalReviews || 0) - (a.totalReviews || 0);
    }
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <AccommodationFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        checkInDate={checkInDate}
        onCheckInDateChange={setCheckInDate}
        checkOutDate={checkOutDate}
        onCheckOutDateChange={setCheckOutDate}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        location={location}
        onLocationChange={setLocation}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />

      <AccommodationsSection accommodations={sortedAccommodations} selectedCategory={selectedCategory} />

      <Footer />
    </div>
  );
}
