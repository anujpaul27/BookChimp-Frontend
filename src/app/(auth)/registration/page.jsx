"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, BookOpen } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";
import { authClient } from "../lib/auth-client";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log(`${process.env.MONGODB_URI}`);
    setLoading(true);
    try {
      const { data, error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: formData.role,
        callbackURL: "/",
      });

      if (error) {
        console.error(error);
        toast.error(error.message || "Sign up failed.");
        return;
      }

      if (data) {
        console.log(data);
        toast.success("Account created successfully! 🎉");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image - Same as Login */}
      <div className="hidden lg:flex w-1/2  relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1,
            delay: 0.5,
          }}
          className="w-full max-w-md"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/book-reading.jpg"
              alt="Girl reading book"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-700/40 to-transparent" />

          {/* Logo */}
          <div className="absolute top-8 left-8 flex items-center gap-3 text-white z-10">
            <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-3xl font-bold tracking-tight">BookChimp</span>
          </div>

          <div className="absolute bottom-12 left-12 text-white">
            <p className="text-xl">Join thousands of book lovers today</p>
          </div>
        </motion.div>
      </div>

      {/* Right side and form side   */}
      <div className="flex-1 flex items-center justify-center p-6 bg-base-100">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.5,
          }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-base-content/60 mt-2">
              Start your reading journey with us
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="input input-bordered w-full"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="input input-bordered w-full"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="input input-bordered w-full pr-12"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="select select-bordered w-full"
              >
                <option value="" disabled>
                  Select a role
                </option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="librarian">Librarian</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full h-12 text-lg mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={22} />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary font-semibold hover:underline"
            >
              Sign in
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
