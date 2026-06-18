"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, ShoppingCart, Search, Sun, Moon, Menu, X, ChevronDown,
} from "lucide-react";
import { toast } from "react-toastify";

const navLinks = [
  { label: "Home", href: "#", active: true },
  { label: "About", href: "#about" },
  { label: "Shop", href: "#shop" },
  { label: "Pricing", href: "#pricing" },
  { label: "Pages", href: "#", dropdown: ["Authors", "Blog Posts", "Events", "Press"] },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const cartCount = 3;

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = mounted && resolvedTheme === "bookdark";

  const toggleTheme = () => {
    const next = isDark ? "booklight" : "bookdark";
    setTheme(next);
    toast.info(`Switched to ${next === "bookdark" ? "Dark" : "Light"} mode`, {
      icon: next === "bookdark" ? "🌙" : "☀️",
      autoClose: 1800,
    });
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full ${
        scrolled ? "shadow-lg backdrop-blur-md bg-base-100/90" : "bg-base-100"
      }`}
      style={{ transition: "box-shadow 0.3s, background-color 0.3s" }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 flex-shrink-0 group">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center shadow group-hover:scale-105 transition-transform duration-200">
            <BookOpen size={17} className="text-white" strokeWidth={2.5} />
          </div>
          <span
            className="text-xl font-bold text-base-content"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            BookChimp
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {navLinks.map((link) =>
            link.dropdown ? (
              <li key={link.label} className="relative">
                <button
                  onClick={() => setPagesOpen((p) => !p)}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-base-content/70 hover:text-primary hover:bg-base-200 transition-all"
                >
                  {link.label}
                  <ChevronDown size={13} className={`transition-transform duration-200 ${pagesOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {pagesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-44 bg-base-100 border border-base-300 rounded-xl shadow-xl overflow-hidden z-50"
                    >
                      {link.dropdown.map((item) => (
                        <a
                          key={item}
                          href="#"
                          className="block px-4 py-2.5 text-sm text-base-content/70 hover:text-primary hover:bg-base-200 transition-colors"
                          onClick={() => setPagesOpen(false)}
                        >
                          {item}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    link.active
                      ? "text-primary font-semibold"
                      : "text-base-content/70 hover:text-primary hover:bg-base-200"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            )
          )}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          {/* Search */}
          <button
            onClick={() => toast.info("Search coming soon!", { autoClose: 2000 })}
            className="hidden sm:flex w-9 h-9 items-center justify-center rounded-lg text-base-content/60 hover:text-primary hover:bg-base-200 transition-all"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          {/* Dark mode toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-base-content/60 hover:text-primary hover:bg-base-200 transition-all relative overflow-hidden"
              aria-label="Toggle theme"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? "sun" : "moon"}
                  initial={{ rotate: -45, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 45, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          )}

          {/* Cart */}
          <button
            onClick={() => toast.success(`You have ${cartCount} items in your cart`, { autoClose: 2200 })}
            className="relative flex items-center justify-center w-10 h-10 bg-primary rounded-lg text-white hover:bg-blue-700 active:scale-95 transition-all shadow"
            aria-label="View cart"
          >
            <ShoppingCart size={17} />
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-secondary text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
              {cartCount}
            </span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-base-content/60 hover:bg-base-200 transition-all ml-1"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? "close" : "menu"}
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden overflow-hidden bg-base-100 border-t border-base-300"
          >
            <div className="px-4 py-3 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href || "#"}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    link.active
                      ? "text-primary bg-primary/8 font-semibold"
                      : "text-base-content/70 hover:text-primary hover:bg-base-200"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
