import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth(); 

  return (
    <nav>
      <Link to="/">Home</Link> 
      <Link to="/shop">Shop</Link> 
      <Link to="/cart">Cart</Link>

{/* {isAuthenticated && (
          <Link to="/orders">My Orders</Link>
        )} */}

                  <Link to="/orders">My Orders</Link>

{/* take attention while backend */}
          <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>


    </nav>
  );
};

export default Navbar;

