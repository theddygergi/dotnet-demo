import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { Menu, LibraryBooks, LocalMovies, AddCircleOutline, AddCircle, AddShoppingCart, StarRate, Login, LockOpen, Home, Search  } from "@mui/icons-material";
import ThemeSwitcher from "./ThemeSwitcher";
import Dashboard from "./Dashboard";
import UserContext from "../pages/user/UserContext";
import { useContext } from "react";
import SearchBar from "./SearchBar";

function MainNavigation() {
  const {userId}= useContext(UserContext);
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/"><Home/></Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/movies"><LocalMovies/></Link>
          </li>
          <li>
            <Link to="/books"><LibraryBooks/></Link>
          </li>
          <li>
            <Link to="/addmovies"><AddCircle/></Link>
          </li>
          <li>
            <Link to="/addbooks"><AddCircleOutline/></Link>
          </li>
          <li>
            <Link to="/ranking"><StarRate/></Link>
          </li>
          <li>
            <Link to={`/usercart/${userId}`}><AddShoppingCart/></Link>
          </li>
          <li>
            <Link to="/loginAdmin"><LockOpen/></Link>
          </li>
          <li>
            <Link to=""><SearchBar /></Link>
          </li>
          <li>
            <ThemeSwitcher />
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
