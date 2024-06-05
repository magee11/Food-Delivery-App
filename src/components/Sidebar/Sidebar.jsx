import React, { useContext } from "react";
import "./sidebar.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/frontend_assets/assets";

const Sidebar = ({ logOut, setSidebar, sidebar, profile, setShowLogin }) => {
  
  console.log(profile, "SideBar");
  const { isDarkTheme,handleDarktheme } = useContext(StoreContext);
  return (
    <div
      className="sidebar"
      style={{ background: isDarkTheme ? "#1e1e1e" : "#fff" }}
    >
      <div className="sidebar-exit" onClick={() => setSidebar(!sidebar)}>
        <img src={assets.sidebar_exit} alt="" />
      </div>
      {!profile ? (
        <></>
      ) : (
        <div>
          <div className="sidebar-profile">
            <img src={profile.picture} className="sidebar-profile" />
          </div>
          <span
            className="sidebar-name"
            style={{ color: isDarkTheme ? "white" : "gray" }}
          >
            Hi {"Magesh"} 👋
          </span>
        </div>
      )}
      <ul className="sidebar-list">
        {!profile ? (
          <li
            onClick={() => {
              setShowLogin(true);
              setSidebar(false);
            }}
          >
            <img src={assets.sidebar_profile_svg} alt="" />
            <span>Sign In</span>
          </li>
        ) : (
          <li>
            <img src={assets.sidebar_profile_svg} alt="" />
            <span>Profile</span>
          </li>
        )}
        <li onClick={() => navigate("/profile")}>
          <img src={assets.store_svg} alt="" />
          <span>Orders</span>
        </li>
        <li onClick={() => navigate("/profile")}>
          <img src={assets.store_svg} alt="" />
          <span>Foods</span>
        </li>
        <li onClick={() => navigate("/profile")}>
          <img src={assets.store_svg} alt="" />
          <span>Category</span>
        </li>
        <li onClick={() => navigate("/profile")}>
          <img src={assets.store_svg} alt="" />
          <span>Mobile App</span>
        </li>
        <li>
          <span>Dark Theme</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={isDarkTheme}
              onChange={handleDarktheme}
            />
            <span className="slider round"></span>
          </label>
        </li>
        {profile && (
          <li
            onClick={() => {
              logOut();
              setSidebar(false);
            }}
          >
            <img src={assets.logout_svg} alt="" />
            <span>Logout</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
