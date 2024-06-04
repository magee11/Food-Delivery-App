import React, { useContext } from "react";
import "./exploremenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
const ExporeMenu = ({ category, setCategory }) => {
  const { isDarkTheme } = useContext(StoreContext);
  const darkTheme = {
    color: "#fff",
    transition: ".8s",
  };
  const lightTheme = {
    color: "black",
    transition: ".8s",
  };
  return (
    <div className="explore-menu" name="explore-menu">
      <h2 style={isDarkTheme ? darkTheme : lightTheme}>Explore Menu</h2>
      <span
        className="explore-menu-text"
        style={isDarkTheme ? darkTheme : lightTheme}
      >
        The app becomes a convenient one-stop-shop for users, allowing them to
        order all sorts of items, food or otherwise. Customers can get food or
        otherwise allowing them to order all sorts of items
      </span>
      <div className="explore-menu-list">
        {menu_list?.map((items, index) => {
          return (
            <div
              className="explore-menu-list-items"
              key={index}
              onClick={() => setCategory(items.menu_name)}
            >
              <img
                src={items.menu_image}
                className={category === items.menu_name ? "active" : ""}
              />
              <p style={isDarkTheme ? darkTheme : lightTheme}>{items.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExporeMenu;
