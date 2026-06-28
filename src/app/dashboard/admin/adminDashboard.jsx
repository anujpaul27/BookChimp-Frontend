"use client";

import { authClient } from "@/app/(auth)/lib/auth-client";
import { motion } from "framer-motion";
import { Users, BookOpen, Truck, DollarSign } from "lucide-react";
import { redirect } from "next/navigation";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip
} from "recharts";



const categoryData = [
  { name: "Fiction", value: 45, color: "#C17D3C" },
  { name: "Non-Fiction", value: 25, color: "#A08060" },
  { name: "Sci-Fi", value: 15, color: "#F4A261" },
  { name: "Mystery", value: 10, color: "#E76F51" },
  { name: "Biography", value: 5, color: "#2A9D8F" },
];

const revenueTrend = [
  { month: "Jan", revenue: 4200 }, { month: "Feb", revenue: 5100 },
  { month: "Mar", revenue: 4800 }, { month: "Apr", revenue: 6300 },
  { month: "May", revenue: 7200 }, { month: "Jun", revenue: 8100 },
];

export default function AdminDashboard({allUserLength,lengthOfBooks}) {

  const quickStats = [
  { title: "Total Users", value: allUserLength, icon: Users, color: "text-primary" },
  { title: "Total Books", value: lengthOfBooks, icon: BookOpen, color: "text-success" },
  { title: "Total Deliveries", value: "892", icon: Truck, color: "text-info" },
  { title: "Total Revenue", value: "$48,291", icon: DollarSign, color: "text-warning" },
];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-base-content/70 mt-1">Platform Overview & Control</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-base-200 rounded-2xl p-6 border border-base-300 flex items-center gap-5"
          >
            <div className={`w-12 h-12 rounded-2xl bg-base-100 flex items-center justify-center ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-xs text-base-content/70">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Books by Category */}
        <div className="bg-base-200 rounded-3xl p-6 border border-base-300">
          <h2 className="text-xl font-semibold mb-6">Books by Category</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={80} outerRadius={130} dataKey="value">
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Trend */}
        <div className="bg-base-200 rounded-3xl p-6 border border-base-300">
          <h2 className="text-xl font-semibold mb-6">Revenue Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3D2F1F" />
                <XAxis dataKey="month" stroke="#A08060" />
                <YAxis stroke="#A08060" />
                <Tooltip />
                <Bar dataKey="revenue" fill="#C17D3C" radius={8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}