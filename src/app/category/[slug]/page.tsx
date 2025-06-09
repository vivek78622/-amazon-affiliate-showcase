'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Filter, Grid, List, Star, Heart, ShoppingBag, ArrowLeft } from 'lucide-react';

// Sample product data for each category
const categoryProducts = {
  clothes: [
    {
      id: 1,
      name: 'Premium Cotton T-Shirt',
      price: 29.99,
      originalPrice: 49.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2187',
      rating: 4.8,
      reviews: 156,
      colors: ['Black', 'White', 'Navy'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 2,
      name: 'Designer Denim Jacket',
      price: 89.99,
      originalPrice: 129.99,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=2187',
      rating: 4.9,
      reviews: 89,
      colors: ['Blue', 'Black'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 3,
      name: 'Casual Linen Shirt',
      price: 59.99,
      originalPrice: 79.99,
      image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=2187',
      rating: 4.7,
      reviews: 234,
      colors: ['Beige', 'White', 'Light Blue'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 4,
      name: 'Wool Blend Sweater',
      price: 79.99,
      originalPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=2187',
      rating: 4.6,
      reviews: 178,
      colors: ['Gray', 'Navy', 'Burgundy'],
      sizes: ['S', 'M', 'L', 'XL']
    }
  ],
  shoes: [
    {
      id: 1,
      name: 'Leather Sneakers',
      price: 89.99,
      originalPrice: 129.99,
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=2187',
      rating: 4.8,
      reviews: 245,
      colors: ['White', 'Black', 'Brown'],
      sizes: ['7', '8', '9', '10', '11']
    },
    {
      id: 2,
      name: 'Running Shoes',
      price: 119.99,
      originalPrice: 159.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2187',
      rating: 4.9,
      reviews: 189,
      colors: ['Blue', 'Red', 'Black'],
      sizes: ['7', '8', '9', '10', '11']
    }
  ],
  'pet-products': [
    {
      id: 1,
      name: 'Designer Pet Bed',
      price: 79.99,
      originalPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2187',
      rating: 4.8,
      reviews: 67,
      colors: ['Gray', 'Beige', 'Navy'],
      sizes: ['Small', 'Medium', 'Large']
    },
    {
      id: 2,
      name: 'Premium Pet Food Bowl',
      price: 29.99,
      originalPrice: 49.99,
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2187',
      rating: 4.7,
      reviews: 89,
      colors: ['Stainless Steel', 'Ceramic'],
      sizes: ['Small', 'Medium', 'Large']
    }
  ],
  skincare: [
    {
      id: 1,
      name: 'Organic Skincare Set',
      price: 89.99,
      originalPrice: 129.99,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=2187',
      rating: 4.9,
      reviews: 89,
      colors: ['Natural'],
      sizes: ['30ml', '50ml', '100ml']
    },
    {
      id: 2,
      name: 'Vitamin C Serum',
      price: 49.99,
      originalPrice: 69.99,
      image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b23?q=80&w=2187',
      rating: 4.8,
      reviews: 156,
      colors: ['Clear'],
      sizes: ['30ml', '50ml']
    }
  ],
  gaming: [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 199.99,
      originalPrice: 299.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2340',
      rating: 4.8,
      reviews: 124,
      colors: ['Black', 'White'],
      sizes: ['One Size']
    },
    {
      id: 2,
      name: 'Gaming Mouse',
      price: 79.99,
      originalPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?q=80&w=2340',
      rating: 4.7,
      reviews: 89,
      colors: ['Black', 'RGB'],
      sizes: ['One Size']
    }
  ],
  fitness: [
    {
      id: 1,
      name: 'Smart Fitness Tracker',
      price: 149.99,
      originalPrice: 199.99,
      image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?q=80&w=2187',
      rating: 4.7,
      reviews: 156,
      colors: ['Black', 'Rose Gold'],
      sizes: ['Small', 'Large']
    },
    {
      id: 2,
      name: 'Yoga Mat',
      price: 39.99,
      originalPrice: 59.99,
      image: 'https://images.unsplash.com/photo-1547919307-1ec672c80e3d?q=80&w=2187',
      rating: 4.6,
      reviews: 234,
      colors: ['Purple', 'Blue', 'Green'],
      sizes: ['Standard', 'Extra Long']
    }
  ],
  'home-devices': [
    {
      id: 1,
      name: 'Smart Speaker',
      price: 129.99,
      originalPrice: 179.99,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2340',
      rating: 4.8,
      reviews: 189,
      colors: ['White', 'Black'],
      sizes: ['One Size']
    },
    {
      id: 2,
      name: 'Smart Light Bulb Set',
      price: 49.99,
      originalPrice: 79.99,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2187',
      rating: 4.7,
      reviews: 145,
      colors: ['White', 'Color'],
      sizes: ['Pack of 4']
    }
  ]
};

const categoryInfo = {
  clothes: {
    name: 'Clothes',
    description: 'Curated fashion essentials for every occasion',
    heroImage: 'https://images.unsplash.com/photo-1598554747476-32d034c5028d?q=80&w=2187'
  },
  shoes: {
    name: 'Shoes',
    description: 'Footwear that combines style and comfort',
    heroImage: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=2187'
  },
  'pet-products': {
    name: 'Pet Products',
    description: 'Premium care essentials for your beloved pets',
    heroImage: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?q=80&w=2187'
  },
  skincare: {
    name: 'Skincare',
    description: 'Natural beauty solutions for radiant skin',
    heroImage: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b23?q=80&w=2187'
  },
  gaming: {
    name: 'Gaming Accessories',
    description: 'Enhance your gaming experience with premium gear',
    heroImage: 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?q=80&w=2340'
  },
  fitness: {
    name: 'Fitness Products',
    description: 'Achieve your fitness goals with quality equipment',
    heroImage: 'https://images.unsplash.com/photo-1547919307-1ec672c80e3d?q=80&w=2187'
  },
  'home-devices': {
    name: 'Home Devices',
    description: 'Smart technology to elevate your living space',
    heroImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2340'
  }
};

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);
  
  const category = categoryInfo[slug as keyof typeof categoryInfo];
  const products = categoryProducts[slug as keyof typeof categoryProducts] || [];

  if (!category) {
    return (
      <div className="min-h-screen bg-[#F8F8F4] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-playfair font-bold mb-4">Category Not Found</h1>
          <a href="/" className="text-[#666] hover:text-black transition-colors">
            Return to Home
          </a>
        </div>
      </div>
    );
  }

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

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center text-center text-white overflow-hidden mt-16">
        <div className="absolute inset-0">
          <img 
            src={category.heroImage}
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <motion.div 
          className="relative z-10 px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'power3.out' }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-playfair font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'power3.out' }}
          >
            {category.name}
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: 'power3.out' }}
          >
            {category.description}
          </motion.p>
        </motion.div>
      </section>

      {/* Filter and Sort Bar */}
      <section className="py-6 border-b border-[#E0E0E0] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-[#E0E0E0] rounded hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <span className="text-[#666]">{products.length} products</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-[#E0E0E0] rounded focus:outline-none focus:border-black"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className={`grid gap-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className={`group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${
                viewMode === 'list' ? 'flex' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: 'power3.out' }}
              viewport={{ once: true, margin: '-100px' }}
              whileHover={{ y: -5 }}
            >
              <div className={`relative overflow-hidden ${
                viewMode === 'list' ? 'w-48 h-48' : 'aspect-square'
              }`}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                />
                <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-4 bg-white/90 px-2 py-1 rounded text-sm font-medium">
                  {product.colors[0]}
                </div>
              </div>
              
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <h3 className="font-medium mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-[#666] ml-2">({product.reviews})</span>
                </div>
                
                {viewMode === 'list' && (
                  <div className="mb-4">
                    <p className="text-sm text-[#666] mb-2">
                      Colors: {product.colors.join(', ')}
                    </p>
                    <p className="text-sm text-[#666]">
                      Sizes: {product.sizes.join(', ')}
                    </p>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">${product.price}</span>
                    <span className="text-sm text-[#666] line-through">${product.originalPrice}</span>
                  </div>
                  <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
                    View Deal
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#EDECE7]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'power3.out' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-lg mb-8 text-[#666] max-w-2xl mx-auto">
              Subscribe to get notified about new arrivals and exclusive deals in {category.name.toLowerCase()}.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-[#E0E0E0] rounded focus:outline-none focus:border-black"
              />
              <button 
                type="submit" 
                className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 