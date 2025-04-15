import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus } from "lucide-react";

const CollegeDepartments = () => {
  const [departments, setDepartments] = useState([
    { id: 1, name: "Computer Science", teachers: 10, students: 120 },
    { id: 2, name: "Mechanical Engineering", teachers: 8, students: 100 },
    { id: 3, name: "Electronics & Communication", teachers: 9, students: 110 },
  ]);
  const [newDept, setNewDept] = useState("");

  const addDepartment = () => {
    if (newDept.trim()) {
      setDepartments([
        ...departments,
        {
          id: Date.now(),
          name: newDept.trim(),
          teachers: Math.floor(Math.random() * 10) + 5,
          students: Math.floor(Math.random() * 100) + 50,
        },
      ]);
      setNewDept("");
    }
  };

  const deleteDepartment = (id) => {
    setDepartments(departments.filter((dept) => dept.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Manage Departments</h2>

      {/* Input to add department */}
      <div className="flex items-center space-x-2 mb-6">
        <input
          value={newDept}
          onChange={(e) => setNewDept(e.target.value)}
          placeholder="Enter new department"
          className="border rounded-lg px-4 py-2 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addDepartment}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="mr-1" size={18} /> Add
        </button>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((dept) => (
          <motion.div
            key={dept.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-br from-white to-blue-50 shadow-md border border-gray-200 p-5 rounded-xl"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">{dept.name}</h3>
              <button
                onClick={() => deleteDepartment(dept.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p><span className="font-medium text-blue-700">Teachers:</span> {dept.teachers}</p>
              <p><span className="font-medium text-green-700">Students:</span> {dept.students}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CollegeDepartments;
