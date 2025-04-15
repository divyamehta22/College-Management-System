import React from "react";
import { motion } from "framer-motion";
import { User, Mail, School } from "lucide-react";

const students = [
  { id: 1, name: "Riya Patel", email: "riya@student.edu", class: "10-A", rollNo: "101" },
  { id: 2, name: "Aman Gupta", email: "aman@student.edu", class: "10-B", rollNo: "102" },
  { id: 3, name: "Simran Kaur", email: "simran@student.edu", class: "9-C", rollNo: "103" },
];

export default function StaffViewAllStudents() {
  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-blue-700 mb-6">All Students</h2>

      {/* Table view for large screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border rounded-lg shadow-sm bg-white">
          <thead className="bg-blue-50 text-blue-600 font-semibold">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Class</th>
              <th className="p-3 text-left">Roll No</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <motion.tr
                key={student.id}
                className="border-b hover:bg-blue-50 transition"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <td className="p-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-500" /> {student.name}
                </td>
                <td className="p-3">
                  <Mail className="w-4 h-4 inline text-blue-400 mr-1" />
                  {student.email}
                </td>
                <td className="p-3">
                  <School className="w-4 h-4 inline text-indigo-500 mr-1" />
                  {student.class}
                </td>
                <td className="p-3">{student.rollNo}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view for small screens */}
      <div className="md:hidden space-y-4">
        {students.map((student, index) => (
          <motion.div
            key={student.id}
            className="bg-white p-4 rounded-xl shadow-md border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="text-lg font-semibold flex items-center gap-2 text-blue-700">
              <User className="w-4 h-4" />
              {student.name}
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-500" /> {student.email}
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <School className="w-4 h-4 text-indigo-500" /> Class: {student.class}
            </p>
            <p className="text-sm text-gray-600">Roll No: {student.rollNo}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
