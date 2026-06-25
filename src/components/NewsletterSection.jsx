"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { toast } from "react-toastify";

const miniCovers = [
  { color: "from-stone-100 to-stone-200", title: "Lotlight" },
  { color: "from-amber-400 to-yellow-500", title: "Business" },
  { color: "from-pink-100 to-rose-200", title: "Palvery" },
  { color: "from-slate-600 to-slate-800", title: "Visual" },
  { color: "from-sky-100 to-blue-200", title: "E-Book" },
  { color: "from-violet-100 to-purple-200", title: "Design" },
  { color: "from-amber-300 to-orange-400", title: "Business+" },
  { color: "from-stone-200 to-neutral-300", title: "Guide" },
  { color: "from-pink-50 to-rose-100", title: "Palvery 2" },
  { color: "from-amber-50 to-yellow-100", title: "Lotlight 2" },
];

function MiniBook({ cover }) {
  return (
    <div className={`rounded-md shadow-md bg-gradient-to-b ${cover.color} aspect-[2/3] flex items-center justify-center p-1`}>
      <span className="text-[8px] font-bold text-center leading-tight text-stone-600 opacity-70">{cover.title}</span>
    </div>
  );
}

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.", { autoClose: 2500 });
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    toast.success("🎉 You're subscribed! Check your inbox for a welcome email.", {
      autoClose: 4000,
    });
    setEmail("");
  };

  return (
    <section className="w-10/11 mx-auto  py-6 bg-base-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #FCD34D 0%, #F59E0B 60%, #FBBF24 100%)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: Book mosaic */}
            <div className="p-8 hidden lg:block">
              <div className="grid grid-cols-4 gap-2 h-64">
                {miniCovers.map((cover, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <MiniBook cover={cover} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-900/20 flex items-center justify-center">
                  <Mail size={20} className="text-amber-900" />
                </div>
              </div>
              <h3
                className="text-3xl font-bold text-amber-900 mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Join Our Newsletter
              </h3>
              <p className="text-amber-800/80 text-sm leading-relaxed mb-6">
                A lectus ac pulvinar tincidunt accumsan. Ullamcorper dolor at lectus sed
                facilisis hac. Molestie aliquam ut blandit nibh vulputate.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Type your email address"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-white/50 text-stone-700 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-900/30 shadow-sm"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn h-12 min-h-0 rounded-xl font-semibold text-sm tracking-widest bg-blue-600 hover:bg-blue-700 border-0 text-white shadow-md transition-all"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      SUBSCRIBE NOW
                      <Send size={14} className="ml-2" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-amber-800/60 text-xs mt-3 text-center">
                No spam, unsubscribe anytime ✦
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
