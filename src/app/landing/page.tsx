"use client";

import { dummyPropertySearchResults } from "@/data/dummyProperties";

// Components
import Header from "@/components/landing/Header";
import SearchHero from "@/components/landing/SearchHero";
import FeaturedProperties from "@/components/landing/FeaturedProperties";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section with Search */}
      <SearchHero />

      {/* Featured Properties Section */}
      <FeaturedProperties properties={dummyPropertySearchResults} />

      {/* Features Section */}
      <Features />

      <Footer />
    </div>
  );
}
