"use client";

const transactions = [
  { id: "TRX-8921", user: "anuj@example.com", librarian: "sara@example.com", amount: 13.20, date: "2025-06-20" },
  { id: "TRX-8920", user: "rahim@example.com", librarian: "sara@example.com", amount: 9.99, date: "2025-06-19" },
  { id: "TRX-8919", user: "anuj@example.com", librarian: "librarian1@example.com", amount: 15.50, date: "2025-06-18" },
];

export default function Transactions() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">All Transactions</h1>
      <div className="bg-base-200 rounded-3xl overflow-hidden border border-base-300">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>User</th>
              <th>Librarian</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b border-base-300 hover:bg-base-100">
                <td className="font-mono">{t.id}</td>
                <td>{t.user}</td>
                <td>{t.librarian}</td>
                <td className="font-semibold">${t.amount}</td>
                <td>{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}