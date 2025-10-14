"use client";

import { Search } from "lucide-react";
import AccommodationCard from "./AccommodationCard";
import { Accommodation } from "@/data/accommodations";

interface AccommodationsSectionProps {
  accommodations: Accommodation[];
  selectedCategory: string;
}

export default function AccommodationsSection({
  accommodations,
  selectedCategory,
}: AccommodationsSectionProps) {
  return (
    <section className="py-12" id="accommodations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {selectedCategory === "All"
                ? "Semua Penginapan"
                : `${selectedCategory} Penginapan`}
            </h2>
            <p className="text-muted-foreground">
              {accommodations.length} penginapan ditemukan
            </p>
          </div>
        </div>

        {/* Accommodations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accommodations.map((item) => (
            <AccommodationCard key={item.id} accommodation={item} />
          ))}
        </div>

        {/* No Results */}
        {accommodations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Tidak ada penginapan ditemukan
            </h3>
            <p className="text-muted-foreground">
              Coba ubah filter atau pencarian Anda
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
