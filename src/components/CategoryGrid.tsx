import { motion } from 'framer-motion';

const categories = [
  { name: 'Clothes', icon: '👕', color: '#00ff88' },
  { name: 'Shoes', icon: '👟', color: '#ff6b6b' },
  { name: 'Pet Products', icon: '🐾', color: '#4ecdc4' },
  { name: 'Skincare', icon: '🧴', color: '#f3e8ff' },
  { name: 'Gaming Accessories', icon: '🎮', color: '#a3e635' },
  { name: 'Fitness Products', icon: '🏋️‍♂️', color: '#fbbf24' },
  { name: 'Home Devices', icon: '🏠', color: '#60a5fa' },
];

export default function CategoryGrid() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        {categories.map((cat) => (
          <motion.div
            key={cat.name}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.08, boxShadow: `0 0 24px ${cat.color}` }}
            className="rounded-xl bg-gray-900/80 p-6 flex flex-col items-center justify-center cursor-pointer border border-gray-800 hover:border-white transition"
            style={{ borderColor: cat.color }}
          >
            <span className="text-4xl mb-2">{cat.icon}</span>
            <span className="font-bold text-lg">{cat.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
} 