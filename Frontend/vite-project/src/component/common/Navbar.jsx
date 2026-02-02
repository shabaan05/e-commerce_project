import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 

const Navbar = () => {
  const { user, logout } = useAuth(); 

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/shop">Shop</Link>
      <Link to="/cart">Cart</Link>

      {/* Show only after login */}
      {user && (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/orders">My Orders</Link>
          <button onClick={logout}>Logout</button>
        </>
      )}

      {/* Show only when logged out */}
      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

       {/* 👇 ADMIN LINK */}
          {user.role === "admin" && (
            <Link to="/admin">Admin</Link>
          )}
    </nav>
  );
};

export default Navbar;
