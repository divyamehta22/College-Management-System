import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = JSON.parse(localStorage.getItem("user"))?.token;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/auth/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: oldPassword,
            newPassword: newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.status === "success") {
        toast.success("Password updated successfully!");
        setOldPassword("");
        setNewPassword("");
      } else {
        toast.error(data.message || "Failed to update password.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    }
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

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-lg font-medium hover:scale-105 transition"
        >
          Update Password
        </button>
      </form>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </motion.div>
  );
};

export default ResetPassword;
