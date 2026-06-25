"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, BookOpen } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";
import { authClient } from "../lib/auth-client";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [loadingGoogle, setLoadingGoogle] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const {data,error} = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: '/',
        rememberMe: formData.formData
      })
      
      if (error) {
        console.error(error);
        toast.error(error.message || "Login failed.");
        return;
      }

      if (data) {
        console.log(data);
        toast.success("Login successful! Welcome back to BookChimp 📚");
      }
    } catch (err) {
      toast.error( err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle =async () =>
  {
    setLoadingGoogle(true)
    const data = await authClient.signIn.social({
      provider: "google"
    })
    setLoadingGoogle(false)
    console.log(data);
  }

  return (
    <div className="min-h-screen flex bg-white dark:bg-base-100">
      {/* Left Image - Same as Login */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1, 
            delay: 0.5, 
          }}
          className="w-full max-w-md"
        >
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-base-content">
              Welcome Back
            </h1>
            <p className="text-base-content/60 mt-3">
              Sign in to access your library
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-base-content">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="input input-bordered w-full h-12 focus:border-orange-500"
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1.5">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-base-content">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="input input-bordered w-full h-12 pr-12 focus:border-orange-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1.5">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    setFormData({ ...formData, rememberMe: e.target.checked })
                  }
                  className="checkbox checkbox-primary"
                />
                Remember me
              </label>
              <a href="#" className="text-orange-600 hover:underline text-sm">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-3" size={24} />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <button
              type="button"
              onClick={loginWithGoogle}
              className="btn btn-outline w-full h-14 flex items-center justify-center gap-3 text-base"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-5 h-5"
              />

              {loadingGoogle ? (
                <>
                  <Loader2 className="animate-spin mr-3" size={24} />
                  Signing In...
                </>
              ) : (
                "Continue with Google"
              )}
              
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-base-content/70">
            Don't have an account?{" "}
            <a
              href="/registration"
              className="text-orange-600 font-semibold hover:underline"
            >
              Create Account
            </a>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Login Form */}
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
    </div>
  );
}
