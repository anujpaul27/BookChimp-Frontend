"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const topLibrarians = [
  {
    id: 1,
    name: "Sara Chowdury",
    avatar: "https://i.pravatar.cc/150?img=32",
    deliveries: 142,
    badge: "🏆",
  },
  {
    id: 2,
    name: "Aditaya",
    avatar: "https://i.pravatar.cc/150?img=60",
    deliveries: 128,
    badge: "🥈",
  },
  {
    id: 3,
    name: "Lakshmi paul",
    avatar: "https://i.pravatar.cc/150?img=26",
    deliveries: 115,
    badge: "🥉",
  },
];

export default function TopLibrarians() {
  return (
    <section className="py-8 bg-base-200 px-10 ">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Top Librarians</h2>
          <p className="text-base-content/70">
            Our dedicated librarians with the most successful deliveries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topLibrarians.map((librarian, index) => (
            <motion.div
              key={librarian.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-base-100 rounded-3xl p-8 text-center border border-base-300 hover:border-primary/30 transition-all group"
            >
              <div className="relative w-24 h-24 mx-auto mb-6">
                <Image
                  src={librarian.avatar}
                  alt={librarian.name}
                  fill
                  className="rounded-full object-cover border-4 border-primary"
                />
                <div className="absolute -top-2 -right-2 text-3xl">
                  {librarian.badge}
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-1">{librarian.name}</h3>
              <p className="text-sm text-base-content/60 mb-4">Librarian</p>

              <div className="inline-flex items-center gap-2 bg-base-200 px-5 py-2 rounded-full">
                <span className="text-primary font-bold text-lg">
                  {librarian.deliveries}
                </span>
                <span className="text-sm text-base-content/70">Deliveries</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
