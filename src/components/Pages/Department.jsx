import React, { useState } from "react";
import AdminDashboard from "../DepartmentPages/AdminDashboard";
import AdminManageStaff from "../DepartmentPages/AdminManageStaff";
import Sidebar from "../Sidebar";
import { Menu } from "lucide-react"; // hamburger icon

const Department = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false); // NEW

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <AdminDashboard />;
      case "manageStaff":
        return <AdminManageStaff />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for medium+ screens */}
      <div className="hidden md:block">
        <Sidebar setActivePage={setActivePage} />
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 md:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute left-0 top-0 w-64 bg-white h-full shadow-lg" onClick={(e) => e.stopPropagation()}>
            <Sidebar setActivePage={(page) => {
              setActivePage(page);
              setSidebarOpen(false);
            }} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 p-4 bg-gray-100 w-full">
        {/* Menu button */}
        <button className="md:hidden mb-4" onClick={() => setSidebarOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>

        {renderContent()}
      </div>
    </div>
  );
};

export default Department;
