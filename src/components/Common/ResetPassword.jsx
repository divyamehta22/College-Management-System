import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { motion } from "framer-motion";

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your API call or logic here
    setSuccessMsg("Password updated successfully!");
    setOldPassword("");
    setNewPassword("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 border"
    >
      <h2 className="text-2xl font-bold text-purple-600 mb-6 flex items-center gap-2">
        <Lock className="w-6 h-6" />
        Reset Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Old Password */}
        <div className="relative">
          <label className="block text-gray-700 mb-1 font-medium">Old Password</label>
          <input
            type={showOld ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <span
            onClick={() => setShowOld(!showOld)}
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
          >
            {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        {/* New Password */}
        <div className="relative">
          <label className="block text-gray-700 mb-1 font-medium">New Password</label>
          <input
            type={showNew ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <span
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
          >
            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-lg font-medium hover:scale-105 transition"
        >
          Update Password
        </button>

        {successMsg && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-600 font-medium text-center mt-4"
          >
            {successMsg}
          </motion.p>
        )}
      </form>
    </motion.div>
  );
};

export default ResetPassword;
