import React from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const subjects = [
  { name: "Mathematics", attendance: 88 },
  { name: "Physics", attendance: 92 },
  { name: "Chemistry", attendance: 85 },
  { name: "English", attendance: 90 },
  { name: "Computer Science", attendance: 95 },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-blue-700 mb-6 text-center"
      >
        Your Subject-wise Attendance
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {subjects.map((subject, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="rounded-2xl p-4 shadow-lg bg-white border-l-4 border-blue-500 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center space-x-3 mb-2">
              <BookOpen className="text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-700">
                {subject.name}
              </h2>
            </div>
            <p className="text-sm text-gray-600 mb-2">Attendance</p>
            <div className="text-xl font-bold text-blue-800">
              {subject.attendance}%
            </div>
            <div className="w-full bg-gray-200 h-2 mt-2 rounded">
              <div
                className="h-2 bg-blue-500 rounded"
                style={{ width: `${subject.attendance}%` }}
              ></div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default StudentDashboard;
