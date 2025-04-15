import React from "react";
import { motion } from "framer-motion";

const ParentDashboard = () => {
  const studentName = "Aman Jain";
  const attendanceData = {
    Mathematics: 92,
    Science: 87,
    English: 94,
    History: 89,
    Geography: 90,
  };

  const colors = [
    "from-blue-100 to-blue-200",
    "from-green-100 to-green-200",
    "from-yellow-100 to-yellow-200",
    "from-purple-100 to-purple-200",
    "from-pink-100 to-pink-200",
  ];

  return (
    <div className="p-6 min-h-screen bg-gradient-to-tr from-[#fdfbfb] to-[#ebedee]">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        {studentName}'s Attendance
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(attendanceData).map(([subject, attendance], index) => (
          <motion.div
            key={subject}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className={`rounded-xl p-4 text-gray-800 bg-gradient-to-br ${
              colors[index % colors.length]
            } shadow-md hover:shadow-lg transition-all`}
          >
            <h3 className="text-md font-bold">{subject}</h3>
            <p className="text-3xl font-bold mt-2">{attendance}%</p>
            <p className="text-sm text-gray-600">Attendance</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ParentDashboard;
