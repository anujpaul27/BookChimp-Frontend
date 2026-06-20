"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Upload, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function AddBook() {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    deliveryFee: "",
    category: "",
    image: null,
  });

  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  const uploadToImageBB = async (file) => {
    const form = new FormData();
    form.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: "POST",
      body: form,
    });
    const data = await res.json();
    return data.data?.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = null;
    if (formData.image) {
      setUploading(true);
      imageUrl = await uploadToImageBB(formData.image);
      setUploading(false);
    }

    // TODO: Send to your backend/API with status: "Pending Approval"
    console.log("Book Data:", { ...formData, image: imageUrl, status: "Pending Approval" });

    toast.success("Book submitted for approval! ✅");
    
    // Reset form
    setFormData({ title: "", author: "", description: "", deliveryFee: "", category: "", image: null });
    setImagePreview(null);
    setLoading(false);
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
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <BookOpen /> Add New Book
      </h1>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-base-200 rounded-3xl p-8 border border-base-300 space-y-6"
      >
        {/* Image Upload */}
        <div className="flex flex-col items-center">
          <div className="relative w-48 h-64 mb-4 border-2 border-dashed border-base-300 rounded-2xl overflow-hidden">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-base-content/40">
                <Upload size={48} />
              </div>
            )}
          </div>
          <label className="btn btn-outline">
            <Upload className="mr-2" /> Upload Book Cover
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Book Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Author</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="textarea textarea-bordered w-full h-32"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Delivery Fee ($)</label>
            <input
              type="number"
              value={formData.deliveryFee}
              onChange={(e) => setFormData({ ...formData, deliveryFee: e.target.value })}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Category</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Mystery">Mystery</option>
              <option value="Biography">Biography</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || uploading}
          className="btn btn-primary w-full h-12 text-lg"
        >
          {loading || uploading ? (
            <><Loader2 className="animate-spin mr-2" /> Submitting for Approval...</>
          ) : (
            "Submit for Approval"
          )}
        </button>

        <p className="text-center text-sm text-base-content/60">
          Book status will be <span className="badge badge-warning">Pending Approval</span>
        </p>
      </motion.form>
    </div>
  );
}