import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { SearchBar } from '@/components/SearchBar'
import { Features } from '@/components/Features'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <SearchBar />
        <Features />
      </main>
      <Footer />
    </div>
  )
}
