import React, { useEffect, useState } from "react";
import { Building2, Users, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const cardVariants = {
  hover: { scale: 1.05 },
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const CollegeDashboard = () => {
  const [stats, setStats] = useState(null);

  const token = JSON.parse(localStorage.getItem("user"))?.token;
  // console.log(token)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/super-admin/dashboard`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        // console.log("API being called:", `${process.env.REACT_APP_API_BASE_URL}/super-admin/dashboard`);
        // const contentType = res.headers.get("content-type");
        // if (!contentType || !contentType.includes("application/json")) {
        //   const text = await res.text(); // this will log the HTML
        //   console.error("❌ Response is not JSON. Here's what came back:\n", text);
        //   return;
        // }
  
        const data = await res.json();
        console.log(data)
        if (res.ok && data.status === "success") {
          setStats(data.data);
        } else {
          console.error("Failed to fetch stats:", data.message);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
  
    fetchStats();
  }, [token]);  

  const statCards = [
    {
      title: "Departments",
      value: stats?.departments ?? "...",
      icon: <Building2 className="text-purple-600 w-8 h-8" />,
      bg: "bg-purple-100",
    },
    {
      title: "Staff Members",
      value: stats?.staff ?? "...",
      icon: <Users className="text-green-600 w-8 h-8" />,
      bg: "bg-green-100",
    },
    {
      title: "Students",
      value: stats?.students ?? "...",
      icon: <GraduationCap className="text-blue-600 w-8 h-8" />,
      bg: "bg-blue-100",
    },
  ];

  // if (!stats) {
  //   return <div>Loading data...</div>; // Show loading message if stats is null
  // }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">College Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            transition={{ duration: 0.4 }}
            className={`rounded-xl p-6 shadow-md flex items-center space-x-4 ${stat.bg} hover:shadow-xl transition`}
          >
            <div>{stat.icon}</div>
            <div>
              <div className="text-xl font-semibold text-gray-800">{stat.value}</div>
              <div className="text-gray-600">{stat.title}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CollegeDashboard;
