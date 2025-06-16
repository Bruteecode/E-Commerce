import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useTheme } from '../context/ThemeContext';
import "../styles/Navbar.css";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <h1><Link to="/">E-Shop</Link></h1>
      <div>
        {isAuthenticated && (
          <>
            <Link to="/">Products</Link>
            <Link to="/cart">Cart ({cart.length})</Link>
            <button onClick={logout}>Logout</button>
            <button onClick={toggleTheme}>
        {darkMode ? '🌞 ' : '🌙'}
      </button>
          </>
        )}
        {!isAuthenticated && <Link to="/login">Login</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
