import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

export default function LandingPage() {
  const [selectedLogin, setSelectedLogin] = useState(null);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLoginClick = () => {
    setSelectedLogin("options");
  };

  const handleBack = () => {
    setSelectedLogin("options");
    setError(null);
  };

  const handleClose = () => {
    setSelectedLogin(null);
    setFormData({ id: "", password: "" });
    setError(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(formData); 
    if (res.success) {
      navigate(res.redirectPath);
    } else {
      setError(res.message);
    }
  };

  const renderLoginForm = () => {
    const placeholderMap = {
      college: "College ID",
      department: "Department ID",
      staff: "Staff ID",
      student: "Enrollment Number",
      parent: "Student Enrollment Number",
    };

    return (
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder={placeholderMap[selectedLogin]}
          value={formData.id}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border border-gray-300"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border border-gray-300"
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button className="bg-blue-600 text-white w-full py-3 rounded-xl hover:bg-blue-700">
          Login
        </button>
      </form>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col">
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">College Management System</h1>
      </header>

      <section className="flex-1 flex flex-col justify-center items-center text-center px-6 py-12">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          Simplify Your College Management
        </h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-6">
          A powerful, all-in-one system to manage your college administration,
          academics, and communication seamlessly.
        </p>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl shadow hover:bg-blue-700"
          onClick={handleLoginClick}
        >
          Login
        </button>

        {selectedLogin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-6 shadow-lg max-w-md w-full">
              {selectedLogin === "options" ? (
                <>
                  <h3 className="text-2xl font-semibold text-blue-700 mb-4 text-center">Select Login Type</h3>
                  <div className="grid gap-4">
                    <button className="bg-blue-100 text-blue-700 py-3 rounded-xl hover:bg-blue-200" onClick={() => setSelectedLogin("college")}>College Login</button>
                    <button className="bg-blue-100 text-blue-700 py-3 rounded-xl hover:bg-blue-200" onClick={() => setSelectedLogin("department")}>Department Login</button>
                    <button className="bg-blue-100 text-blue-700 py-3 rounded-xl hover:bg-blue-200" onClick={() => setSelectedLogin("staff")}>Staff Login</button>
                    <button className="bg-blue-100 text-blue-700 py-3 rounded-xl hover:bg-blue-200" onClick={() => setSelectedLogin("student")}>Student Login</button>
                    <button className="bg-blue-100 text-blue-700 py-3 rounded-xl hover:bg-blue-200" onClick={() => setSelectedLogin("parent")}>Parent Login</button>
                  </div>
                  <button className="mt-6 w-full text-center text-sm text-gray-500 hover:underline" onClick={handleClose}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-semibold text-blue-700 mb-4 text-center">{selectedLogin.charAt(0).toUpperCase() + selectedLogin.slice(1)} Login</h3>
                  {renderLoginForm()}
                  <button className="mt-4 w-full text-center text-sm text-gray-500 hover:underline" onClick={handleBack}>
                    Back to Options
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </section>

      <section id="features" className="py-12 px-6 bg-white">
        <h3 className="text-3xl font-bold text-center text-blue-700 mb-10">Key Features</h3>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-blue-50 p-6 rounded-2xl shadow">
            <h4 className="text-xl font-semibold text-blue-600 mb-2">Student Management</h4>
            <p className="text-gray-600">Track student data, attendance, and performance easily.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-2xl shadow">
            <h4 className="text-xl font-semibold text-blue-600 mb-2">Faculty Dashboard</h4>
            <p className="text-gray-600">Provide tools and insights for faculty members to manage classes.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-2xl shadow">
            <h4 className="text-xl font-semibold text-blue-600 mb-2">Communication Hub</h4>
            <p className="text-gray-600">Centralized messaging and announcements for all stakeholders.</p>
          </div>
        </div>
      </section>

      <footer className="text-center py-6 text-gray-500 text-sm">
        © 2025 CollegeMS. All rights reserved.
      </footer>
    </div>
  );
}
