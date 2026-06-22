"use client";

import { useState } from "react";
import { Trash2, EyeOff } from "lucide-react";
import { toast } from "react-toastify";


export default function ManageAllBooks({allBooks}) {
  const [books, setBooks] = useState(allBooks);

  const unpublish = (id) => {
    setBooks(books.map(b => b._id === id ? { ...b, status: "Unpublish" } : b));
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/book/unpublish-book/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    toast.success("Book unpublished");
  };

  const deleteBook = (id) => {
    setBooks(books.filter(b => b._id !== id));
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/book/book-delete/${id}`,{
        method: 'delete'
    })
    toast.error("Book permanently deleted");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage All Books</h1>
      <div className="bg-base-200 rounded-3xl overflow-hidden border border-base-300">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-b border-base-300 hover:bg-base-100">
                <td className="font-medium">{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <span className={`badge ${book.status === "Approved" ? "badge-success" : "badge-neutral"}`}>
                    {book.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    {book.status === "Pending" && (
                      <button onClick={() => unpublish(book._id)} className="btn btn-warning btn-sm">
                        <EyeOff size={18} /> Unpublish
                      </button>
                    )}
                    <button onClick={() => deleteBook(book._id)} className="btn btn-error btn-sm">
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