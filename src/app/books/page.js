"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Search, Filter, X } from "lucide-react";
import { getData } from "@/components/lib/getData";
import BookCard from "@/components/BookCard";

export default function BestSellers() {
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await getData('book/all-book/without/pending/unpublish');
        const books = response?.data || response || [];
        setAllBooks(books);
      } catch (error) {
        console.error("Failed to fetch books:", error);
        toast.error("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Get unique categories for filter
  const categories = useMemo(() => {
    const cats = [...new Set(allBooks.map(book => book.category).filter(Boolean))];
    return ["All", ...cats.sort()];
  }, [allBooks]);

  // Filtered & Searched Books
  const filteredBooks = useMemo(() => {
    return allBooks.filter((book) => {
      const matchesSearch =
        book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || book.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [allBooks, searchTerm, selectedCategory]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
  };

  return (
    <section className="py-14 bg-base-100" id="bestsellers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"
        >
          <h2
            className="text-2xl sm:text-3xl font-bold text-base-content"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Best book choice for you
          </h2>

          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" size={20} />
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-11 bg-base-200 focus:bg-base-100"
              />
            </div>

            {/* Category Filter */}
            <div className="relative min-w-[180px]">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="select select-bordered w-full bg-base-200 focus:bg-base-100"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedCategory !== "All") && (
              <button
                onClick={clearFilters}
                className="btn btn-ghost btn-sm flex items-center gap-2 whitespace-nowrap"
              >
                <X size={18} />
                Clear
              </button>
            )}
          </div>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="mt-4 text-base-content/70">Loading books...</p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6 text-sm text-base-content/70">
              Showing {filteredBooks.length} of {allBooks.length} books
            </div>

            {/* Books Grid */}
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {filteredBooks.map((book, i) => (
                  <BookCard
                    key={book.id || book._id}
                    book={book}
                    coverIdx={i}
                    index={i}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-2xl text-base-content/60 mb-2">No books found</p>
                <p className="text-base-content/50">Try adjusting your search or filter</p>
                <button
                  onClick={clearFilters}
                  className="btn btn-primary btn-sm mt-6"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}