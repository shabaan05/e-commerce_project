import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet"





const Navbar = () => {
  const { user, logout } = useAuth(); 
const cartItems = useCart();
 
//..
return (
  <header className="bg-white border-b border-gray-200 shadow-sm">
    <div className="max-w-7xl mx-auto px-6">
      <nav className="flex items-center justify-between h-16">

        {/* Left Section */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-xl font-semibold text-gray-900"
          >
            MyStore
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/shop"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Shop
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-sm font-medium text-gray-700 hover:text-blue-600 transition"
          >
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Logged in user */}
          {user ? (
            <div className="flex items-center gap-6">

              <Link
                to="/profile"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
              >
                Profile
              </Link>

              <Link
                to="/orders"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
              >
                My Orders
              </Link>

              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={logout}
                className="text-sm font-medium text-gray-700 hover:text-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition"
              >
                Register
              </Link>
            </div>
          )}

        </div>
      </nav>
    </div>
  </header>
);

};

export default Navbar;
