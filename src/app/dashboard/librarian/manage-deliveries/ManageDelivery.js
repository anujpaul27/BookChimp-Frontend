"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function ManageDeliveries({ allOrders }) {
  const [deliveries, setDeliveries] = useState(allOrders);
  const [loadingId, setLoadingId] = useState("");

  const updateStatus = async (id, newStatus) => {
    try {
      setLoadingId(id);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/order/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      setDeliveries((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                status: newStatus,
              }
            : item
        )
      );

      toast.success(data.message || "Status updated successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingId("");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Deliveries</h1>

      <div className="bg-base-200 rounded-3xl overflow-hidden border border-base-300">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Book</th>
              <th>Author</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {deliveries?.map((item) =>
              item.products.map((book) => (
                <tr
                  key={book._id}
                  className="border-b border-base-300 hover:bg-base-100"
                >
                  <td>{item._id}</td>

                  <td className="font-medium">{book.title}</td>

                  <td>{book.author}</td>

                  <td>
                    <span
                      className={`badge ${
                        item.status === "Delivered"
                          ? "badge-success"
                          : item.status === "Dispatched"
                          ? "badge-info"
                          : "badge-warning"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <select
                      className="select select-bordered select-sm"
                      value={item.status}
                      disabled={loadingId === item._id}
                      onChange={(e) =>
                        updateStatus(item._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}