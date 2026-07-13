// import { useEffect, useState } from "react";
// import { getAdminDashboardStats } from "../../services/adminApi";
// import DashboardStatsSkeleton from "../../component/skeletons/DashboardStatsSkeleton";

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({
//     users: 0,
//     orders: 0,
//     products: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const { data } = await getAdminDashboardStats();
//         setStats((prev) => ({ ...prev, ...data }));
//       } catch (err) {
//         console.error("FETCH STATS ERROR:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []); // ✅ empty dep array — fetch once on mount

// return (
//   <div className="bg-gray-50 min-h-screen py-16">
//     <div className="max-w-6xl mx-auto px-6 space-y-10">

//       {/* Page Title */}
//       <h1 className="text-3xl font-semibold text-gray-900">
//         Admin Dashboard
//       </h1>

//       {/* Stats Grid */}
//       {loading ? (
//         <DashboardStatsSkeleton />
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

//           {/* Users Card */}
//           <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
//             <p className="text-sm text-gray-500 mb-2">Users</p>
//             <p className="text-3xl font-semibold text-blue-600">
//               {stats?.users}
//             </p>
//           </div>

//           {/* Products Card */}
//           <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
//             <p className="text-sm text-gray-500 mb-2">Products</p>
//             <p className="text-3xl font-semibold text-blue-600">
//               {stats?.products}
//             </p>
//           </div>

//           {/* Orders Card */}
//           <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
//             <p className="text-sm text-gray-500 mb-2">Orders</p>
//             <p className="text-3xl font-semibold text-blue-600">
//               {stats?.orders}
//             </p>
//           </div>

//         </div>
//       )}

//     </div>
//   </div>
// );

// };

// export default AdminDashboard;
import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/adminApi";
import StatsCards from "../../component/dashboard/StatsCards";
import RevenueChart from "../../component/dashboard/RevenueChart";
import OrdersPieChart from "../../component/dashboard/OrdersPieChart";
import CategoryBarChart from "../../component/dashboard/CategoryBarChart";
import RecentOrders from "../../component/dashboard/RecentOrders";
import LowStockProducts from "../../component/dashboard/LowStockProducts";
import TopProducts from "../../component/dashboard/TopProducts";
import DashboardSkeleton from "../../component/dashboard/DashboardSkeleton";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setDashboard(data);
    } catch (err) {
      console.error("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Overview of your store performance
        </p>
      </div>

      {/* KPI Cards */}
      <StatsCards stats={dashboard.stats} />

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

        <div className="xl:col-span-2">
          <RevenueChart data={dashboard.monthlySales} />
        </div>

        <OrdersPieChart
          data={dashboard.ordersByStatus}
        />

      </div>

      {/* Category Chart */}

      <div className="mt-8">
        <CategoryBarChart
          data={dashboard.productsByCategory}
        />
      </div>

      {/* Tables */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

        <RecentOrders
          orders={dashboard.recentOrders}
        />

        <LowStockProducts
          products={dashboard.lowStockProducts}
        />

      </div>

      {/* Top Products */}

      <div className="mt-8">

        <TopProducts
          products={dashboard.topProducts}
        />

      </div>

    </div>
  );
};

export default Dashboard;