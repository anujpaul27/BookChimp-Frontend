"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, Smile } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Free Worldwide Shipping",
    desc: "On orders over $25",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    icon: ShieldCheck,
    title: "Refund Guarantee",
    desc: "30-day hassle-free returns",
    iconColor: "text-secondary",
    iconBg: "bg-secondary/10",
  },
  {
    icon: Smile,
    title: "Happy Customer",
    desc: "4.9★ from 12K+ reviews",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
  },
];

export default function TrustBadges() {
  return (
    <section className="py-10 bg-base-100 border-b border-base-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {badges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-base-200/60 border border-base-300/50 hover:border-primary/20 hover:shadow-sm transition-all"
              >
                <div className={`w-12 h-12 rounded-xl ${badge.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={22} className={badge.iconColor} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-base-content">{badge.title}</p>
                  <p className="text-xs text-base-content/50 mt-0.5">{badge.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
