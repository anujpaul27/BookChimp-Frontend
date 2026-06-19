"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { toast } from "react-toastify";
import { useState } from "react";

// Generate a deterministic "cover" based on book id
const coverThemes = [
  { bg: "from-amber-400 to-yellow-500", textColor: "text-amber-900", accent: "#92400e" },
  { bg: "from-sky-100 to-blue-200", textColor: "text-blue-800", accent: "#1d4ed8" },
  { bg: "from-pink-100 to-rose-200", textColor: "text-rose-700", accent: "#be185d" },
  { bg: "from-stone-100 to-stone-200", textColor: "text-stone-700", accent: "#57534e" },
  { bg: "from-slate-700 to-slate-900", textColor: "text-slate-100", accent: "#94a3b8" },
  { bg: "from-violet-100 to-purple-200", textColor: "text-violet-800", accent: "#6d28d9" },
];

function BookCoverArt({ book, coverIdx }) {
  const theme = coverThemes[coverIdx % coverThemes.length];
  return (
    <div className={`w-full h-full bg-gradient-to-b ${theme.bg} flex flex-col items-center justify-between p-3 relative`}>
      {/* Spine */}
      <div className="absolute inset-y-0 left-0 w-2.5 bg-black/15 rounded-l-sm" />
      <span className={`text-[9px] font-bold tracking-widest uppercase ${theme.textColor} opacity-50 self-start ml-3`}>
        BESTSELLER
      </span>
      <div className="text-center px-2">
        <p
          className={`font-bold text-sm leading-snug ${theme.textColor}`}
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {book.title}
        </p>
        <p className={`text-[10px] mt-1 ${theme.textColor} opacity-60`}>{book.author}</p>
      </div>
      <div className="w-3/4 h-px" style={{ background: theme.accent, opacity: 0.35 }} />
    </div>
  );
}

export default function BookCard({ book, coverIdx = 0, index = 0 }) {
  const [wishlisted, setWishlisted] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    toast.success(`"${book.title}" added to cart!`, {
      icon: "🛒",
      autoClose: 2200,
    });
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setWishlisted((w) => !w);
    toast.info(wishlisted ? "Removed from wishlist" : "Added to wishlist!", {
      icon: wishlisted ? "💔" : "❤️",
      autoClose: 1800,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group flex flex-col"
    >
      {/* Book cover */}
      <div className="relative rounded-xl overflow-hidden shadow-md aspect-[3/4] bg-base-200 book-card-hover">
        <BookCoverArt book={book} coverIdx={coverIdx} />

        {/* Hover overlay with actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
          <motion.button
            onClick={handleAddToCart}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-colors"
            title="Add to cart"
          >
            <ShoppingCart size={16} />
          </motion.button>
          <motion.button
            onClick={handleWishlist}
            whileTap={{ scale: 0.9 }}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors ${
              wishlisted ? "bg-rose-500 text-white" : "bg-white text-base-content"
            }`}
            title="Wishlist"
          >
            <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
          </motion.button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 px-0.5">
        <h3
          className="font-semibold text-sm text-base-content leading-snug line-clamp-2 group-hover:text-primary transition-colors cursor-pointer"
          style={{ fontFamily: "'Playfair Display', serif" }}
          onClick={() => toast.info(`Viewing "${book.title}"`, { autoClose: 1500 })}
        >
          {book.title}
        </h3>
        <p className="text-xs text-base-content/50 mt-0.5">{book.author}</p>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-secondary font-bold text-sm">{book.price}</span>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                className={i < book.rating ? "text-amber-400 fill-amber-400" : "text-base-300"}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
