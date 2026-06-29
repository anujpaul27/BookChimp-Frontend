"use client";

import { useState, useEffect } from "react";
import { Trash2, UserCog, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/app/(auth)/lib/auth-client";
import { UpdateOrDelete } from "@/components/lib/getData";

export default function ManageUsers({ initialUsers,token }) {
  const [users, setUsers] = useState(initialUsers);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // For specific user actions

  // Update User Role
  const changeRole = async (userId, newRole) => {
    if (!userId) return;

    setActionLoading(userId);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/change-role/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization:token
        },
        body: JSON.stringify({
          role: newRole,
        }),
      });

      // Optimistic update
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user,
        ),
      );

      toast.success(`Role updated to ${newRole}`);
    } catch (err) {
      toast.error("Failed to update role");
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  // Delete User
  const deleteUser = async (userId) => {
    if (!confirm("Are you sure you want to permanently delete this user?"))
      return;

    setActionLoading(userId);
    try {
      
      const res = await UpdateOrDelete(`/user/delete/${userId}`,'delete',token)

      if (res)
      {
        setUsers(users.filter((user) => user._id !== userId));
      toast.success("User deleted successfully");
      }
      else 
      {
        toast.error('Delete failed')
      }
    } catch (err) {
      toast.error("Failed to delete user");
      console.error(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-96">
  //       <Loader2 className="animate-spin w-10 h-10 text-primary" />
  //     </div>
  //   );
  // }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Users</h1>
      </div>

      <div className="bg-base-200 rounded-3xl overflow-hidden border border-base-300">
        <table className="table w-full">
          <thead>
            <tr className="border-b border-base-300">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-12 text-base-content/60"
                >
                  No users found
                </td>
              </tr>
            ) : (
              users?.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-base-300 hover:bg-base-100"
                >
                  <td className="font-medium">{user?.name || "—"}</td>
                  <td className="font-mono text-sm">{user?.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        user?.role === "admin"
                          ? "badge-error"
                          : user?.role === "librarian"
                            ? "badge-warning"
                            : "badge-success"
                      }`}
                    >
                      {user?.role || "user"}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <select
                        className="select select-bordered select-sm"
                        value={user.role || "user"}
                        onChange={(e) => changeRole(user._id, e.target.value)}
                        disabled={actionLoading === user._id}
                      >
                        <option value="user">User</option>
                        <option value="librarian">Librarian</option>
                        <option value="admin">Admin</option>
                      </select>

                      <button
                        onClick={() => deleteUser(user._id)}
                        disabled={actionLoading === user._id}
                        className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                      >
                        {actionLoading === user._id ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </div>
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
