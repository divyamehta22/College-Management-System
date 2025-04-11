// src/components/Pages/AdminDashboard.jsx
import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const data = [
  { department: "Computer Science", students: 120 },
  { department: "Business Admin", students: 100 },
  { department: "Engineering", students: 95 },
  { department: "Arts & Design", students: 70 },
  { department: "Medicine", students: 50 },
];

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 shadow rounded-xl">
            <h2 className="text-gray-500 text-sm">Total Students</h2>
            <p className="text-3xl font-bold mt-2">1,250</p>
          </div>
          <div className="bg-white p-4 shadow rounded-xl">
            <h2 className="text-gray-500 text-sm">Total Teachers</h2>
            <p className="text-3xl font-bold mt-2">87</p>
          </div>
          <div className="bg-white p-4 shadow rounded-xl">
            <h2 className="text-gray-500 text-sm">Upcoming Events</h2>
            <p className="text-3xl font-bold mt-2">12</p>
          </div>
        </div>

        {/* Chart: Students by Department */}
        <div className="bg-white p-4 shadow rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Students by Department</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart layout="vertical" data={data}>
              <XAxis type="number" />
              <YAxis type="category" dataKey="department" />
              <Tooltip />
              <Bar dataKey="students" fill="#6D28D9" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
