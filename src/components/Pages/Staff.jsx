import React, { useState } from "react";
import Sidebar from "../Common/Sidebar";
import ResetPassword from "../Common/ResetPassword";
import { Menu, LayoutDashboard, CalendarClock, Users, ClipboardList, MessageCircle, KeyRound, LogOut } from "lucide-react";
import StaffDashboard from "../StaffPages/StaffDashboard";
import StaffSchedule from "../StaffPages/StaffSchedule";
import StaffAttendance from "../StaffPages/StaffAttendance";
import StaffMessages from "../StaffPages/StaffMessages";
import StaffViewAllStudents from "../StaffPages/StaffViewAllStudents";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Staff = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.staff?.name || user?.username;

  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (confirm) {
      logout();
      navigate("/");
    }
  };

  const sidebarOptions = [
    { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { key: "schedule", label: "Schedule", icon: <CalendarClock className="w-4 h-4" /> },
    { key: "viewStudents", label: "View all students", icon: <Users className="w-4 h-4" /> },
    { key: "attendance", label: "Attendance", icon: <ClipboardList className="w-4 h-4" /> },
    { key: "messages", label: "Messages", icon: <MessageCircle className="w-4 h-4" /> },
    { key: "resetPassword", label: "Reset Password", icon: <KeyRound className="w-4 h-4" /> },
    { key: "logout", label: "Logout", icon: <LogOut className="w-4 h-4" /> },
  ];

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <StaffDashboard />;
      case "schedule":
        return <StaffSchedule />;
      case "viewStudents":
        return <StaffViewAllStudents />;
      case "attendance":
        return <StaffAttendance />;
      case "messages":
        return <StaffMessages />;
      case "resetPassword":
        return <ResetPassword />;
      case "logout":
        handleLogout();  
      default:
        return <StaffDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <div className="hidden md:block w-64 shadow">
        <Sidebar
          title="Staff Panel"
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
            title="Staff Panel"
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
        <div className="md:hidden p-4">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        <main className="flex-1 p-4">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Staff;
