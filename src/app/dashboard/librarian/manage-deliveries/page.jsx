"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const initialDeliveries = [
  { id: 1, client: "Anuj Paul", book: "The Midnight Library", date: "2025-06-18", status: "Pending" },
  { id: 2, client: "Riya Khan", book: "Atomic Habits", date: "2025-06-17", status: "Dispatched" },
  { id: 3, client: "Samiul Islam", book: "Project Hail Mary", date: "2025-06-15", status: "Delivered" },
];

export default function ManageDeliveries() {
  const [deliveries, setDeliveries] = useState(initialDeliveries);

  const updateStatus = (id, newStatus) => {
    setDeliveries(deliveries.map(d => 
      d.id === id ? { ...d, status: newStatus } : d
    ));
    toast.success(`Status updated to ${newStatus}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Deliveries</h1>
      
      <div className="bg-base-200 rounded-3xl overflow-hidden border border-base-300">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Client</th>
              <th>Book</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((item) => (
              <tr key={item.id} className="border-b border-base-300 hover:bg-base-100">
                <td>{item.client}</td>
                <td className="font-medium">{item.book}</td>
                <td>{item.date}</td>
                <td>
                  <span className={`badge ${
                    item.status === "Delivered" ? "badge-success" :
                    item.status === "Dispatched" ? "badge-info" : "badge-warning"
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <select 
                    className="select select-bordered select-sm"
                    value={item.status}
                    onChange={(e) => updateStatus(item.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}