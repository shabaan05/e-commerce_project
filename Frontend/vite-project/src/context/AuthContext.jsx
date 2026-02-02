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
    const storedUser = localStorage.getItem("user");
   
      if (token && storedUser) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setUser({ ...JSON.parse(storedUser), token });
  }

    setLoading(false);
  }, []);

  // 🔐 Login
  const login = (data) => {

      const userData = {
    ...data.user,          // name, email, isAdmin
    token: data.token,
    phone: "",             
    address: "",           
  };
    localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userData));

    api.defaults.headers.Authorization = `Bearer ${data.token}`;
    // setUser(data.user || { token: data.token });
    setUser({...data.user,token: data.token})
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.Authorization;
    setUser(null);
  };

  //update user
  const updateProfile = (updates) => {
  const updatedUser = {
    ...user,
    ...updates,
    address: {
      ...user.address,
      ...updates.address,
    },
  };

  setUser(updatedUser);
  localStorage.setItem("user", JSON.stringify(updatedUser));
};


  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading,updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 3️⃣ Custom hook
export const useAuth = () => useContext(AuthContext);
