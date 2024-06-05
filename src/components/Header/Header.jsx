import React, { useContext } from "react";
import "./header.css";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-scroll";
const Header = () => {
  const width = window.innerHeight;
  console.log(width, "width");
  const { isDarkTheme } = useContext(StoreContext);
  const darkTheme = {
    color: "#000",
    transition: ".8s",
  };
  const lightTheme = {
    color: "#fff",
    transition: ".8s",
  };
  return (
    <div className="header" name="header">
      <div
        className="header-content"
        style={isDarkTheme ? darkTheme : lightTheme}
      >
        <h2>Order your favourite food here</h2>
        <span>
          {width >=990
            ? "The app becomes a convenient one-stop-shop for users, allowing them to order all sorts of items, food or otherwise. Customers can get everything they need in one place, making the app even more useful to them, which in turn brings their loyalty. Examples: DoorDash, UberEats"
            : ""}
        </span>
        <Link to="food" smooth={true} duration={500}>
          <button> View More</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
