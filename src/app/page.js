"use client";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import CategoriesSection from "@/components/CategoriesSection";
import BestSellers from "@/components/BestSellers";
import NewArrivals from "@/components/NewArrivals";
import Testimonials from "@/components/Testimonials";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-base-100">
      <Navbar />
      <HeroSection />
      <TrustBadges />
      <CategoriesSection />
      <BestSellers />
      <NewArrivals />
      <Testimonials />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
