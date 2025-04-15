import React, { useState } from "react";
import Sidebar from "../Common/Sidebar";
import { KeyRound, LayoutDashboard, LogOut, Menu, MessageCircle } from "lucide-react";
import ResetPassword from "../Common/ResetPassword";
import ParentDashboard from "../ParentPages.jsx/ParentDashboard";
import ParentMessages from "../ParentPages.jsx/ParentMessages";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Parent = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (confirm) {
      logout();
      navigate("/");
    }
  };

  const sidebarOptions = [
    { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { key: "messages", label: "Messages", icon: <MessageCircle className="w-4 h-4" /> },
    { key: "resetPassword", label: "Reset Password", icon: <KeyRound className="w-4 h-4" /> },
    { key: "logout", label: "Logout", icon: <LogOut className="w-4 h-4" /> },
  ];

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <ParentDashboard />;
      case "messages":
        return <ParentMessages />;
      case "resetPassword":
        return <ResetPassword />;
      case "logout":
        handleLogout();
      default:
        return <ParentDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <div className="hidden md:block w-64 shadow">
        <Sidebar
          title="Parent Panel"
          options={sidebarOptions}
          activePage={activePage}
          setActivePage={setActivePage}
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
            title="Parent Panel"
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

export default Parent;
