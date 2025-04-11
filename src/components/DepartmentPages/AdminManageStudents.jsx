import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Mail, User, School } from "lucide-react";

const studentData = [
  {
    name: "Alice Johnson",
    email: "alice@student.edu",
    department: "Computer Science",
    year: "2nd Year",
  },
  {
    name: "Bob Martin",
    email: "bob@student.edu",
    department: "Mechanical",
    year: "3rd Year",
  },
  {
    name: "Clara Lee",
    email: "clara@student.edu",
    department: "Electronics",
    year: "1st Year",
  },
];

const AdminManageStudents = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddStudent = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-green-600">Manage Students</h2>
        <button
          className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded shadow-md hover:scale-105 transition transform duration-200"
          onClick={handleAddStudent}
        >
          + Add Student
        </button>
      </div>

      {showForm && (
        <div className="bg-white border p-4 rounded shadow mb-6">
          <h3 className="text-lg font-semibold mb-2">Add New Student</h3>
          {/* Sample form */}
          <input
            type="text"
            placeholder="Name"
            className="border px-3 py-2 rounded w-full mb-2"
          />
          <input
            type="email"
            placeholder="Email"
            className="border px-3 py-2 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Department"
            className="border px-3 py-2 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Year"
            className="border px-3 py-2 rounded w-full mb-2"
          />
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={closeForm}
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Save
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {studentData.map((student, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-4 rounded-2xl shadow-md border hover:shadow-lg transition duration-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-blue-700">
                <User className="w-5 h-5" />
                {student.name}
              </h3>
              <Trash2 className="text-red-500 hover:text-red-700 cursor-pointer w-5 h-5" />
            </div>
            <div className="text-gray-700 space-y-1 mt-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4" />
                {student.email}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <School className="w-4 h-4" />
                {student.department}
              </div>
              <div className="flex items-center gap-2 text-sm">
                📚 {student.year}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminManageStudents;
