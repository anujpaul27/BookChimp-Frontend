"use client";

import { useState } from "react";
import { Star, Edit3, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const initialReviews = [
  { id: 1, book: "The Midnight Library", rating: 5, comment: "Beautiful and thought-provoking.", date: "2025-06-10" },
  { id: 2, book: "Project Hail Mary", rating: 5, comment: "Sci-fi at its absolute best!", date: "2025-06-05" },
];

export default function MyReviews() {
  const [reviews, setReviews] = useState(initialReviews);

  const handleDelete = (id) => {
    setReviews(reviews.filter(r => r.id !== id));
    toast.error("Review deleted");
  };

  const handleEdit = () => {
    toast.info("Edit modal coming soon");
  };

  return (
    <div id="reviews" className="bg-base-200 rounded-3xl p-6 border border-base-300">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <Star /> My Reviews
      </h2>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-base-100 rounded-2xl p-6 border border-base-300">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{review.book}</h3>
                <div className="flex text-yellow-400 mt-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={handleEdit} className="btn btn-ghost btn-sm text-primary">
                  <Edit3 size={18} />
                </button>
                <button onClick={() => handleDelete(review.id)} className="btn btn-ghost btn-sm text-error">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <p className="mt-4 text-base-content/80 italic">"{review.comment}"</p>
            <p className="text-xs text-base-content/60 mt-3">{review.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}