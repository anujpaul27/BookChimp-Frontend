"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import BookCard from "./BookCard";
import { getData } from "./lib/getData";
import Link from "next/link";
import { getUserTokenClient } from "./lib/getSession";

export default function BestSellers() {
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = getUserTokenClient()

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getData('book/all-book/without/pending/unpublish', token);
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
    <section className=" w-10/11 mx-auto  py-14 bg-base-100" id="bestsellers ">
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
          <Link href={'/books'}
            onClick={() => toast.info("Viewing all best sellers!", { autoClose: 1800 })}
            className="btn btn-primary btn-sm px-5 h-9 min-h-0 rounded-lg text-xs font-semibold tracking-wider"
          >
            VIEW ALL
          </Link>
        </motion.div>

        {loading ? (
          <div className="text-center py-10">Loading books...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {allBooks.length > 0 ? (
              allBooks.map((book, i) => {
                if (i === 4) return 
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