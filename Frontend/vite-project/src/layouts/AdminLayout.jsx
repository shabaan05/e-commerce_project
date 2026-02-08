import { Outlet } from "react-router-dom";
import AdminSidebar from "../component/admin/AdminSidebar";

const AdminLayout = () => {
    console.log("ADMIN LAYOUT RENDERED");

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
