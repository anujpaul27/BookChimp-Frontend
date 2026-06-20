"use client";

import { motion } from "framer-motion";
import { TrendingUp, BookOpen } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

import DeliveryHistory from "./delivery-history/page";
import MyReadingList from "./my-reading-list/page";
import MyReviews from "./my-reviews/page";

// Mock Data (Move to API later)
const quickStats = [
  { title: "Books Read", value: "47", icon: BookOpen, color: "text-primary" },
  { title: "Pending Deliveries", value: "3", icon: TrendingUp, color: "text-warning" },
  { title: "Total Spent", value: "$184", icon: BookOpen, color: "text-success" },
];

const readingTrend = [
  { month: "Jan", books: 4 }, { month: "Feb", books: 7 }, { month: "Mar", books: 5 },
  { month: "Apr", books: 9 }, { month: "May", books: 6 }, { month: "Jun", books: 11 },
];

const statusData = [
  { name: "Delivered", value: 42, color: "#C17D3C" },
  { name: "Pending", value: 3, color: "#F4A261" },
  { name: "Returned", value: 28, color: "#A08060" },
];

export default function UserDashboard() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">Welcome back, Anuj 👋</h1>
        <p className="text-base-content/70 mt-1">Here's what's happening with your books</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-base-200 rounded-2xl p-6 flex items-center gap-5 border border-base-300"
          >
            <div className={`w-14 h-14 rounded-xl bg-base-100 flex items-center justify-center ${stat.color}`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-base-content/70">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-base-200 rounded-3xl p-6 border border-base-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <TrendingUp size={22} /> Reading Trend
            </h2>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={readingTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3D2F1F" />
                <XAxis dataKey="month" stroke="#A08060" />
                <YAxis stroke="#A08060" />
                <Tooltip />
                <Line type="natural" dataKey="books" stroke="#C17D3C" strokeWidth={4} dot={{ fill: "#C17D3C", r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-base-200 rounded-3xl p-6 border border-base-300">
          <h2 className="text-xl font-semibold mb-6">Delivery Status</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} dataKey="value">
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Sections */}
      <DeliveryHistory />
      <MyReadingList />
      <MyReviews />
    </div>
  );
}