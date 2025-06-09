'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ArrowRight, Star, Heart, ShoppingBag } from 'lucide-react';

const categories = [
  { 
    name: 'Clothes', 
    slug: 'clothes',
    image: 'https://images.unsplash.com/photo-1598554747476-32d034c5028d?q=80&w=2187',
    alt: 'Woman in modern clothing',
    description: 'Curated fashion essentials'
  },
  { 
    name: 'Shoes', 
    slug: 'shoes',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=2187',
    alt: 'Stylish sneakers',
    description: 'Footwear for every occasion'
  },
  { 
    name: 'Pet Products', 
    slug: 'pet-products',
    image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?q=80&w=2187',
    alt: 'A happy dog',
    description: 'Premium pet care essentials'
  },
  { 
    name: 'Skincare', 
    slug: 'skincare',
    image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b23?q=80&w=2187',
    alt: 'Skincare bottles',
    description: 'Natural beauty solutions'
  },
  { 
    name: 'Gaming Accessories', 
    slug: 'gaming',
    image: 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?q=80&w=2340',
    alt: 'Gaming keyboard and mouse',
    description: 'Enhance your gaming experience'
  },
  { 
    name: 'Fitness Products', 
    slug: 'fitness',
    image: 'https://images.unsplash.com/photo-1547919307-1ec672c80e3d?q=80&w=2187',
    alt: 'Fitness equipment like dumbbells',
    description: 'Achieve your fitness goals'
  },
  { 
    name: 'Home Devices', 
    slug: 'home-devices',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2340',
    alt: 'A stylish modern sofa',
    description: 'Smart home technology'
  }
];

const featuredProducts = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 199.99,
    originalPrice: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2340',
    category: 'gaming',
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: 'Organic Skincare Set',
    price: 89.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=2187',
    category: 'skincare',
    rating: 4.9,
    reviews: 89
  },
  {
    id: 3,
    name: 'Smart Fitness Tracker',
    price: 149.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?q=80&w=2187',
    category: 'fitness',
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    name: 'Designer Pet Bed',
    price: 79.99,
    originalPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2187',
    category: 'pet-products',
    rating: 4.6,
    reviews: 67
  }
];

