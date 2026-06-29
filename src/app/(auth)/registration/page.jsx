"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, BookOpen, Upload } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";
import { authClient } from "../lib/auth-client";
import { uploadToImageBB } from "@/components/api/uploadImage";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    image: null, // File object
  });

  const router = useRouter()


  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.role) newErrors.role = "Please select a role";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Step 1: Register user WITHOUT image first
      const { data, error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        userType: formData.role,
        callbackURL: "/",
      });

      if (error) {
        console.log(error.message);
        toast.error(error.message || "Registration failed. Email may already exist.");
        return;
      }

      // Step 2: If registration successful AND user selected image → Upload image
      let imageUrl = null;
      setUploadingImage(true)
      if (formData.image) {
        toast.info("Uploading profile picture...");
        imageUrl = await uploadToImageBB(formData.image);
      }
      setUploadingImage(false)

      // Step 3: Update user profile with image (if uploaded)
      if (imageUrl && data?.user?.id) {
        await authClient.updateUser({
          image: imageUrl,
        });
      }

      toast.success("Account created successfully!");
      
      // Optional: Redirect to login or dashboard
      router.push("/");

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex w-10/12 gap-10  mx-auto ">
      {/* Left Side Image */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <Image
          src="/book-reading.jpg"
          alt="Book reading"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-700/50 to-transparent" />

        <div className="absolute top-8 left-8 flex items-center gap-3 text-white z-10">
          <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="text-3xl font-bold tracking-tight">BiblioDrop</span>
        </div>

        <div className="absolute bottom-12 left-12 text-white z-10">
          <p className="text-xl">Join thousands of book lovers today</p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-6 bg-base-100">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-base-content/60 mt-2">Start your reading journey with us</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Profile Image Preview */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-24 h-24 mb-3">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="rounded-full object-cover border-4 border-primary"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-base-200 flex items-center justify-center border-4 border-primary">
                    <Upload size={32} className="text-base-content/50" />
                  </div>
                )}
              </div>
              <label className="cursor-pointer btn btn-outline btn-sm">
                <Upload size={16} className="mr-2" />
                Choose Profile Picture
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Other Fields */}
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input input-bordered w-full"
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input input-bordered w-full"
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password & Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input input-bordered w-full pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="input input-bordered w-full"
                placeholder="••••••••"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="select select-bordered w-full"
              >
                <option value="" disabled>Select your role</option>
                <option value="user">Reader / User</option>
                <option value="librarian">Librarian</option>
              </select>
              {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
            </div>

            <button
              type="submit"
              disabled={loading || uploadingImage}
              className="btn btn-primary w-full h-12 text-lg mt-6"
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
            <a href="/login" className="text-primary font-semibold hover:underline">
              Sign in
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}