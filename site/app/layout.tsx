import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Veri Bilimi Maaşlarının Gizli Matematiği | Hasan Can Karadağ",
  description: "Kıdem mi, coğrafya mı, yoksa unvan mı daha değerli? 2020-2024 veri bilimi maaş trendleri üzerinden interaktif bir hikaye.",
  openGraph: {
    title: "Veri Bilimi Maaşlarının Gizli Matematiği",
    description: "Kıdem mi, coğrafya mı, yoksa unvan mı daha değerli? 2020-2024 veri bilimi maaş trendleri üzerinden interaktif bir hikaye.",
    url: "https://hsnckrdg-data-salaries.vercel.app",
    siteName: "Hasan Can Karadağ Portfolyo",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 627,
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}