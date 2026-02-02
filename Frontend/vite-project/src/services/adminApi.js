import axios from "axios";

// Create admin axios instance
const adminApi = axios.create({
  baseURL: "/api/admin",
});

// Attach token automatically
adminApi.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem("user"));

  if (userInfo?.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }

  return config;
});


export const getAdminDashboardStats = () =>
  adminApi.get("/dashboard");


export const getAllUsers = () =>
  adminApi.get("/users");


export const getAllOrders = () =>
  adminApi.get("/orders");

export const updateOrderStatus = (orderId, status) =>
  adminApi.put(`/orders/${orderId}`, { status });



export default adminApi;
