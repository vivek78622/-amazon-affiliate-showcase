import { motion } from 'framer-motion';
import CategoryGrid from '@/components/CategoryGrid';

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black min-h-screen text-white"
    >
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-[60vh] bg-gradient-to-br from-black via-gray-900 to-[#00ff88]">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-5xl md:text-7xl font-extrabold text-center neon-text"
        >
          Discover the Future of Shopping
        </motion.h1>
        <motion.p
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
          className="mt-6 text-xl md:text-2xl text-center text-gray-300"
        >
          7 Categories. Infinite Possibilities.
        </motion.p>
      </section>

      {/* Animated Category Grid */}
      <CategoryGrid />

      {/* Featured Products Carousel Placeholder */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="bg-gray-900/80 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-400">[Carousel coming soon]</p>
        </div>
      </section>

      {/* Newsletter Signup Placeholder */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <div className="bg-gray-900/80 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-400 mb-4">Sign up for our newsletter to get the latest deals!</p>
          <div>[Newsletter Signup coming soon]</div>
        </div>
      </section>

      {/* Testimonials Placeholder */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="bg-gray-900/80 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-400">[Testimonials coming soon]</p>
        </div>
      </section>

      {/* Footer Placeholder */}
      <footer className="bg-gray-950 text-gray-400 py-12 px-4 text-center mt-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="text-lg font-semibold mb-2">&copy; {new Date().getFullYear()} Your Store. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">Twitter</a>
            <a href="#" className="hover:text-white transition">Facebook</a>
          </div>
        </motion.div>
      </footer>
    </motion.div>
  );
}
