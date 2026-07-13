import axios from "axios";

// Create admin axios instance
const adminApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/admin`,
});

// Attach token automatically — try both storage keys for robustness
adminApi.interceptors.request.use((config) => {
  // Primary: read from userInfo object (set by AuthContext.login)
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo?.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
      return config;
    }
  } catch (_) {}

  // Fallback: read plain token key (also set by AuthContext.login)
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export const getDashboardStats = async () => {
  const res = await adminApi.get("/dashboard");
  return res.data.data;
};

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
export const createProduct = (formData) => {
  return adminApi.post("/products", formData);
};



export default adminApi;
