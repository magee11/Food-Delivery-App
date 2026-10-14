import React, { useContext, useEffect } from "react";
import "./sidebar.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import Icon from "../Icon/Icon";
import { navLinks } from "../Navbar/Navbar";

const linkIcons = { home: "home", menu: "grid", dishes: "tag", app: "phone" };

const Sidebar = ({ logOut, setSidebar, profile, setShowLogin, goTo }) => {
  const { isDarkTheme, handleDarkTheme } = useContext(StoreContext);
  const navigate = useNavigate();
  const close = () => setSidebar(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSidebar(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [setSidebar]);

  return (
    <div className="sidebar-backdrop" onClick={close}>
      <aside className="sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-head">
          <Logo size={30} />
          <button className="icon-btn" onClick={close} aria-label="Close menu">
            <Icon name="close" />
          </button>
        </div>

        {profile ? (
          <div className="sidebar-user">
            {profile.picture ? (
              <img src={profile.picture} alt="" referrerPolicy="no-referrer" />
            ) : (
              <div className="sidebar-avatar"><Icon name="user" /></div>
            )}
            <div>
              <strong>Hi {profile.given_name || profile.name} 👋</strong>
              <span>{profile.email}</span>
            </div>
          </div>
        ) : (
          <button
            className="btn btn-primary sidebar-signin"
            onClick={() => { setShowLogin(true); close(); }}
          >
            Sign in / Create account
          </button>
        )}

        <ul className="sidebar-list">
          {navLinks.map((link) => (
            <li key={link.id} onClick={() => { goTo(link); close(); }}>
              <Icon name={linkIcons[link.id]} size={20} /> {link.label}
            </li>
          ))}
          <li onClick={() => { navigate("/orders"); close(); }}>
            <Icon name="receipt" size={20} /> Orders
          </li>
          {profile && (
            <li onClick={() => { navigate("/profile"); close(); }}>
              <Icon name="user" size={20} /> Profile
            </li>
          )}
          <li onClick={handleDarkTheme}>
            <Icon name={isDarkTheme ? "sun" : "moon"} size={20} /> Dark theme
            <span className={`toggle ${isDarkTheme ? "on" : ""}`} />
          </li>
          {profile && (
            <li className="sidebar-logout" onClick={() => { logOut(); close(); }}>
              <Icon name="logout" size={20} /> Logout
            </li>
          )}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
