"use client";

const deliveryHistory = [
  { id: 1, title: "The Midnight Library", fee: 4.99, date: "2025-06-12", status: "Delivered" },
  { id: 2, title: "Atomic Habits", fee: 3.50, date: "2025-06-08", status: "Pending" },
  { id: 3, title: "Project Hail Mary", fee: 5.99, date: "2025-06-01", status: "Delivered" },
];

export default function DeliveryHistory() {
  return (
    <div id="deliveries" className="bg-base-200 rounded-3xl p-6 border border-base-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Delivery History</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="border-b border-base-300">
              <th>Book Title</th>
              <th>Fee</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {deliveryHistory.map((item) => (
              <tr key={item.id} className="border-b border-base-300 hover:bg-base-100">
                <td className="font-medium">{item.title}</td>
                <td>${item.fee}</td>
                <td>{item.date}</td>
                <td>
                  <span className={`badge ${item.status === "Delivered" ? "badge-success" : "badge-warning"}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}