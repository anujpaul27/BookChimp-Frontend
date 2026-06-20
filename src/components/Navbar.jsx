"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ShoppingCart,
  Search,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/app/(auth)/lib/auth-client";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Registration", href: "/registration" },
];

export default function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const cartCount = 3;

  const {data:user,isPending:loading, error} = authClient.useSession()

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
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "shadow-xl backdrop-blur-lg bg-base-100/95 border-b border-base-200"
          : "bg-base-100"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 flex-shrink-0 group">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center shadow group-hover:scale-105 transition-transform duration-200">
            <BookOpen
              size={17}
              className="text-primary-content"
              strokeWidth={2.5}
            />
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
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-base-content hover:text-primary hover:bg-base-200/80 transition-all"
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${pagesOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {pagesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-base-100 border border-base-300 rounded-2xl shadow-2xl overflow-hidden z-50 py-1"
                    >
                      {link.dropdown.map((item) => (
                        <a
                          key={item}
                          href="#"
                          className="block px-5 py-3 text-base-content hover:text-primary hover:bg-base-200 transition-colors"
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
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    link.active
                      ? "text-primary font-semibold"
                      : "text-base-content hover:text-primary hover:bg-base-200"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ),
          )}
          <li key={loading ? 'loading..' : `${user ? 'LogOut' : 'Login'}`}>
            <a
              href={`${user ? '/logout' : '/login'}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all text-base-content hover:text-primary hover:bg-base-200`}
            >
              {loading ? 'loading..' : `${user ? 'LogOut' : 'Login'}`}
            </a>
          </li>
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            onClick={() =>
              toast.info("Search coming soon!", { autoClose: 2000 })
            }
            className="hidden sm:flex w-10 h-10 items-center justify-center rounded-xl text-base-content hover:text-primary hover:bg-base-200 transition-all"
            aria-label="Search"
          >
            <Search size={19} />
          </button>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-base-content hover:text-primary hover:bg-base-200 transition-all"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={isDark ? "sun" : "moon"}
                  initial={{ rotate: -30, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 30, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25 }}
                >
                  {isDark ? <Sun size={19} /> : <Moon size={19} />}
                </motion.span>
              </AnimatePresence>
            </button>
          )}

          {/* Cart */}
          <button
            onClick={() =>
              toast.success(`You have ${cartCount} items in your cart`, {
                autoClose: 2200,
              })
            }
            className="relative flex items-center justify-center w-10 h-10 bg-primary text-primary-content rounded-xl hover:brightness-110 active:scale-95 transition-all shadow"
            aria-label="View cart"
          >
            <ShoppingCart size={18} />
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-secondary text-secondary-content text-[10px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-base-content hover:bg-base-200 transition-all"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={mobileOpen ? "X" : "Menu"}
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-base-100 border-t border-base-300"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href || "#"}
                  onClick={() => setMobileOpen(false)}
                  className={`px-5 py-3.5 rounded-xl text-[15px] font-medium transition-all ${
                    link.active
                      ? "text-primary bg-primary/10 font-semibold"
                      : "text-base-content hover:bg-base-200"
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
