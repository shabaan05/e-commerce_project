import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside
      style={{
        width: "220px",
        padding: "20px",
        backgroundColor: "#111",
        color: "#fff",
      }}
    >
      <h2>Admin</h2>

      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Link to="/admin" style={{ color: "#fff" }}>
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/admin/products" style={{ color: "#fff" }}>
              Products
            </Link>
          </li>

          <li>
            <Link to="/admin/orders" style={{ color: "#fff" }}>
              Orders
            </Link>
          </li>

          <li>
            <Link to="/admin/users" style={{ color: "#fff" }}>
              Users
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
