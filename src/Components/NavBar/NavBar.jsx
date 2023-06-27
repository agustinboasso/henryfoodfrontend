import SearchBar from "../SearchBar/SearchBar";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const handleHomeClick = () => {
    if (window.location.pathname === "/home") {
      window.location.reload();
    }
  };

  return (
    <div className={styles.navBar}>
      <NavLink exact to="/home" onClick={handleHomeClick}>
        HOME
      </NavLink>
      <NavLink to="/form">SHARE YOUR RECIPE</NavLink>
      <SearchBar />
    </div>
  );
};

export default NavBar;