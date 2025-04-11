import React, { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      // console.log(user);
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (credentials) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
  
      const data = await response.json();
  
      if (response.ok && data.status === "success") {
        const userData = {
          token: data.token,
          ...data.user,
        };
  
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
  
        const redirectTarget = {
          super_admin: "/college",      
          admin: "/department", 
          staff: "/staff",
          student: "/student",
          parent: "/parent",
        }[data.user.role];
  
        return { success: true, redirectPath: redirectTarget || "/" };
      } else {
        return { success: false, message: data.message || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Something went wrong!" };
    }
  };
  

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}