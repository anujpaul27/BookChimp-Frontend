"use client";

import { useState } from "react";
import { Trash2, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { UpdateOrDelete } from "@/components/lib/getData";


export default function ManageAllBooks({allBooks}) {
  const [books, setBooks] = useState(allBooks);

  const unpublish = (id) => {
    try 
    {
      const res = UpdateOrDelete(`/book/unpublish-book/${id}`,"PATCH")
      if (res)
      {
        setBooks(books.map(b => b._id === id ? { ...b, status: "Unpublish" } : b));
        toast.success("Book unpublished successful.");
      }
      else 
      {
        toast.error("Book unpublished failed!.");
      }
    }
    catch (err)
    {
      console.log(err.message );
    }
  };

  const deleteBook = (id) => {
    try
    {
      const res = UpdateOrDelete(`/book/book-delete/${id}`,'delete')
      if (res)
      {
        setBooks(books.filter(b => b._id !== id));
        toast.error("Book permanently deleted");
      }
      else 
      {
        toast.error("Book delete failed!.");
      }
    }
    catch (err)
    {
      console.log(err.message);
    }
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
              <tr key={book._id} className="border-b border-base-300 hover:bg-base-100">
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