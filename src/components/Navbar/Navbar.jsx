import React, { useContext, useState } from "react";
import "./navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-scroll";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
export const Navbar = ({ setShowLogin }) => {
  const { cartCount, handleDarktheme, isDarkTheme, profile, setProfile } =
    useContext(StoreContext);
  const [menu, setMenu] = useState("menu");
  const [dropdown, setDropDown] = useState(false);
  const Darktheme = {
    color: "white",
  };
  const lightTheme = {
    color: "gray",
  };

  const logOut = () => {
    googleLogout();
    setProfile(null);
    setDropDown(false);
  };
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <img src={assets.logo} className="logo" onClick={() => navigate("/")} />
      <ul className="navbar-menu" style={isDarkTheme ? Darktheme : lightTheme}>
        <li
          onClick={() => {
            setMenu("home");
          }}
          className={menu === "home" ? "active" : ""}
        >
          <Link to="header" smooth={true} duration={500}>
            Home
          </Link>
        </li>
        <li
          onClick={() => {
            setMenu("menu");
          }}
          className={menu === "menu" ? "active" : ""}
        >
          <Link to="menu" smooth={true} duration={500}>
            Category
          </Link>
        </li>
        <li
          onClick={() => {
            setMenu("app");
          }}
          className={menu === "app" ? "active" : ""}
        >
          <Link to="food" smooth={true} duration={500}>
            Foods
          </Link>
        </li>
        <li
          onClick={() => {
            setMenu("contact");
          }}
          className={menu === "contact" ? "active" : ""}
        >
          <Link to="app-download" smooth={true} duration={500}>
            Mobile App
          </Link>
        </li>
      </ul>
      <div className="navbar-right">
        <label className="switch">
          <input
            type="checkbox"
            checked={isDarkTheme}
            onChange={handleDarktheme}
          />
          <span className="slider round"></span>
        </label>
        <img src={assets.search_icon} />
        <div className="navbar-search-icon" onClick={() => navigate("/cart")}>
          <img src={assets.basket_icon} />
          <div className="dot">{cartCount}</div>
        </div>
        {!profile ? (
          <button className="signin" onClick={() => setShowLogin(true)}>
            Sign In
          </button>
        ) : (
          <div className="profile-icon" onClick={() => setDropDown(!dropdown)}>
            <img src={profile.picture} />
          </div>
        )}
        {dropdown && (
          <div
            className="profile-dropdown"
            style={{ background: isDarkTheme ? "gray" : "#fff" }}
          >
            <span
              className="profile-name"
              style={{ color: isDarkTheme ? "white" : "gray" }}
            >
              Hi {profile.given_name} 👋
            </span>
            <ul className="profile-dropdown-list">
              <li>
                <img src={assets.profile_icon_svg} alt="" />
                <span>Profile</span>
              </li>
              <li onClick={() => navigate("/profile")}>
                <img src={assets.store_svg} alt="" />
                <span>Orders</span>
              </li>
              <li onClick={logOut}>
                <img src={assets.logout_svg} alt="" />
                <span>Logout</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
