import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, Phone, IdCard, GraduationCap, Building2 } from "lucide-react";

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [departmentName, setDepartmentName] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.student) {
      setStudent(userData.student);
      if (userData.student?.department_id && userData.student?.department) {
        setDepartmentName(userData.student.department.name);
      }
    }
  }, []);

  if (!student) return <p className="p-6 text-gray-600">Loading student info...</p>;

  const cardInfo = [
    {
      label: "Roll Number",
      value: student.roll_number,
      icon: <IdCard className="text-white w-6 h-6" />, 
      bg: "bg-gradient-to-r from-purple-500 to-indigo-600",
    },
    {
      label: "Semester",
      value: `Semester ${student.semester}`,
      icon: <GraduationCap className="text-white w-6 h-6" />, 
      bg: "bg-gradient-to-r from-pink-500 to-red-500",
    },
    {
      label: "Address",
      value: student.address,
      icon: <Home className="text-white w-6 h-6" />, 
      bg: "bg-gradient-to-r from-yellow-500 to-orange-500",
    },
    {
      label: "Phone",
      value: student.phone,
      icon: <Phone className="text-white w-6 h-6" />, 
      bg: "bg-gradient-to-r from-teal-500 to-green-500",
    },
    {
      label: "Department",
      value: departmentName || "Computer Science",
      icon: <Building2 className="text-white w-6 h-6" />,
      bg: "bg-gradient-to-r from-blue-500 to-cyan-500",
    },
  ];

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Student Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {cardInfo.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`rounded-2xl p-6 text-white shadow-lg flex items-center justify-between ${card.bg}`}
          >
            <div>
              <h4 className="text-sm font-medium mb-1">{card.label}</h4>
              <p className="text-xl font-bold">{card.value}</p>
            </div>
            <div className="p-2 bg-white/20 rounded-full">{card.icon}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;