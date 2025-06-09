import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Flowers & Saints - Curated Living Essentials",
    template: "%s | Flowers & Saints",
  },
  description: "Discover thoughtfully selected products that elevate your everyday life. Shop curated collections of clothes, shoes, pet products, skincare, gaming accessories, fitness products, and home devices.",
  keywords: ["curated living", "lifestyle products", "fashion", "home decor", "skincare", "fitness", "gaming", "pet products", "shoes", "clothes"],
  authors: [{ name: "Flowers & Saints" }],
  creator: "Flowers & Saints",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Flowers & Saints - Curated Living Essentials",
    description: "Discover thoughtfully selected products that elevate your everyday life. Shop curated collections of clothes, shoes, pet products, skincare, gaming accessories, fitness products, and home devices.",
    siteName: "Flowers & Saints",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Flowers & Saints - Curated Living",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flowers & Saints - Curated Living Essentials",
    description: "Discover thoughtfully selected products that elevate your everyday life.",
    creator: "@flowersandsaints",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              background: '#F8F8F4',
              color: '#111111',
              border: '1px solid #E0E0E0',
            },
          }}
        />
      </body>
    </html>
  );
}
