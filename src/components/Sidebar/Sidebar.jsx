import React, { useContext } from "react";
import "./sidebar.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ logOut, setSidebar, sidebar, profile, setShowLogin }) => {
  console.log(profile, "SideBar");
  const { isDarkTheme, handleDarkTheme } = useContext(StoreContext);
  const navigate = useNavigate();
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
          <li
            onClick={() => {
              navigate("/profile");
              setSidebar(false);
            }}
          >
            <img src={assets.sidebar_profile_svg} alt="" />
            <span>Profile</span>
          </li>
        )}
        <li>
          <img src={assets.orders_svg} alt="" />
          <span>Orders</span>
        </li>
        <li>
          <img src={assets.foods} alt="" />
          <span>Foods</span>
        </li>
        <li>
          <img src={assets.category} alt="" />
          <span>Category</span>
        </li>
        <li>
          <img src={assets.download} alt="" />
          <span>Mobile App</span>
        </li>
        <li>
          <img src={assets.dark} alt="" />
          <span>Theme</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={isDarkTheme}
              onChange={handleDarkTheme}
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
