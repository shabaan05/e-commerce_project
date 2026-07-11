import { Outlet } from "react-router-dom";
import AdminSidebar from "../component/admin/AdminSidebar";

const AdminLayout = () => {
    console.log("ADMIN LAYOUT RENDERED");

return (
  <div className="flex min-h-screen bg-gray-50">

    {/* Sidebar */}
    <AdminSidebar />

    {/* Main Content */}
    <main className="flex-1 p-10">
      <Outlet />
    </main>

  </div>
);

};

export default AdminLayout;
