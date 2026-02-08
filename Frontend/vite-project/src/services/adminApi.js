import axios from "axios";

// Create admin axios instance
const adminApi = axios.create({
  baseURL: "http://localhost:5000/api/admin", // ✅ backend

});

// Attach token automatically
adminApi.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (userInfo?.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }

  return config;
});

// these are functions in admin controllers file which we connect via services 
export const getAdminDashboardStats = () =>
  adminApi.get("/dashboard");


export const getAllUsers = () =>
  adminApi.get("/users");


export const getAllOrders = () =>
  adminApi.get("/orders");

export const updateOrderStatus = (orderId, status) =>
  adminApi.put(`/orders/${orderId}`, { status });

export const getAllProducts = () =>
  adminApi.get("/products");

export const deleteProduct = (productId) =>
  adminApi.delete(`/products/${productId}`);

export const updateProduct = (productId, updates) =>
  adminApi.put(`/products/${productId}`, updates);
export const createProduct = (productData) =>
  adminApi.post("/products", productData);



export default adminApi;
