import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth(); 

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/shop">Shop</Link>
      <Link to="/cart">Cart</Link>

      {/* Show only after login */}
      {isAuthenticated && (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/orders">My Orders</Link>
          <button onClick={logout}>Logout</button>
        </>
      )}

      {/* Show only when logged out */}
      {!isAuthenticated && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
