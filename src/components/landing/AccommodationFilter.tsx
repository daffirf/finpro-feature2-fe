"use client";

import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Input } from "@/components/Input";
import { Filter, ChevronDown } from "lucide-react";

interface AccommodationFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  checkInDate: string;
  onCheckInDateChange: (date: string) => void;
  checkOutDate: string;
  onCheckOutDateChange: (date: string) => void;
  priceRange: string;
  onPriceRangeChange: (price: string) => void;
  location: string;
  onLocationChange: (location: string) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
}

export default function AccommodationFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  showFilters,
  onToggleFilters,
  checkInDate,
  onCheckInDateChange,
  checkOutDate,
  onCheckOutDateChange,
  priceRange,
  onPriceRangeChange,
  location,
  onLocationChange,
  sortBy,
  onSortByChange,
}: AccommodationFiltersProps) {
  return (
    <section className="bg-white py-6 border-b sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "info" : "default"}
                className={`cursor-pointer transition-colors active:scale-[0.98] ${
                  selectedCategory === category
                    ? ""
                    : "hover:bg-gray-200"
                }`}
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Filter Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleFilters}
            className="flex items-center gap-2 hover:bg-gray-100"
          >
            <Filter className="w-4 h-4" />
            Filter
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Check-in */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-in
                </label>
                <Input
                  type="date"
                  className="w-full"
                  value={checkInDate}
                  onChange={(e) => onCheckInDateChange(e.target.value)}
                />
              </div>

              {/* Check-out */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-out
                </label>
                <Input
                  type="date"
                  className="w-full"
                  value={checkOutDate}
                  onChange={(e) => onCheckOutDateChange(e.target.value)}
                />
              </div>

              {/* Price range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Harga per Malam
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={priceRange}
                  onChange={(e) => onPriceRangeChange(e.target.value)}
                >
                  <option>Semua Harga</option>
                  <option>Di bawah Rp 500.000</option>
                  <option>Rp 500.000 - Rp 1.000.000</option>
                  <option>Rp 1.000.000 - Rp 2.000.000</option>
                  <option>Di atas Rp 2.000.000</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lokasi
                </label>
                <Input
                  placeholder="Masukkan lokasi penginapan"
                  className="w-full"
                  value={location}
                  onChange={(e) => onLocationChange(e.target.value)}
                />
              </div>

              {/* Sort by */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Urutkan Berdasarkan
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={sortBy}
                  onChange={(e) => onSortByChange(e.target.value)}
                >
                  <option>Terpopuler</option>
                  <option>Terbaru</option>
                  <option>Harga: Termurah</option>
                  <option>Harga: Termahal</option>
                  <option>Rating Tertinggi</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
