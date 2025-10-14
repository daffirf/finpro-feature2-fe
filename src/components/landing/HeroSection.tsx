"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/Input";
import { Search } from "lucide-react";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function HeroSection({
  searchQuery,
  onSearchChange,
}: HeroSectionProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchQuery, onSearchChange]);

  // Update local state when prop changes
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold text-foreground animate-fade-in">
          Temukan Penginapan Terbaik
        </h1>
        <p className="text-lg md:text-xl mt-3 text-muted-foreground animate-slide-up">
          Harga terbaik, pilihan lengkap, ulasan terpercaya.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mt-8 animate-slide-up">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-primary" />
            <Input
              type="text"
              placeholder="Cari penginapan, lokasi, atau tipe akomodasi..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg bg-white text-gray-900 placeholder-gray-500 border rounded-xl shadow-sm focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all"
            />
          </div>
          <div className="flex justify-center gap-2 mt-3">
            <span className="text-xs text-muted-foreground">Populer:</span>
            <button className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground hover:opacity-90 transition" onClick={() => setLocalSearchQuery('Bali')}>
              Bali
            </button>
            <button className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground hover:opacity-90 transition" onClick={() => setLocalSearchQuery('Jakarta')}>
              Jakarta
            </button>
            <button className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground hover:opacity-90 transition" onClick={() => setLocalSearchQuery('Bandung')}>
              Bandung
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
