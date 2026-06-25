"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { toast } from "react-toastify";

const testimonials = [
  {
    id: 1,
    text1: "A lectus ac pulvinar tincidunt accumsan. Ullamcorper dolor at lectus ac, sed facilisis hac.",
    text2: "Egestas in dolor dui purus tincidunt eget cras nisl est molestie aliquam.",
    rating: 4,
    name: "Mell Harvey",
    role: "Founder BookChimp",
    avatar: "MH",
    avatarColor: "from-orange-400 to-rose-500",
  },
  {
    id: 2,
    text1: "A lectus ac pulvinar tincidunt accumsan. Ullamcorper dolor at lectus ac, sed facilisis hac.",
    text2: "Egestas in dolor dui purus tincidunt eget cras nisl est molestie aliquam.",
    rating: 4,
    name: "Jamie Walsh",
    role: "General Manager",
    avatar: "JW",
    avatarColor: "from-blue-400 to-indigo-500",
  },
  {
    id: 3,
    text1: "A lectus ac pulvinar tincidunt accumsan. Ullamcorper dolor at lectus ac, sed facilisis hac.",
    text2: "Egestas in dolor dui purus tincidunt eget cras nisl est molestie aliquam.",
    rating: 4,
    name: "Bailey Hardy",
    role: "Accounting Manager",
    avatar: "BH",
    avatarColor: "from-teal-400 to-cyan-500",
  },
];

function StarRow({ count, max = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(max)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < count ? "text-secondary fill-secondary" : "text-base-300"}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="w-10/11 mx-auto py-16 bg-base-100" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-10"
        >
          <h2
            className="text-2xl sm:text-3xl font-bold text-base-content"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What People Says
          </h2>
          <button
            onClick={() => toast.info("Viewing all reviews!", { autoClose: 1800 })}
            className="btn btn-primary btn-sm px-5 h-9 min-h-0 rounded-lg text-xs font-semibold tracking-wider"
          >
            VIEW ALL
          </button>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="relative rounded-2xl border border-dashed border-base-300 p-6 bg-base-100 hover:border-primary/30 hover:shadow-md transition-all group"
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-5 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote size={40} className="text-primary" />
              </div>

              <p className="text-base-content/65 text-sm leading-relaxed text-center">
                {t.text1}
              </p>
              <p className="text-base-content/50 text-sm leading-relaxed text-center mt-3">
                {t.text2}
              </p>

              {/* Stars */}
              <div className="flex justify-center mt-4">
                <StarRow count={t.rating} />
              </div>

              {/* Author */}
              <div className="flex flex-col items-center mt-5 pt-4 border-t border-base-200">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white font-bold text-sm shadow-md mb-2`}
                >
                  {t.avatar}
                </div>
                <p className="font-semibold text-sm text-base-content">{t.name}</p>
                <p className="text-xs text-base-content/45 mt-0.5">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
