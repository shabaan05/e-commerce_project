import { Link } from "react-router-dom";

const AdminSidebar = () => {
return (
  <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-6">

    {/* Title */}
    <h2 className="text-xl font-semibold text-gray-900 mb-8">
      Admin Panel
    </h2>

    {/* Navigation */}
    <nav>
      <ul className="space-y-4">

        <li>
          <Link
            to="/admin"
            className="block text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/admin/products"
            className="block text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Products
          </Link>
        </li>

        <li>
          <Link
            to="/admin/orders"
            className="block text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Orders
          </Link>
        </li>

        <li>
          <Link
            to="/admin/users"
            className="block text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Users
          </Link>
        </li>

      </ul>
    </nav>

  </aside>
);

};

export default AdminSidebar;
