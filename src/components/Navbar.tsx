
import { Link, useNavigate } from "react-router-dom";
import { Home, UserRound, LogOut, ShoppingBasket } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import toast from "react-hot-toast";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  }

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        ListMate <ShoppingBasket size={22} />
      </Link>

      <nav className="nav-links">
        <Link to="/"><Home size={17} /> Home</Link>
        <Link to="/profile"><UserRound size={17} /> Profile</Link>
        <button className="nav-logout" onClick={handleLogout}>
          <LogOut size={17} /> Logout
        </button>
      </nav>
    </header>
  );
}
