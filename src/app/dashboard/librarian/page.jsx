"use client";

import { motion } from "framer-motion";
import { BookOpen, DollarSign, Clock, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const quickStats = [
  {
    title: "Total Books Listed",
    value: "124",
    icon: BookOpen,
    color: "text-primary",
  },
  {
    title: "Total Earnings",
    value: "$1,284",
    icon: DollarSign,
    color: "text-success",
  },
  {
    title: "Pending Requests",
    value: "17",
    icon: Clock,
    color: "text-warning",
  },
];

const earningsTrend = [
  { month: "Jan", earnings: 180 },
  { month: "Feb", earnings: 240 },
  { month: "Mar", earnings: 310 },
  { month: "Apr", earnings: 290 },
  { month: "May", earnings: 420 },
  { month: "Jun", earnings: 380 },
];

const topRequested = [
  { title: "The Midnight Library", requests: 24 },
  { title: "Atomic Habits", requests: 19 },
  { title: "Project Hail Mary", requests: 15 },
  { title: "Dune Messiah", requests: 12 },
];

export default function LibrarianDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Librarian Dashboard</h1>
        <p className="text-base-content/70 mt-1">
          Manage your books and deliveries
        </p>
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
            <div
              className={`w-14 h-14 rounded-xl bg-base-100 flex items-center justify-center ${stat.color}`}
            >
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-base-content/70">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Trend */}
        <div className="bg-base-200 rounded-3xl p-6 border border-base-300">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <TrendingUp size={22} /> Earnings Trend
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={earningsTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3D2F1F" />
                <XAxis dataKey="month" stroke="#A08060" />
                <YAxis stroke="#A08060" />
                <Tooltip />
                <Line
                  type="natural"
                  dataKey="earnings"
                  stroke="#C17D3C"
                  strokeWidth={4}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Requested Books */}
        <div className="bg-base-200 rounded-3xl p-6 border border-base-300">
          <h2 className="text-xl font-semibold mb-6">Most Requested Books</h2>
          <div className="space-y-4">
            {topRequested.map((book, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-base-100 p-4 rounded-xl"
              >
                <span className="font-medium">{book.title}</span>
                <span className="badge badge-primary">
                  {book.requests} requests
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
