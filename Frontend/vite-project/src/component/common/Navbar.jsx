import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth(); 

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/shop">Shop</Link>
      <Link to="/cart">Cart</Link>

      {/* Logged in user (user OR admin) */}
      {user ? (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/orders">My Orders</Link>

          {/* Admin link */}
          {user?.role === "admin" && (
            <Link to="/admin">Admin</Link>
          )}

          <button onClick={logout}>Logout</button>
        </>
      ) : (
        /* Logged out */
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
