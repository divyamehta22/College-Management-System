import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

const StaffDashboard = () => {
  const totalStudents = 120; // static for now

  return (
    <div className="p-4 sm:p-6 w-full">
      <h2 className="text-2xl font-semibold mb-6">Staff Dashboard</h2>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-2xl shadow-xl flex items-center justify-between"
      >
        <div>
          <h3 className="text-lg font-medium">Total Students Assigned</h3>
          <p className="text-3xl font-bold mt-2">{totalStudents}</p>
        </div>
        <Users className="w-12 h-12 opacity-80" />
      </motion.div>
    </div>
  );
};

export default StaffDashboard;
