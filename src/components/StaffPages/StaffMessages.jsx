import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Send } from "lucide-react";

const students = [
  { id: 1, name: "Aman Sharma" },
  { id: 2, name: "Priya Singh" },
  { id: 3, name: "Rahul Mehta" },
];

const initialMessages = {
  1: [
    { sender: "parent", text: "Hello sir, how is Aman doing?" },
    { sender: "staff", text: "He is doing great, very attentive." },
  ],
  2: [],
  3: [],
};

export default function StaffMessages() {
  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [unread, setUnread] = useState({ 2: 1, 3: 2 }); // simulate unread messages

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const updated = {
      ...messages,
      [selectedStudent.id]: [
        ...(messages[selectedStudent.id] || []),
        { sender: "staff", text: newMessage },
      ],
    };
    setMessages(updated);
    setNewMessage("");
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setUnread({ ...unread, [student.id]: 0 });
  };

  return (
    <div className="flex h-[85vh] rounded-xl shadow bg-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/4 border-r bg-gradient-to-b from-blue-50 to-purple-50 p-4">
        <h2 className="text-lg font-semibold mb-4">Students</h2>
        <ul className="space-y-2">
          {students.map((student) => (
            <li
              key={student.id}
              className={`cursor-pointer px-3 py-2 rounded-md transition font-medium flex items-center justify-between ${
                selectedStudent.id === student.id
                  ? "bg-blue-200 text-blue-800"
                  : "hover:bg-blue-100"
              }`}
              onClick={() => handleSelectStudent(student)}
            >
              {student.name}
              {unread[student.id] > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 animate-bounce">
                  {unread[student.id]}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="w-3/4 p-4 flex flex-col">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold">
            Chat with {selectedStudent.name}'s Parent
          </h2>
          <Bell className="text-blue-500" />
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-gray-50 rounded">
          {(messages[selectedStudent.id] || []).map((msg, idx) => (
            <motion.div
              key={idx}
              className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow ${
                msg.sender === "staff"
                  ? "ml-auto bg-blue-100 text-blue-800"
                  : "mr-auto bg-gray-200"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {msg.text}
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition flex items-center gap-1"
          >
            <Send size={16} /> Send
          </button>
        </div>
      </div>
    </div>
  );
}
