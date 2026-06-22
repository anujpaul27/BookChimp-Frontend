"use client";

import { useState } from "react";
import { Edit3, Trash2, Eye } from "lucide-react";
import { toast } from "react-toastify";

export default function ManageInventory({initialBooks}) {
  const [books, setBooks] = useState(initialBooks);

  const togglePublish = (id) => {
    setBooks(books.map(book => 
      book.id === id && book.status === "Approved" 
        ? { ...book, status: "Unpublished" }
        : book
    ));
    toast.success("Book status updated");
  };

  const deleteBook = (id) => {
    setBooks(books.filter(b => b.id !== id));
    toast.error("Book deleted");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Inventory</h1>
      
      <div className="bg-base-200 rounded-3xl overflow-hidden border border-base-300">
        <table className="table w-full">
          <thead>
            <tr className="border-b border-base-300">
              <th>Book Title</th>
              <th>Author</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-b border-base-300 hover:bg-base-100">
                <td className="font-medium">{book.title}</td>
                <td>{book.author}</td>
                <td>${book.price}</td>
                <td>
                  <span className={`badge ${
                    book.status === "Approved" ? "badge-success" :
                    book.status === "Pending" ? "badge-warning" : "badge-neutral"
                  }`}>
                    {book.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-ghost btn-sm"><Edit3 size={18} /></button>
                    {book.status === "Approved" && (
                      <button 
                        onClick={() => togglePublish(book.id)}
                        className="btn btn-ghost btn-sm text-warning"
                      >
                        Unpublish
                      </button>
                    )}
                    <button 
                      onClick={() => deleteBook(book.id)}
                      className="btn btn-ghost btn-sm text-error"
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