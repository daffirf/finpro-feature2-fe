import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold">PropertyRent</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Platform terbaik untuk mencari dan membandingkan penginapan dengan harga dinamis
              berdasarkan tanggal dan hari libur.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
                <span className="text-xs">X</span>
              </div>
              <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
                <span className="text-xs">X</span>
              </div>
              <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-xs">P</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Beranda</Link></li>
              <li><Link href="/search" className="text-gray-400 hover:text-white transition-colors">Cari Penginapan</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Kontak</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Bantuan</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">Pusat Bantuan</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Syarat & Ketentuan</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Kebijakan Privasi</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 PropertyRent. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}
  