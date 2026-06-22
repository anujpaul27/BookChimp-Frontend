"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LogOut,
  Users,
  LayoutDashboard,
  Package,
  BookOpen,
  Star,
  ClipboardList,
  ShieldCheck,
  BarChart2,
} from "lucide-react";
import { motion } from "framer-motion";
import { authClient } from "../(auth)/lib/auth-client";
import Image from "next/image";

const user = [
  { label: "Overview", href: "/dashboard/user", icon: LayoutDashboard },
  {
    label: "Pending Deliveries",
    href: "/dashboard/user/delivery-history",
    icon: Package,
  },
  {
    label: "Reading List",
    href: "/dashboard/user/my-reading-list",
    icon: BookOpen,
  },
  { label: "My Reviews", href: "/dashboard/user/my-reviews", icon: Star },
];

const librarian = [
  {
    label: "Overview",
    href: "/dashboard/librarian",
    icon: LayoutDashboard,
  },
  {
    label: "Add Book",
    href: "/dashboard/librarian/add-book",
    icon: BookOpen,
  },
  {
    label: "Manage Inventory",
    href: "/dashboard/librarian/manage-inventory",
    icon: Package,
  },
  {
    label: "Manage Deliveries",
    href: "/dashboard/librarian/manage-deliveries",
    icon: ClipboardList,
  },
];

const admin = [
  { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  {
    label: "Approval Queue",
    href: "/dashboard/admin-queue",
    icon: ShieldCheck,
  },
  { label: "Manage Users", href: "/dashboard/admin-users", icon: Users },
  { label: "All Books", href: "/dashboard/admin-books", icon: BookOpen },
  {
    label: "Transactions",
    href: "/dashboard/admin-transactions",
    icon: BarChart2,
  },
];

export default function SeekerLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // 1. Fetch session from Better Auth
  const { data: session, isPending } = authClient.useSession();
  // 2. Determine role dynamically
  const role = session?.user?.role || "user"; // Ensure 'role' is in your user schema

  // 3. Select items based on role (default to empty or a loader)
  const navItems =
    role === "user"
      ? user
      : role === "librarian"
        ? librarian
        : role === "admin"
          ? admin
          : [];

  return (
    <div className="min-h-screen bg-base-200 flex">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-72" : "w-20"} bg-base-100 border-r border-base-300 transition-all duration-300`}
      >
        <nav className="p-4">
          {}
          {isPending ? (
            <div className="mx-auto my-auto ">Loading...</div>
          ) : (
            navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all ${isActive ? "bg-primary text-white" : "hover:bg-base-200"}`}
                >
                  <item.icon size={20} />
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              );
            })
          )}
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <button className="flex items-center gap-3 text-red-500 hover:bg-base-200 w-full px-4 py-3 rounded-xl">
            <LogOut size={20} />
            {sidebarOpen && "Logout"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-base-100 border-b border-base-300 px-8 py-5 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="btn btn-ghost"
          >
            ☰
          </button>
          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-9 h-9 rounded-full">
                <Image
                src={session?.user?.image || '/avatar.png'}
                alt="user profile"
                width={34}
                height={34}
                loading="lazy"
                />
              </div>
            </div>
            <div>
              <p className="font-medium">{session?.user?.name}</p>
            </div>
          </div>
        </header>

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
