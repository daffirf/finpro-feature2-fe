import type { Metadata } from "next";
import "./globals.css";
import { suppressHydrationWarning } from "react";

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
    <html lang="id">
      <body className="antialiased" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}