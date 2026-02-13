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
  <div className="bg-gray-50 min-h-screen py-16">
    <div className="max-w-6xl mx-auto px-6 space-y-10">

      {/* Page Title */}
      <h1 className="text-3xl font-semibold text-gray-900">
        Admin Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Users Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-500 mb-2">Users</p>
          <p className="text-3xl font-semibold text-blue-600">
            {stats?.users}
          </p>
        </div>

        {/* Products Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-500 mb-2">Products</p>
          <p className="text-3xl font-semibold text-blue-600">
            {stats?.products}
          </p>
        </div>

        {/* Orders Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-500 mb-2">Orders</p>
          <p className="text-3xl font-semibold text-blue-600">
            {stats?.orders}
          </p>
        </div>

      </div>

    </div>
  </div>
);

};

export default AdminDashboard;
