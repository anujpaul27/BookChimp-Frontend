"use client";

import { motion } from "framer-motion";
import { BookOpen, ScanFace, X, InspectIcon, VideoIcon } from "lucide-react";
import { toast } from "react-toastify";

const footerSections = [
  {
    title: "Menu",
    links: ["Home", "Books", "Audiobooks", "Best Seller", "Promo", "Author"],
  },
  {
    title: "Quick Help",
    links: ["Help Center", "FAQ", "Order Status", "Product Recalls", "Easy Return", "Buy Offline Info"],
  },
  {
    title: "Category",
    links: ["Business", "Children", "Technology", "E-Book", "Fiction", "Toys & Game"],
  },
];

const socials = [
  { Icon: ScanFace, label: "Facebook", color: "hover:bg-blue-600" },
  { Icon: X, label: "Twitter", color: "hover:bg-sky-500" },
  { Icon: InspectIcon, label: "Instagram", color: "hover:bg-pink-600" },
  { Icon: VideoIcon, label: "YouTube", color: "hover:bg-red-600" },
];

export default function Footer() {
  const handleLinkClick = (name) => {
    toast.info(`Navigating to ${name}`, { autoClose: 1500 });
  };

  return (
    <footer className=" px-10 bg-base-200 border-t border-base-300 pt-14 pb-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-1"
          >
            <a href="#" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center shadow group-hover:scale-105 transition-transform">
                <BookOpen size={16} className="text-white" strokeWidth={2.5} />
              </div>
              <span
                className="text-lg font-bold text-base-content"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                BookChimp
              </span>
            </a>
            <p className="text-base-content/55 text-sm leading-relaxed mb-6">
              A lectus ac pulvinar tincidunt accumsan. Ulla mcorper dolor at lectus ac sed
              facilis isaclect Molestie aliquam ut blandit nibh vulputatctus in sit egestas in
              dolor dui purus tincidunt.
            </p>

            {/* Follow us */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-base-content/60 mb-3">
                Follow Us
              </p>
              <div className="flex items-center gap-2">
                {socials.map(({ Icon, label, color }) => (
                  <button
                    key={label}
                    onClick={() => toast.info(`Following on ${label}!`, { autoClose: 1600 })}
                    className={`w-8 h-8 rounded-full bg-base-300 ${color} text-base-content hover:text-white flex items-center justify-center transition-all hover:scale-110`}
                    aria-label={label}
                    title={label}
                  >
                    <Icon size={14} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Link columns */}
          {footerSections.map((section, si) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + si * 0.08 }}
            >
              <h4
                className="font-semibold text-sm text-base-content mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {section.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => handleLinkClick(link)}
                      className="text-sm text-base-content/55 hover:text-primary transition-colors text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-base-300 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-base-content/45">
          <p>© Copyright 2021 BookChimp</p>
          <div className="flex items-center gap-4">
            {["Terms of Use", "Privacy Policy", "Cookie Policy"].map((item, i) => (
              <span key={item} className="flex items-center gap-4">
                <button
                  onClick={() => handleLinkClick(item)}
                  className="hover:text-primary transition-colors"
                >
                  {item}
                </button>
                {i < 2 && <span className="text-base-300">–</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
