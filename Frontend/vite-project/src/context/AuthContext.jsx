import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

// 1️⃣ Create context
const AuthContext = createContext();

// 2️⃣ Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Restore auth on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setUser({ token }); // minimal user state
    }

    setLoading(false);
  }, []);

  // 🔐 Login
  const login = (data) => {
    localStorage.setItem("token", data.token);
    api.defaults.headers.Authorization = `Bearer ${data.token}`;
    setUser(data.user || { token: data.token });
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.Authorization;
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 3️⃣ Custom hook
export const useAuth = () => useContext(AuthContext);
