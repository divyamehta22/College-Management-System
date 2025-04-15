import React, { useState } from "react";
import Sidebar from "../Common/Sidebar";
import ResetPassword from "../Common/ResetPassword";
import { Menu } from "lucide-react";
import { LayoutDashboard, Building2, KeyRound, LogOut } from "lucide-react";
import CollegeDashboard from "../CollegePages/CollegeDashboard";
import CollegeDepartments from "../CollegePages/CollegeDepartments";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const College = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const username = JSON.parse(localStorage.getItem("user"))?.username;

  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (confirm) {
      logout();
      navigate("/");
    }
  };
  

  const sidebarOptions = [
    { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { key: "departments", label: "Manage Departments", icon: <Building2 size={18} /> },
    { key: "resetPassword", label: "Reset Password", icon: <KeyRound size={18} /> },
    { key: "logout", label: "Logout", icon: <LogOut size={18} /> },
  ];

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <CollegeDashboard />;
      case "departments":
        return <CollegeDepartments />;
      case "resetPassword":
        return <ResetPassword />;
      case "logout":
        handleLogout();
      default:
        return <CollegeDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <div className="hidden md:block w-64">
        <Sidebar
          title="College Panel"
          options={sidebarOptions}
          activePage={activePage}
          setActivePage={setActivePage}
          username={username}
        />
      </div>

      {/* Mobile sidebar */}
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
            title="College Panel"
            options={sidebarOptions}
            activePage={activePage}
            setActivePage={(page) => {
              setActivePage(page);
              setSidebarOpen(false);
            }}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile menu button */}
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

export default College;
