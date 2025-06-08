"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  amazonLink: string;
  affiliateId: string;
}

export function ProductCard({
  id,
  title,
  description,
  image,
  price,
  amazonLink,
  affiliateId,
}: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      // Track the click
      await fetch("/api/track-click", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
        }),
      });

      // Construct the affiliate link
      const affiliateUrl = new URL(amazonLink);
      affiliateUrl.searchParams.set("tag", affiliateId);
      
      // Open in new tab
      window.open(affiliateUrl.toString(), "_blank");
    } catch (error) {
      console.error("Failed to track click:", error);
      // Still open the link even if tracking fails
      window.open(amazonLink, "_blank");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            ${price.toFixed(2)}
          </span>
          <Button
            onClick={handleClick}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                View on Amazon
                <ExternalLink className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
} 