import React, { useState } from "react";
import {
  Menu,
  LayoutDashboard,
  Users,
  BookOpen,
  Lock,
  LogOut,
  ScanFace,
} from "lucide-react";
import Sidebar from "../Common/Sidebar";
import AdminDashboard from "../DepartmentPages/AdminDashboard";
import AdminManageStaff from "../DepartmentPages/AdminManageStaff";
import AdminManageStudents from "../DepartmentPages/AdminManageStudents";
import ResetPassword from "../Common/ResetPassword";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import FacialAttendance from "../DepartmentPages/FacialAttendance";

const Department = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.department?.name || user?.username;

  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (confirm) {
      logout();
      navigate("/");
    }
  };

  const sidebarOptions = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    { key: "manageStaff", label: "Manage Staff", icon: <Users size={18} /> },
    {
      key: "manageStudent",
      label: "Manage Students",
      icon: <BookOpen size={18} />,
    },
    { key: "facial", label: "Facial Attendance", icon: <ScanFace size={18} /> },
    { key: "resetPassword", label: "Reset Password", icon: <Lock size={18} /> },
    { key: "logout", label: "Logout", icon: <LogOut size={18} /> },
  ];

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <AdminDashboard />;
      case "manageStaff":
        return <AdminManageStaff />;
      case "manageStudent":
        return <AdminManageStudents />;
      case "facial":
        return <FacialAttendance />;
      case "resetPassword":
        return <ResetPassword />;
      case "logout":
        handleLogout();
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for desktop */}
      <div className="hidden md:block w-64">
        <Sidebar
          title="Department"
          options={sidebarOptions}
          activePage={activePage}
          setActivePage={setActivePage}
          username={username}
        />
      </div>

      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity md:hidden ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <div
          className={`absolute left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <Sidebar
            title="Department"
            options={sidebarOptions}
            activePage={activePage}
            setActivePage={(page) => {
              setActivePage(page);
              setSidebarOpen(false);
            }}
            username={username}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top mobile bar */}
        <div className="md:hidden p-4 bg-white shadow flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="ml-4 text-lg font-semibold">Department Panel</h2>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Department;
