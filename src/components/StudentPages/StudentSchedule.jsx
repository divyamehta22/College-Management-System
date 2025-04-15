import React, { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, ListFilter } from "lucide-react";

const schedule = [
  { day: "Monday", time: "9:00 AM - 10:00 AM", subject: "Mathematics", teacher: "Mr. Sharma" },
  { day: "Monday", time: "10:15 AM - 11:15 AM", subject: "Physics", teacher: "Mrs. Mehta" },
  { day: "Tuesday", time: "9:00 AM - 10:00 AM", subject: "Chemistry", teacher: "Mr. Rakesh" },
  { day: "Wednesday", time: "11:30 AM - 12:30 PM", subject: "English", teacher: "Ms. Anjali" },
  { day: "Thursday", time: "10:15 AM - 11:15 AM", subject: "Computer Science", teacher: "Mr. Raj" },
  { day: "Friday", time: "12:45 PM - 1:45 PM", subject: "Mathematics", teacher: "Mr. Sharma" },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const StudentSchedule = () => {
  const [filterToday, setFilterToday] = useState(false);

  const getToday = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date().getDay()];
  };

  const today = getToday();

  const filteredSchedule = filterToday
    ? schedule.filter((item) => item.day === today)
    : schedule;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-purple-700"
        >
          {filterToday ? "Today's Classes" : "Weekly Class Schedule"}
        </motion.h1>

        <button
          onClick={() => setFilterToday((prev) => !prev)}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          <ListFilter size={18} />
          {filterToday ? "Show All" : "Today’s Classes"}
        </button>
      </div>

      {filteredSchedule.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500"
        >
          No classes scheduled for today.
        </motion.p>
      ) : (
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {filteredSchedule.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white shadow-md rounded-xl p-4 border-l-4 border-purple-500 hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">{item.subject}</h2>
                  <p className="text-sm text-gray-500">{item.teacher}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{item.day}</p>
                  <p className="font-medium text-purple-700">{item.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default StudentSchedule;
