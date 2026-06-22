"use client";

import { useState } from "react";
import { Trash2, UserCog } from "lucide-react";
import { toast } from "react-toastify";

const initialUsers = [
  { id: 1, name: "Anuj Paul", email: "anuj@example.com", role: "user" },
  { id: 2, name: "Sara Khan", email: "sara@example.com", role: "librarian" },
  { id: 3, name: "Rahim Uddin", email: "rahim@example.com", role: "user" },
];

export default function ManageUsers() {
  const [users, setUsers] = useState(initialUsers);

  const changeRole = (id, newRole) => {
    setUsers(users.map(user => user.id === id ? { ...user, role: newRole } : user));
    toast.success(`Role updated to ${newRole}`);
  };

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
    toast.error("User deleted");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Users</h1>
      <div className="bg-base-200 rounded-3xl overflow-hidden border border-base-300">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-base-300 hover:bg-base-100">
                <td className="font-medium">{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge ${user.role === 'admin' ? 'badge-error' : user.role === 'librarian' ? 'badge-warning' : 'badge-success'}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <select
                      className="select select-bordered select-sm"
                      value={user.role}
                      onChange={(e) => changeRole(user.id, e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="librarian">Librarian</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button onClick={() => deleteUser(user.id)} className="btn btn-ghost btn-sm text-error">
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