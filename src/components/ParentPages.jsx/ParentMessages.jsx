import React, { useState } from "react";
import { motion } from "framer-motion";
import { SendHorizonal, Bell } from "lucide-react";

const mockChats = [
  {
    id: 1,
    teacher: "Mr. Sharma",
    messages: [
      { text: "Your child is doing great!", sender: "teacher" },
      { text: "Thank you, sir!", sender: "parent" },
    ],
    hasNotification: true,
  },
  {
    id: 2,
    teacher: "Mrs. Mehta",
    messages: [
      { text: "Maths test is on Monday.", sender: "teacher" },
      { text: "Got it!", sender: "parent" },
    ],
    hasNotification: false,
  },
];

const ParentChat = () => {
  const [activeChat, setActiveChat] = useState(mockChats[0]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      const updatedChat = {
        ...activeChat,
        messages: [...activeChat.messages, { text: input, sender: "parent" }],
      };
      const updatedChats = mockChats.map((chat) =>
        chat.id === activeChat.id ? updatedChat : chat
      );
      setActiveChat(updatedChat);
      setInput("");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Chat List */}
      <div className="md:col-span-1 bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-indigo-600 text-white p-4 font-semibold text-lg">
          Teachers
        </div>
        <div className="divide-y">
          {mockChats.map((chat) => (
            <div
              key={chat.id}
              className={`flex justify-between items-center px-4 py-3 cursor-pointer transition-all duration-300 hover:bg-indigo-100 ${
                chat.id === activeChat.id ? "bg-indigo-50" : ""
              }`}
              onClick={() => setActiveChat(chat)}
            >
              <span className="text-gray-800 font-medium">{chat.teacher}</span>
              {chat.hasNotification && (
                <Bell className="w-4 h-4 text-red-500 animate-ping" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Active Chat */}
      <motion.div
        layout
        className="md:col-span-3 bg-white rounded-xl shadow-md flex flex-col"
      >
        <div className="bg-indigo-600 text-white px-4 py-3 font-semibold text-lg">
          Chat with {activeChat.teacher}
        </div>
        <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[400px]">
          {activeChat.messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[70%] px-4 py-2 rounded-xl shadow text-sm ${
                msg.sender === "parent"
                  ? "bg-indigo-100 self-end ml-auto"
                  : "bg-gray-100 self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 p-4 border-t">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-300"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition"
          >
            <SendHorizonal className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ParentChat;
