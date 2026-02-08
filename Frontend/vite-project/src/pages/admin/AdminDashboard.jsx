import { useEffect, useState } from "react";
import { getAdminDashboardStats } from "../../services/adminApi";
const AdminDashboard = () => {
  const [stats, setStats] = useState({
  users: 0,
  orders: 0,
  products: 0,
});

// data is object whoch store al data responded by getdasboboard method in jsn whoch we allot to state by setstate method
  useEffect(() => {
      
    const fetchStats = async () => {
      const { data } = await getAdminDashboardStats();
      
    // console.log("ADMIN DASHBOARD STATS:", data); // tetsing purpose
    // console.log("FRONTEND RECEIVED:", res.data);

    setStats(prev => ({ ...prev, ...data }));

    };

    fetchStats();
  });

  // if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <div>👤 Users: {stats?.users}</div>
        <div>📦 Products: {stats?.products}</div>
        <div>🧾 Orders: {stats?.orders}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
