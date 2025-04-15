import React from "react";
import { Building2, Users, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const cardVariants = {
  hover: { scale: 1.05 },
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const CollegeDashboard = () => {
  const stats = [
    {
      title: "Departments",
      value: 6,
      icon: <Building2 className="text-purple-600 w-8 h-8" />,
      bg: "bg-purple-100",
    },
    {
      title: "Staff Members",
      value: 42,
      icon: <Users className="text-green-600 w-8 h-8" />,
      bg: "bg-green-100",
    },
    {
      title: "Students",
      value: 560,
      icon: <GraduationCap className="text-blue-600 w-8 h-8" />,
      bg: "bg-blue-100",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">College Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            transition={{ duration: 0.4 }}
            className={`rounded-xl p-6 shadow-md flex items-center space-x-4 ${stat.bg} hover:shadow-xl transition`}
          >
            <div>{stat.icon}</div>
            <div>
              <div className="text-xl font-semibold text-gray-800">{stat.value}</div>
              <div className="text-gray-600">{stat.title}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CollegeDashboard;
