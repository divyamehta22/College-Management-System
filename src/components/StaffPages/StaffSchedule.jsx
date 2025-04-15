import React from "react";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

const scheduleData = [
  { day: "Monday", time: "9:00 AM - 10:00 AM", subject: "Physics", room: "101" },
  { day: "Monday", time: "11:00 AM - 12:00 PM", subject: "Mathematics", room: "202" },
  { day: "Tuesday", time: "10:00 AM - 11:00 AM", subject: "Chemistry", room: "103" },
  { day: "Wednesday", time: "1:00 PM - 2:00 PM", subject: "Biology", room: "104" },
  { day: "Thursday", time: "10:00 AM - 11:00 AM", subject: "English", room: "205" },
  { day: "Friday", time: "2:00 PM - 3:00 PM", subject: "Computer", room: "Lab A" },
];

export default function StaffSchedule() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <CalendarDays className="text-purple-600 w-6 h-6" />
        <h2 className="text-2xl font-bold text-gray-800">My Schedule</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {scheduleData.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white shadow-md border-l-4 border-purple-500 rounded-xl p-4 space-y-2"
          >
            <div className="text-lg font-semibold text-gray-800">{item.subject}</div>
            <div className="text-sm text-gray-600">
              <strong>Day:</strong> {item.day}
            </div>
            <div className="text-sm text-gray-600">
              <strong>Time:</strong> {item.time}
            </div>
            <div className="text-sm text-gray-600">
              <strong>Room:</strong> {item.room}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
