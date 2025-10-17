import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PropertyRent - Platform Sewa Penginapan Terbaik",
  description: "Temukan penginapan terbaik dengan harga dinamis berdasarkan tanggal dan hari libur. Bandingkan harga dan dapatkan penawaran terbaik untuk liburan Anda.",
  keywords: "sewa penginapan, hotel, villa, homestay, booking, harga dinamis",
  authors: [{ name: "PropertyRent Team" }],
  openGraph: {
    title: "PropertyRent - Platform Sewa Penginapan Terbaik",
    description: "Temukan penginapan terbaik dengan harga dinamis berdasarkan tanggal dan hari libur.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}