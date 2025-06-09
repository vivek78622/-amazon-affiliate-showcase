import { motion } from 'framer-motion';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const displayName = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-black text-white"
    >
      {/* Animated Category Hero */}
      <section className="relative h-64 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-[#00ff88]">
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold neon-text"
        >
          {displayName}
        </motion.h2>
      </section>

      {/* Animated Filter Bar Placeholder */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 py-6"
      >
        <div className="bg-gray-900/80 rounded-lg p-4 flex items-center justify-between">
          <span className="text-lg font-semibold">[Filter Bar coming soon]</span>
          <span className="text-gray-400">Sort by: [Dropdown]</span>
        </div>
      </motion.div>

      {/* Animated Product Grid Placeholder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="max-w-7xl mx-auto px-4 py-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04, boxShadow: '0 0 24px #00ff88' }}
              className="rounded-xl bg-gray-900/80 p-6 flex flex-col items-center justify-center border border-gray-800 hover:border-white transition"
            >
              <span className="text-5xl mb-2">🛒</span>
              <span className="font-bold text-lg">Product {i + 1}</span>
              <span className="text-gray-400 mt-2">[Details coming soon]</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
} 