import React, { useContext, useState } from "react";
import "./navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-scroll";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Search from "../Search/Search";
export const Navbar = ({ setShowLogin }) => {
  const {
    cartCount,
    handleDarkTheme,
    isDarkTheme,
    profile,
    setProfile,
    isSearch,
    setIsSearch,
    searchQuery,
    setSearchQuery,
  } = useContext(StoreContext);
  const [menu, setMenu] = useState("home");
  const [dropdown, setDropDown] = useState(false);
  const [sidebar, setSidebar] = useState(false);
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
    localStorage.removeItem("userProfile");
  };
  const navigate = useNavigate();
  let width = window.innerWidth;

  return (
    <>
      <div className="navbar">
        {width >= 990 ? (
          <img
            src={assets.logo}
            className="logo"
            onClick={() => navigate("/")}
          />
        ) : (
          <div className="menu-icons">
            <div onClick={() => setSidebar(!sidebar)}>
              <img src={assets.menu_svg} className="menu-icon" />
            </div>
            <div>
              <img
                src={assets.logo}
                className="logo"
                onClick={() => navigate("/")}
              />
            </div>
          </div>
        )}
        <ul
          className="navbar-menu"
          style={isDarkTheme ? Darktheme : lightTheme}
        >
          <Link to="header" smooth={true} duration={500}>
            <li
              onClick={() => setMenu("home")}
              className={menu === "home" ? "active" : ""}
            >
              Home
            </li>
          </Link>
          <Link to="menu" smooth={true} duration={500}>
            <li
              onClick={() => setMenu("category")}
              className={menu === "category" ? "active" : ""}
            >
              Category
            </li>
          </Link>
          <Link to="food" smooth={true} duration={500}>
            <li
              onClick={() => setMenu("foods")}
              className={menu === "foods" ? "active" : ""}
            >
              Foods
            </li>
          </Link>
          <Link to="app-download" smooth={true} duration={500}>
            <li
              onClick={() => setMenu("app")}
              className={menu === "app" ? "active" : ""}
            >
              Mobile App
            </li>
          </Link>
        </ul>
        <div className="navbar-right">
          {width >= 990 && (
            <div
              className="slider-div"
              style={{ color: isDarkTheme ? "white" : "gray" }}
            >
              <p>Dark Theme</p>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isDarkTheme}
                  onChange={handleDarkTheme}
                />
                <span className="slider round"></span>
              </label>
            </div>
          )}
          {!isSearch ? (
            <img
              src={assets.search_icon}
              className="search_icon"
              onClick={() => setIsSearch(true)}
            />
          ) : (
            <Search isSearch={isSearch} setIsSearch={setIsSearch} />
          )}
          <div className="navbar-search-icon" onClick={() => navigate("/cart")}>
            <img src={assets.basket_icon} />
            <div className="dot">{cartCount}</div>
          </div>
          {width >= 990 && (
            <div>
              {!profile ? (
                <button className="signin" onClick={() => setShowLogin(true)}>
                  Sign In
                </button>
              ) : (
                <div
                  className="profile-icon"
                  onClick={() => setDropDown(!dropdown)}
                >
                  <img
                    src={
                      profile.picture ? profile.picture : assets.profile_user
                    }
                  />
                </div>
              )}
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
                Hi {profile.given_name || profile.name} 👋
              </span>
              <ul className="profile-dropdown-list">
                <li
                  onClick={() => {
                    navigate("/profile");
                    setDropDown(false);
                  }}
                >
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

      {/* SideBar */}
      {sidebar && (
        <Sidebar
          logOut={logOut}
          setSidebar={setSidebar}
          sidebar={sidebar}
          setShowLogin={setShowLogin}
          profile={profile}
        />
      )}
    </>
  );
};
