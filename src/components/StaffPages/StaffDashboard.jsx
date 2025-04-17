import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

const StaffDashboard = () => {
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    const fetchStudentCount = async () => {
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/staff/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok && data.status === "success") {
          setStudentCount(data.data.students || 0);
        } else {
          console.error("Failed to fetch student count");
        }
      } catch (error) {
        console.error("Error fetching staff dashboard data:", error);
      }
    };

    fetchStudentCount();
  }, []);

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
          <p className="text-3xl font-bold mt-2">{studentCount}</p>
        </div>
        <Users className="w-12 h-12 opacity-80" />
      </motion.div>
    </div>
  );
};

export default StaffDashboard;
