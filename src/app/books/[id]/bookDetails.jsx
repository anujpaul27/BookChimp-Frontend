"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Star, ShoppingCart, Truck, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";


export default function BookDetails({book}) {
  const handleAddToCart = () => {
    toast.success("Added to cart! 📚");
  };

  const handleRequestDelivery = () => {
    toast.info("Request sent! Waiting for librarian approval.", {
      position: "top-center",
    });
  };

  return (
    <div className="min-h-screen bg-base-100 py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <Link href="/books" className="inline-flex items-center gap-2 text-base-content/70 hover:text-base-content mb-8">
          <ArrowLeft size={20} />
          Back to Browse
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Book Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md aspect-[3/4] shadow-2xl rounded-3xl overflow-hidden border border-base-300">
              <Image
                src={book.image}
                alt={book.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Book Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="badge badge-warning">{book.status}</span>
                <span className="badge badge-neutral">{book.category}</span>
              </div>
              <h1 className="text-4xl font-bold mt-4 leading-tight">{book.title}</h1>
              <p className="text-xl text-base-content/70 mt-2">by {book.author}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={22}
                    fill={i < Math.floor(book.rating) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="font-medium">{book.rating}</span>
              <span className="text-base-content/60">• {book.pages} pages</span>
            </div>

            {/* Price & Delivery */}
            <div className="bg-base-200 rounded-2xl p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70">Delivery Fee</p>
                <p className="text-4xl font-bold text-primary">${book.price}</p>
              </div>
              <div className="flex items-center gap-2 text-success">
                <Truck size={28} />
                <div className="text-sm">
                  <p>Fast Delivery</p>
                  <p className="text-xs">2-5 days</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-lg mb-3">About this book</h3>
              <p className="text-base-content/80 leading-relaxed">
                {book.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={handleRequestDelivery}
                className="btn btn-primary flex-1 h-14 text-lg"
              >
                Request Delivery
              </button>

              <button
                onClick={handleAddToCart}
                className="btn btn-outline flex-1 h-14 text-lg gap-2"
              >
                <ShoppingCart size={22} />
                Add to Wishlist
              </button>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-6 text-sm pt-6 border-t border-base-300">
              <div>
                <p className="text-base-content/60">Language</p>
                <p className="font-medium">{book.language}</p>
              </div>
              <div>
                <p className="text-base-content/60">Status</p>
                <p className="font-medium text-warning">{book.status}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}