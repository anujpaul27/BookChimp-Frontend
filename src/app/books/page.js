"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { getData } from "@/components/lib/getData";
import BookCard from "@/components/BookCard";

export default function BestSellers() {
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getData('book/all-book');
        setAllBooks(response?.data || response || []); 
      } catch (error) {
        console.error("Failed to fetch books:", error);
        toast.error("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

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
            Best book choice for you 
          </h2>
          
        </motion.div>

        {loading ? (
          <div className="text-center py-10">Loading books...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {allBooks.length > 0 ? (
              allBooks.map((book, i) => {
                return <BookCard key={book.id || book._id} book={book} coverIdx={i} index={i} />
                
              })
            ) : (
              <div className="col-span-full text-center text-gray-500">Not Found books</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}