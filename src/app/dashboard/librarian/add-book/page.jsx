"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Upload, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { uploadToImageBB } from "@/components/api/uploadImage";

export default function AddBook() {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [images, setImages] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    category: "",
    status: "Pending",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = null;
      if (images) {
        setUploading(true);
        imageUrl = await uploadToImageBB(images);
         
        setUploading(false);
      }

      const bookData = {
          ...formData,
          image: imageUrl,
        };

      console.log(bookData);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/book/create`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(bookData),
        },
      );

      const books = await res.json();
      console.log(res);
      if (res.ok) {
        console.log(books.data);
        toast.success("Book submitted for approval! ✅");
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }

    // Reset form
    // setFormData({
    //   title: "",
    //   author: "",
    //   description: "",
    //   price: "",
    //   category: "",
    //   image: null,
    // });
    // setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImages(file);
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
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-base-content/40">
                <Upload size={48} />
              </div>
            )}
          </div>
          <label className="btn btn-outline">
            <Upload className="mr-2" /> Upload Book Cover
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Book Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Author</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="textarea textarea-bordered w-full h-32"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2"> Price ($)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Category</option>
              <option value="Fiction">Life Style</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Sci-Fi">Motivation</option>
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
            <>
              <Loader2 className="animate-spin mr-2" /> Submitting for
              Approval...
            </>
          ) : (
            "Submit for Approval"
          )}
        </button>

        <p className="text-center text-sm text-base-content/60">
          Book status will be{" "}
          <span className="badge badge-warning">Pending Approval</span>
        </p>
      </motion.form>
    </div>
  );
}
