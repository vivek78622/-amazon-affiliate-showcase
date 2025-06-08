import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/", // Disallow API routes
        "/admin/", // Disallow admin routes
        "/*.json$", // Disallow JSON files
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
} 