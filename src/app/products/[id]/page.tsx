'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Star, Heart, ShoppingBag, ArrowLeft, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product-card";
import { Metadata } from "next";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { category: true },
  });

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

// Sample product data
const productData = {
  1: {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 199.99,
    originalPrice: 299.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2340',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=2340',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2340',
      'https://images.unsplash.com/photo-1558756520-22cfe5d38264?q=80&w=2340'
    ],
    category: 'gaming',
    rating: 4.8,
    reviews: 124,
    colors: ['Black', 'White', 'Rose Gold'],
    sizes: ['One Size'],
    description: 'Experience premium sound quality with these wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort design. Perfect for gaming, music, and calls.',
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Premium comfort design',
      'Bluetooth 5.0',
      'Built-in microphone',
      'Quick charge technology'
    ],
    specifications: {
      'Connectivity': 'Bluetooth 5.0',
      'Battery Life': '30 hours',
      'Charging Time': '2 hours',
      'Weight': '250g',
      'Driver Size': '40mm',
      'Frequency Response': '20Hz - 20kHz'
    },
    amazonLink: 'https://amazon.com/dp/B08N5WRWNW',
    affiliateId: 'flowerssaints-20'
  },
  2: {
    id: 2,
    name: 'Organic Skincare Set',
    price: 89.99,
    originalPrice: 129.99,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=2187',
      'https://images.unsplash.com/photo-1590439471364-192aa70c0b23?q=80&w=2187',
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2187',
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2187'
    ],
    category: 'skincare',
    rating: 4.9,
    reviews: 89,
    colors: ['Natural'],
    sizes: ['30ml', '50ml', '100ml'],
    description: 'Transform your skincare routine with this organic set. Made with natural ingredients, these products provide deep hydration, anti-aging benefits, and gentle care for all skin types.',
    features: [
      '100% Organic ingredients',
      'Suitable for all skin types',
      'Anti-aging properties',
      'Deep hydration',
      'Gentle formula',
      'Cruelty-free'
    ],
    specifications: {
      'Volume': '30ml each',
      'Ingredients': '100% Organic',
      'Skin Type': 'All types',
      'Shelf Life': '24 months',
      'Packaging': 'Glass bottles',
      'Certification': 'USDA Organic'
    },
    amazonLink: 'https://amazon.com/dp/B08N5WRWNW',
    affiliateId: 'flowerssaints-20'
  }
};

const reviews = [
  {
    id: 1,
    name: 'Sarah M.',
    rating: 5,
    date: '2024-01-15',
    comment: 'Absolutely love these headphones! The sound quality is incredible and they\'re so comfortable for long gaming sessions.',
    verified: true
  },
  {
    id: 2,
    name: 'Michael R.',
    rating: 4,
    date: '2024-01-10',
    comment: 'Great product overall. Battery life is impressive and the noise cancellation works well. Only giving 4 stars because the price is a bit high.',
    verified: true
  },
  {
    id: 3,
    name: 'Emma L.',
    rating: 5,
    date: '2024-01-08',
    comment: 'Perfect for my daily commute. The sound quality is amazing and they look stylish too!',
    verified: true
  }
];

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  
  const product = productData[id as keyof typeof productData];

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F8F8F4] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-playfair font-bold mb-4">Product Not Found</h1>
          <a href="/" className="text-[#666] hover:text-black transition-colors">
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  const handleAmazonRedirect = () => {
    const affiliateUrl = `${product.amazonLink}?tag=${product.affiliateId}`;
    window.open(affiliateUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8F8F4] text-[#111111]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="text-2xl font-playfair font-bold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <a href="/">FLOWERS & SAINTS</a>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ShoppingBag className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <section className="pt-20 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-[#666]">
          <a href="/" className="hover:text-black transition-colors">Home</a>
          <span>/</span>
          <a href={`/category/${product.category}`} className="hover:text-black transition-colors capitalize">
            {product.category.replace('-', ' ')}
          </a>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </div>
      </section>

      {/* Product Details */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'power3.out' }}
          >
            <div className="aspect-square rounded-lg overflow-hidden mb-4">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-black' : 'border-[#E0E0E0]'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'power3.out' }}
          >
            <h1 className="text-3xl md:text-4xl font-playfair font-bold mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-[#666] ml-2">{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold">${product.price}</span>
              <span className="text-xl text-[#666] line-through">${product.originalPrice}</span>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            </div>

            {/* Description */}
            <p className="text-lg mb-8 leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            {product.colors.length > 1 && (
              <div className="mb-6">
                <h3 className="font-medium mb-3">Color</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        selectedColor === color ? 'border-black bg-black text-white' : 'border-[#E0E0E0] hover:border-black'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes.length > 1 && (
              <div className="mb-6">
                <h3 className="font-medium mb-3">Size</h3>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg transition-colors ${
                        selectedSize === size ? 'border-black bg-black text-white' : 'border-[#E0E0E0] hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-[#E0E0E0] rounded flex items-center justify-center hover:border-black transition-colors"
                >
                  -
                </button>
                <span className="w-16 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-[#E0E0E0] rounded flex items-center justify-center hover:border-black transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleAmazonRedirect}
                className="flex-1 bg-black text-white py-4 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                View on Amazon
              </button>
              <button className="px-6 py-4 border border-black rounded-lg font-medium hover:bg-black hover:text-white transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="px-6 py-4 border border-black rounded-lg font-medium hover:bg-black hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="font-medium mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-[#E0E0E0]">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Secure Payment</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Easy Returns</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Specifications */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'power3.out' }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-20"
        >
          <h2 className="text-2xl font-playfair font-bold mb-8">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-3 border-b border-[#E0E0E0]">
                <span className="font-medium">{key}</span>
                <span className="text-[#666]">{value}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Reviews */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'power3.out' }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-20"
        >
          <h2 className="text-2xl font-playfair font-bold mb-8">Customer Reviews</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-lg border border-[#E0E0E0]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="font-medium">{review.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{review.name}</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Verified Purchase</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-[#666]">{new Date(review.date).toLocaleDateString()}</span>
                </div>
                <p className="text-[#666] leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </section>
    </div>
  );
} 