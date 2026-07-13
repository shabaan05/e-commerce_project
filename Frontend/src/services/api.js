import axios from 'axios';

// Create Axios instance
console.log(import.meta.env.VITE_API_URL);

const api = axios.create({
  // baseURL: 'http://localhost:5000/api', 
    baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token — reads from both storage keys for robustness
api.interceptors.request.use(
  (config) => {
    // Primary: plain token key (set by AuthContext.login)
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }

    // Fallback: read from userInfo object
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo?.token) {
        config.headers.Authorization = `Bearer ${userInfo.token}`;
      }
    } catch (_) {}

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
