"use client";

import { motion } from "framer-motion";
import { toast } from "react-toastify";
import BookCard from "./BookCard";

const bestSellers = [
  { id: 1, title: "The Boy in The Book", author: "J. Morrison", price: "$10", rating: 4 },
  { id: 2, title: "Story Of Legend", author: "K. Thompson", price: "$10", rating: 4 },
  { id: 3, title: "Charlotte's Web", author: "E.B. White", price: "$10", rating: 5 },
  { id: 4, title: "Doctor Who", author: "R. Davies", price: "$10", rating: 4 },
  { id: 5, title: "Sweet Water", author: "M. Garcia", price: "$10", rating: 5 },
];

export default function BestSellers() {
  return (
    <section className="py-14 bg-base-100" id="bestsellers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <h2
            className="text-2xl sm:text-3xl font-bold text-base-content"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Best seller of the week
          </h2>
          <button
            onClick={() => toast.info("Viewing all best sellers!", { autoClose: 1800 })}
            className="btn btn-primary btn-sm px-5 h-9 min-h-0 rounded-lg text-xs font-semibold tracking-wider"
          >
            VIEW ALL
          </button>
        </motion.div>

        {/* Book grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {bestSellers.map((book, i) => (
            <BookCard key={book.id} book={book} coverIdx={i} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
