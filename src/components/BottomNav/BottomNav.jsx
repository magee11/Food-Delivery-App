import React, { useContext } from "react";
import "./bottomnav.css";
import { useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import Icon from "../Icon/Icon";

// Mobile-only tab bar (hidden above 768px via CSS).
const BottomNav = ({ setShowLogin }) => {
  const { cartCount, profile, isSearch, setIsSearch } = useContext(StoreContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (pathname === "/checkout") return null;

  const tabs = [
    {
      label: "Home",
      icon: "home",
      active: pathname === "/" && !isSearch,
      onClick: () => { setIsSearch(false); navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); },
    },
    {
      label: "Search",
      icon: "search",
      active: isSearch,
      onClick: () => { navigate("/"); setIsSearch(true); window.scrollTo({ top: 0 }); },
    },
    {
      label: "Cart",
      icon: "bag",
      active: pathname === "/cart",
      badge: cartCount,
      onClick: () => navigate("/cart"),
    },
    {
      label: profile ? "Profile" : "Sign in",
      icon: "user",
      active: pathname === "/profile",
      onClick: () => (profile ? navigate("/profile") : setShowLogin(true)),
    },
  ];

  return (
    <nav className="bottom-nav" aria-label="Primary">
      {tabs.map((tab) => (
        <button key={tab.label} className={tab.active ? "active" : ""} onClick={tab.onClick}>
          <span className="bottom-nav-icon">
            <Icon name={tab.icon} size={22} />
            {tab.badge > 0 && <span className="bottom-nav-badge">{tab.badge}</span>}
          </span>
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
