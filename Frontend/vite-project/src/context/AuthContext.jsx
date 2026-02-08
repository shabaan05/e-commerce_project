import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Restore auth on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      api.defaults.headers.Authorization = `Bearer ${parsedUser.token}`;
      setUser(parsedUser);
    }

    setLoading(false);
  }, []);

  // 🔐 Login (NEW response format)
  const login = (data) => {
    // data = { _id, name, email, role, token }

    localStorage.setItem("userInfo", JSON.stringify(data));
    api.defaults.headers.Authorization = `Bearer ${data.token}`;
    setUser(data);
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("userInfo");
    delete api.defaults.headers.Authorization;
    setUser(null);
  };

  // ✏️ Update profile
  const updateProfile = (updates) => {
    const updatedUser = {
      ...user,
      ...updates,
    };

    setUser(updatedUser);
    localStorage.setItem("userInfo", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