export default function HomePage() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Marquee animation
    if (marqueeRef.current) {
      const marquee = marqueeRef.current;
      const content = marquee.querySelector('.marquee-content') as HTMLElement;
      if (content) {
        const clone = content.cloneNode(true) as HTMLElement;
        clone.setAttribute('aria-hidden', 'true');
        marquee.appendChild(clone);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F8F4] text-[#111111] font-['Inter'] overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="text-2xl font-['Playfair_Display'] font-bold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              FLOWERS & SAINTS
            </motion.div>
            
            <nav className="hidden md:flex space-x-8">
              {categories.map((cat) => (
                <a 
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="text-sm font-medium hover:text-[#666] transition-colors"
                >
                  {cat.name}
                </a>
              ))}
            </nav>
            
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
      <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2340" 
            alt="Hero lifestyle shot"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <motion.div 
          className="relative z-10 px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'power3.out' }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-['Playfair_Display'] font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: 'power3.out' }}
          >
            Curated Living
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: 'power3.out' }}
          >
            Discover thoughtfully selected products that elevate your everyday life
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: 'power3.out' }}
          >
            <a 
              href="#collections"
              className="inline-block bg-white text-black px-8 py-4 font-medium border border-white transition-all duration-300 hover:bg-transparent hover:text-white"
            >
              Shop Collections
            </a>
            <a 
              href="#featured"
              className="inline-block border border-white text-white px-8 py-4 font-medium transition-all duration-300 hover:bg-white hover:text-black"
            >
              View Featured
            </a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: 'power3.out' }}
        >
          <ChevronDown className="w-6 h-6 text-white animate-bounce" />
        </motion.div>
      </section>

      {/* Marquee Section */}
      <section className="py-8 border-t border-b border-[#E0E0E0] overflow-hidden whitespace-nowrap bg-white">
        <div ref={marqueeRef} className="flex">
          <div className="font-['Playfair_Display'] text-xl md:text-2xl animate-marquee inline-block">
            {categories.map((cat, index) => (
              <span key={index} className="mx-8 font-light">{cat.name.toUpperCase()}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'power3.out' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold mb-4">Featured Products</h2>
          <p className="text-lg text-[#666] max-w-2xl mx-auto">Carefully selected items that combine quality, style, and functionality</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: 'power3.out' }}
              viewport={{ once: true, margin: '-100px' }}
              whileHover={{ y: -5 }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                />
                <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-4 bg-white/90 px-2 py-1 rounded text-sm font-medium">
                  {product.category}
                </div>
              </div>
              
              <div className="p-6">
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

      {/* Collections Grid */}
      <section id="collections" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'power3.out' }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold mb-4">Shop by Category</h2>
          <p className="text-lg text-[#666] max-w-2xl mx-auto">Explore our curated collections designed for modern living</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.a
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group relative overflow-hidden aspect-[4/5] block rounded-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: 'power3.out' }}
              viewport={{ once: true, margin: '-100px' }}
              whileHover={{ scale: 1.02 }}
            >
              <img 
                src={category.image} 
                alt={category.alt}
                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-xl md:text-2xl font-['Playfair_Display'] font-bold mb-2">
                  {category.name}
                </h3>
                <p className="text-white/80 text-sm mb-4">{category.description}</p>
                <div className="flex items-center text-white/90 group-hover:text-white transition-colors">
                  <span className="text-sm font-medium">Explore</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Content Split Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'power3.out' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <img 
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2340" 
              alt="A stylish modern sofa"
              className="w-full h-auto rounded-lg"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'power3.out' }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold mb-6">
              Elevate Your Space
            </h2>
            <p className="text-lg mb-8 leading-relaxed text-[#666]">
              Discover our collection of smart home devices designed to blend technology and style, 
              making your home more connected and beautiful. Each product is carefully selected to 
              enhance your living experience.
            </p>
            <a 
              href="/category/home-devices" 
              className="inline-flex items-center text-lg font-medium hover:underline group"
            >
              Shop Home Devices
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
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
            <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold mb-4">
              Stay Connected
            </h2>
            <p className="text-lg mb-8 text-[#666] max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive deals, new arrivals, and styling inspiration.
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

      {/* Footer */}
      <footer className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#E0E0E0] bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div>
              <h4 className="font-bold mb-6 text-lg">Shop Categories</h4>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <a href={`/category/${cat.slug}`} className="text-[#666] hover:text-black transition-colors">
                      {cat.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Information</h4>
              <ul className="space-y-3">
                <li><a href="/about" className="text-[#666] hover:text-black transition-colors">About Us</a></li>
                <li><a href="/contact" className="text-[#666] hover:text-black transition-colors">Contact</a></li>
                <li><a href="/faq" className="text-[#666] hover:text-black transition-colors">FAQ</a></li>
                <li><a href="/shipping" className="text-[#666] hover:text-black transition-colors">Shipping</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Follow</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-[#666] hover:text-black transition-colors">Instagram</a></li>
                <li><a href="#" className="text-[#666] hover:text-black transition-colors">Pinterest</a></li>
                <li><a href="#" className="text-[#666] hover:text-black transition-colors">X (Twitter)</a></li>
                <li><a href="#" className="text-[#666] hover:text-black transition-colors">YouTube</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Customer Service</h4>
              <ul className="space-y-3">
                <li><a href="/returns" className="text-[#666] hover:text-black transition-colors">Returns</a></li>
                <li><a href="/size-guide" className="text-[#666] hover:text-black transition-colors">Size Guide</a></li>
                <li><a href="/care-instructions" className="text-[#666] hover:text-black transition-colors">Care Instructions</a></li>
                <li><a href="/privacy" className="text-[#666] hover:text-black transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="text-center text-sm text-[#666] border-t border-[#E0E0E0] pt-8">
            <p>© 2024 Flowers & Saints. All rights reserved. Powered by Next.js.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
