"use client";

import { motion } from "framer-motion";
import { toast } from "react-toastify";

const categories = [
  { name: "Business", emoji: "💼", color: "from-slate-600 to-slate-800" },
  { name: "Children", emoji: "🧸", color: "from-pink-500 to-rose-600" },
  { name: "Fiction", emoji: "📖", color: "from-amber-500 to-orange-600" },
  { name: "E-Book", emoji: "💻", color: "from-sky-500 to-blue-600" },
  { name: "Technology", emoji: "⚙️", color: "from-violet-600 to-purple-700" },
  { name: "Toys & Game", emoji: "🎮", color: "from-green-500 to-emerald-600" },
  { name: "Manga", emoji: "🎌", color: "from-red-500 to-pink-600" },
  { name: "Entrepreneur", emoji: "🚀", color: "from-blue-600 to-indigo-700" },
];

export default function CategoriesSection() {
  return (
    <section className="py-16 bg-base-100" id="shop">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-base-content mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Book Categories
          </h2>
          <p className="text-base-content/50 text-sm">Explore our curated collection by genre</p>
        </motion.div>

        {/* Category grid — scrollable on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -4, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => toast.info(`Browsing ${cat.name}`, { icon: cat.emoji, autoClose: 1800 })}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-md cursor-pointer"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-85 group-hover:opacity-100 transition-opacity`}
              />
              {/* Texture overlay */}
              <div className="absolute inset-0 bg-black/20" />
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-end pb-3 px-2">
                <span className="text-3xl mb-1 drop-shadow">{cat.emoji}</span>
                <span className="text-white text-xs font-semibold text-center leading-tight drop-shadow">
                  {cat.name}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
