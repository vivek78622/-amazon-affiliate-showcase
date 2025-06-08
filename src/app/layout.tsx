import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Your Store Name - Best Amazon Deals",
    template: "%s | Your Store Name",
  },
  description: "Find the best deals on Amazon products, curated just for you. Save time and money with our handpicked selection.",
  keywords: ["Amazon deals", "product deals", "shopping", "affiliate", "discounts"],
  authors: [{ name: "Your Store Name" }],
  creator: "Your Store Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Your Store Name - Best Amazon Deals",
    description: "Find the best deals on Amazon products, curated just for you. Save time and money with our handpicked selection.",
    siteName: "Your Store Name",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Store Name - Best Amazon Deals",
    description: "Find the best deals on Amazon products, curated just for you. Save time and money with our handpicked selection.",
    creator: "@yourstore",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
