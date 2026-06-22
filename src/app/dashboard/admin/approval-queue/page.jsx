"use client";

import { useState } from "react";
import { CheckCircle, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const pendingBooks = [
  { id: 1, title: "The Psychology of Money", author: "Morgan Housel", category: "Finance" },
  { id: 2, title: "Dune Messiah", author: "Frank Herbert", category: "Sci-Fi" },
  { id: 3, title: "Educated", author: "Tara Westover", category: "Biography" },
];

export default function ApprovalQueue() {
  const [books, setBooks] = useState(pendingBooks);

  const approveBook = (id) => {
    setBooks(books.filter(b => b.id !== id));
    toast.success("Book approved and published!");
  };

  const deleteBook = (id) => {
    setBooks(books.filter(b => b.id !== id));
    toast.error("Book deleted");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Approval Queue</h1>
      <div className="bg-base-200 rounded-3xl overflow-hidden border border-base-300">
        <table className="table w-full">
          <thead>
            <tr className="border-b border-base-300">
              <th>Book Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-b border-base-300 hover:bg-base-100">
                <td className="font-medium">{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>
                  <div className="flex gap-3">
                    <button
                      onClick={() => approveBook(book.id)}
                      className="btn btn-success btn-sm"
                    >
                      <CheckCircle size={18} /> Approve & Publish
                    </button>
                    <button
                      onClick={() => deleteBook(book.id)}
                      className="btn btn-error btn-sm"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}