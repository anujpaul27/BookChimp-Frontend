"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";

// Placeholder book covers using colored rectangles with text
const heroBooks = [
  {
    id: 1,
    title: "Business Plan",
    color: "from-slate-200 to-slate-300",
    textColor: "text-slate-700",
    accent: "#64748b",
    badge: "LFLV",
  },
  {
    id: 2,
    title: "Lotlight Ebook",
    color: "from-stone-100 to-stone-200",
    textColor: "text-stone-700",
    accent: "#78716c",
    badge: "ELEGANT",
  },
  {
    id: 3,
    title: "Palvery Ebook",
    color: "from-pink-50 to-rose-100",
    textColor: "text-rose-600",
    accent: "#f43f5e",
    badge: "GUIDE",
  },
  {
    id: 4,
    title: "Business Plan",
    color: "from-blue-50 to-sky-100",
    textColor: "text-blue-700",
    accent: "#2563eb",
    badge: "LFLV",
  },
  {
    id: 5,
    title: "Best Innovation",
    color: "from-amber-400 to-yellow-500",
    textColor: "text-amber-900",
    accent: "#92400e",
    badge: "VISUAL",
  },
];

function BookCover({ book, width = 140, height = 190, className = "" }) {
  return (
    <div
      className={`relative rounded-lg overflow-hidden shadow-xl flex-shrink-0 ${className}`}
      style={{ width, height }}
    >
      <div className={`w-full h-full bg-gradient-to-b ${book.color} flex flex-col items-center justify-between p-3`}>
        {/* Top badge */}
        <div className="w-full">
          <span
            className={`text-[8px] font-bold tracking-widest uppercase ${book.textColor} opacity-60`}
          >
            {book.badge}
          </span>
        </div>
        {/* Title */}
        <div className="text-center px-1">
          <p
            className={`font-bold text-sm leading-tight ${book.textColor}`}
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {book.title}
          </p>
        </div>
        {/* Bottom decorative line */}
        <div className="w-full h-1 rounded-full" style={{ background: book.accent, opacity: 0.4 }} />
      </div>
      {/* Spine shadow */}
      <div className="absolute inset-y-0 left-0 w-3 bg-black/10" />
    </div>
  );
}

export default function HeroSection() {
  const [activeIdx, setActiveIdx] = useState(2);

  useEffect(() => {
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % heroBooks.length), 3500);
    return () => clearInterval(t);
  }, []);

  const handleShop = () => {
    toast.success("Heading to the shop!", { icon: "📚", autoClose: 2000 });
  };

  return (
    <section className="relative min-h-[520px] overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-900">
      {/* Soft background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-100/50 to-transparent dark:from-blue-950/30" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-amber-100/40 dark:bg-amber-900/10 blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20 flex flex-col lg:flex-row items-center gap-12">
        {/* Left: Text content */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 text-center lg:text-left max-w-xl mx-auto lg:mx-0"
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5 text-base-content"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Your favourite{" "}
            <span className="text-primary">books,</span>
            <br />
            all in one place
          </motion.h1>

          <motion.p
            className="text-base-content/60 text-base leading-relaxed mb-8 max-w-md mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A lectus ac pulvinar tincidunt accumsan ullamcorper dolor at lectus acsed
            facilisis hac molestie aliquam ut blandit.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            <button
              onClick={handleShop}
              className="btn btn-primary px-8 h-11 min-h-0 rounded-lg font-semibold text-sm tracking-wide shadow-md hover:shadow-blue-200 dark:hover:shadow-blue-900 transition-all hover:-translate-y-0.5"
            >
              SHOP NOW
              <ArrowRight size={16} className="ml-1" />
            </button>
            <button
              onClick={() => toast.info("Exploring categories…", { autoClose: 1800 })}
              className="btn btn-ghost btn-sm h-11 px-6 rounded-lg font-medium text-sm border border-base-300"
            >
              Browse Categories
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-8 mt-10 justify-center lg:justify-start"
          >
            {[
              { num: "50K+", label: "Books" },
              { num: "12K+", label: "Authors" },
              { num: "4.9★", label: "Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="text-xl font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {stat.num}
                </p>
                <p className="text-xs text-base-content/50 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Book carousel display */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="flex-1 flex items-end justify-center gap-3 px-4 min-h-[220px]"
          style={{ perspective: "800px" }}
        >
          {heroBooks.map((book, i) => {
            const dist = i - activeIdx;
            const absDist = Math.abs(dist);
            const isCenter = dist === 0;
            const zOffset = isCenter ? 80 : absDist === 1 ? 40 : 0;
            const scaleVal = isCenter ? 1 : absDist === 1 ? 0.82 : 0.68;
            const yVal = isCenter ? -24 : absDist === 1 ? -8 : 0;

            return (
              <motion.div
                key={book.id}
                animate={{
                  scale: scaleVal,
                  y: yVal,
                  zIndex: zOffset,
                  opacity: absDist > 2 ? 0 : 1,
                  filter: isCenter ? "brightness(1)" : `brightness(${0.75 - absDist * 0.1})`,
                }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                onClick={() => setActiveIdx(i)}
                className="cursor-pointer"
              >
                <BookCover
                  book={book}
                  width={isCenter ? 155 : absDist === 1 ? 125 : 100}
                  height={isCenter ? 210 : absDist === 1 ? 170 : 140}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 pb-8">
        {heroBooks.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIdx ? "bg-primary w-6" : "bg-base-300 w-1.5 hover:bg-primary/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
