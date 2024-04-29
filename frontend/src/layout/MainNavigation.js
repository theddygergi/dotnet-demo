import { Link, useNavigate } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import {
  Menu,
  LibraryBooks,
  LocalMovies,
  AddCircleOutline,
  AddCircle,
  AddShoppingCart,
  StarRate,
  Login,
  LockOpen,
  Home,
  Search,
  ManageSearch,
  Logout,
} from "@mui/icons-material";
import ThemeSwitcher from "./ThemeSwitcher";
import Dashboard from "./Dashboard";
import UserContext from "../pages/user/auth/UserContext";
import { useContext } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";
import Swal from "sweetalert2";

function MainNavigation() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const handleLogout = () => {
    try {
      sessionStorage.removeItem("userId");
      Swal.fire({
        icon: "success",
        title: "Log out successfully!",
      });
      navigate("/loginUser");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">
          <Home />
          Home
        </Link>
      </div>
      <nav className="main-nav">
        <ul>
          <li>
            <Link to="/moviespage">
              <LocalMovies /> <br />
              Movies
            </Link>
          </li>
          <li>
            <Link to="/bookspage">
              <LibraryBooks /> <br />
              Books
            </Link>
          </li>
          <li>
            <Link to="/ranking">
              <StarRate /> <br />
              Ranking
            </Link>
          </li>
          <li>
            <Link to={`/usercart/${userId}`}>
              <AddShoppingCart /> <br />
              Cart
            </Link>
          </li>
          <li>
            <Link to="/loginAdmin">
              <LockOpen /> <br />
              Login As Admin
            </Link>
          </li>
          <li>
            <Link to="/search">
              <ManageSearch /> <br />
              Search
            </Link>
          </li>
          <li>
            <ThemeSwitcher />
            <Link>Theme</Link>
          </li>
          <li>
            <Logout/> <br />
            <span onClick={handleLogout}>Log Out</span>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default MainNavigation;
