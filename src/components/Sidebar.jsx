const Sidebar = ({ setActivePage }) => {
    return (
      <div className="w-64 bg-blue-900 text-white min-h-screen p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <button onClick={() => setActivePage("dashboard")} className="block w-full text-left hover:bg-blue-800 p-2 rounded">Dashboard</button>
        <button onClick={() => setActivePage("manageStaff")} className="block w-full text-left hover:bg-blue-800 p-2 rounded">Manage Staff</button>
        {/* Add similar buttons for other pages */}
        <button onClick={() => setActivePage("logout")} className="block w-full text-left hover:bg-red-600 p-2 rounded mt-4">Logout</button>
      </div>
    );
  };
  
  export default Sidebar;
  