import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, CalendarCheck } from "lucide-react";

const dummyStudents = [
  { id: 1, name: "Amit Sharma", present: true },
  { id: 2, name: "Riya Mehta", present: false },
  { id: 3, name: "Mohit Verma", present: true },
  { id: 4, name: "Priya Singh", present: false },
  { id: 5, name: "Rahul Yadav", present: true },
];

export default function StaffAttendance() {
  const [students, setStudents] = useState(dummyStudents);

  const toggleAttendance = (id) => {
    const updated = students.map((student) =>
      student.id === id ? { ...student, present: !student.present } : student
    );
    setStudents(updated);
  };

  const totalPresent = students.filter((s) => s.present).length;
  const totalAbsent = students.length - totalPresent;

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <CalendarCheck className="text-green-600 w-6 h-6" />
        <h2 className="text-2xl font-bold text-gray-800">Attendance Management</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-100 text-green-700 font-semibold p-4 rounded-lg shadow text-center">
          Present: {totalPresent}
        </div>
        <div className="bg-red-100 text-red-700 font-semibold p-4 rounded-lg shadow text-center">
          Absent: {totalAbsent}
        </div>
        <div className="bg-blue-100 text-blue-700 font-semibold p-4 rounded-lg shadow text-center col-span-2 md:col-span-1">
          Total: {students.length}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {students.map((student) => (
          <motion.div
            key={student.id}
            whileHover={{ scale: 1.02 }}
            className={`flex items-center justify-between p-4 rounded-xl shadow-md ${
              student.present ? "bg-green-50" : "bg-red-50"
            } border-l-4 ${
              student.present ? "border-green-500" : "border-red-500"
            }`}
          >
            <div>
              <div className="text-lg font-medium text-gray-800">{student.name}</div>
              <div className="text-sm text-gray-500">
                Status:{" "}
                <span className={student.present ? "text-green-600" : "text-red-600"}>
                  {student.present ? "Present" : "Absent"}
                </span>
              </div>
            </div>
            <button
              className={`px-4 py-2 rounded font-semibold transition ${
                student.present
                  ? "bg-red-100 text-red-700 hover:bg-red-200"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
              onClick={() => toggleAttendance(student.id)}
            >
              {student.present ? (
                <XCircle className="w-5 h-5" />
              ) : (
                <CheckCircle className="w-5 h-5" />
              )}
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
