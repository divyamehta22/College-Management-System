import React, { useEffect, useState } from "react";
import { Users, GraduationCap, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ staff: 0, students: 0, subjects: 0 });
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const API = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && data.status === "success") {
          setStats({
            staff: data.data.staff,
            students: data.data.students,
            subjects: data.data.subjects,
          });
        } else {
          console.error("API error:", data.message);
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };

    fetchStats();
  }, [token]);

  const dashboardCards = [
    {
      title: "Total Staff",
      value: stats.staff,
      icon: <Users className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-r from-purple-500 to-indigo-500",
    },
    {
      title: "Total Students",
      value: stats.students,
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-r from-pink-500 to-red-500",
    },
    {
      title: "Courses Offered",
      value: stats.subjects,
      icon: <BookOpen className="w-6 h-6 text-white" />,
      bg: "bg-gradient-to-r from-teal-500 to-green-500",
    },
  ];

  // Example chart data (can be replaced with future API values)
  const monthlyData = [
    { month: "Jan", students: 280 },
    { month: "Feb", students: 290 },
    { month: "Mar", students: 310 },
    { month: "Apr", students: 320 },
    { month: "May", students: 315 },
    { month: "Jun", students: 330 },
  ];

  const subjectData = [
    { subject: "Math", students: 80 },
    { subject: "Physics", students: 65 },
    { subject: "Chemistry", students: 60 },
    { subject: "Biology", students: 45 },
    { subject: "Computer", students: 70 },
  ];

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Overview</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {dashboardCards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`rounded-2xl shadow-md p-4 text-white ${card.bg}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-lg font-semibold">{card.title}</div>
              <div className="bg-white/20 p-2 rounded-full">{card.icon}</div>
            </div>
            <div className="text-3xl font-bold">{card.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Line Chart */}
      <div className="bg-white rounded-2xl shadow p-6 mb-10">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Student Growth (Last 6 Months)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="students"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Students per Subject</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={subjectData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
