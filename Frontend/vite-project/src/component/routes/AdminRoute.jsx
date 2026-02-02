import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // Not logged in
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin
  if (!userInfo.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Admin allowed
  return <Outlet />;
};

export default AdminRoute;
