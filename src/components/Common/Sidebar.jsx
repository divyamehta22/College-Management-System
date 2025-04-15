import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

const Sidebar = ({ title, options, setActivePage, activePage, username }) => {
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-white via-slate-100 to-slate-200 shadow-xl border-r border-slate-300">
      <div className="p-5 text-xl font-bold text-indigo-600 border-b border-slate-300">
        {title}
        {username && (
          <div className="text-sm font-medium text-gray-600 mt-1">
            Welcome, {username}
          </div>
        )}
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {options.map((item) => (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            key={item.key}
            onClick={() => setActivePage(item.key)}
            className={clsx(
              "w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg transition-all duration-300 text-sm",
              activePage === item.key
                ? "bg-indigo-100 text-indigo-700 font-medium shadow"
                : "hover:bg-indigo-50 hover:text-indigo-700 text-gray-700"
            )}
          >
            {item.icon}
            {item.label}
          </motion.button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
