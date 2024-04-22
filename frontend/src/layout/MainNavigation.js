import { Link } from "react-router-dom";
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
} from "@mui/icons-material";
import ThemeSwitcher from "./ThemeSwitcher";
import Dashboard from "./Dashboard";
import UserContext from "../pages/user/UserContext";
import { useContext } from "react";
import SearchBar from "./SearchBar";

function MainNavigation() {
  const { userId } = useContext(UserContext);
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">
          <Home />Home
        </Link>
      </div>
      <nav className="main-nav">
        <ul>
          <li>
            <Link to="/movies">
              <LocalMovies />Movies
            </Link>
          </li>
          <li>
            <Link to="/books">
              <LibraryBooks />Books
            </Link>
          </li>
          <li>
            <Link to="/addmovies">
              <AddCircle />Add Movies
            </Link>
          </li>
          <li>
            <Link to="/addbooks">
              <AddCircleOutline />Add Books
            </Link>
          </li>
          <li>
            <Link to="/ranking">
              <StarRate />Ranking
            </Link>
          </li>
          <li>
            <Link to={`/usercart/${userId}`}>
              <AddShoppingCart />Cart
            </Link>
          </li>
          <li>
            <Link to="/loginAdmin">
              <LockOpen />Login As Admin
            </Link>
          </li>
          <li>
            <Link to="/search">
              <ManageSearch />Search
            </Link>
          </li>
          <li>
            <ThemeSwitcher /><Link>Theme</Link>
          </li>
          <li>
            <Dashboard />
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default MainNavigation;
