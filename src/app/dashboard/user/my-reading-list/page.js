"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const readingList = [
  { id: 1, title: "The Midnight Library", author: "Matt Haig", cover: "https://picsum.photos/id/1015/300/400" },
  { id: 2, title: "Project Hail Mary", author: "Andy Weir", cover: "https://picsum.photos/id/201/300/400" },
  { id: 3, title: "Dune Messiah", author: "Frank Herbert", cover: "https://picsum.photos/id/301/300/400" },
  { id: 4, title: "Atomic Habits", author: "James Clear", cover: "https://picsum.photos/id/401/300/400" },
];

export default function MyReadingList() {
  return (
    <div id="reading" className="bg-base-200 rounded-3xl p-6 border border-base-300">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <BookOpen /> My Reading List
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {readingList.map((book) => (
          <motion.div
            key={book.id}
            whileHover={{ scale: 1.03 }}
            className="group bg-base-100 rounded-2xl overflow-hidden border border-base-300 hover:border-primary/30 transition-all"
          >
            <div className="relative h-64">
              <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold line-clamp-2">{book.title}</h3>
              <p className="text-sm text-base-content/70 mt-1">{book.author}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}