import React, { useContext, useEffect, useRef, useState } from "react";
import "./navbar.css";
import { StoreContext } from "../../context/StoreContext";
import { googleLogout } from "@react-oauth/google";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Search from "../Search/Search";
import Logo from "../Logo/Logo";
import Icon from "../Icon/Icon";
import { scrollToSection } from "../../utils/scrollTo";

export const navLinks = [
  { id: "home", label: "Home", section: "top" },
  { id: "menu", label: "Menu", section: "explore-menu" },
  { id: "dishes", label: "Dishes", section: "food-display" },
  { id: "app", label: "Mobile App", section: "app-download" },
];

export const Navbar = ({ setShowLogin }) => {
  const { cartCount, handleDarkTheme, isDarkTheme, profile, setProfile, isSearch, setIsSearch } =
    useContext(StoreContext);
  const [menu, setMenu] = useState("home");
  const [dropdown, setDropDown] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!dropdown) return;
    const close = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropDown(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [dropdown]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
    setDropDown(false);
    localStorage.removeItem("userProfile");
  };

  const goTo = (link) => {
    setMenu(link.id);
    setIsSearch(false);
    scrollToSection(navigate, pathname, link.section);
  };

  return (
    <>
      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-inner">
          <div className="navbar-left">
            <button className="icon-btn navbar-menu-btn" onClick={() => setSidebar(true)} aria-label="Open menu">
              <Icon name="menu" />
            </button>
            <Logo size={34} onClick={() => goTo(navLinks[0])} />
          </div>

          <nav className="navbar-menu">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => goTo(link)}
                className={pathname === "/" && menu === link.id ? "active" : ""}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="navbar-right">
            <div className="navbar-search-desktop">
              {isSearch ? (
                <Search />
              ) : (
                <button className="icon-btn" onClick={() => setIsSearch(true)} aria-label="Search">
                  <Icon name="search" />
                </button>
              )}
            </div>
            <button
              className="icon-btn"
              onClick={handleDarkTheme}
              aria-label={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
            >
              <Icon name={isDarkTheme ? "sun" : "moon"} />
            </button>
            <button className="icon-btn navbar-cart" onClick={() => navigate("/cart")} aria-label="Cart">
              <Icon name="bag" />
              {cartCount > 0 && <span className="dot">{cartCount}</span>}
            </button>

            <div className="navbar-account" ref={dropdownRef}>
              {!profile ? (
                <button className="btn btn-primary navbar-signin" onClick={() => setShowLogin(true)}>
                  Sign in
                </button>
              ) : (
                <button className="profile-icon" onClick={() => setDropDown(!dropdown)} aria-label="Account">
                  {profile.picture ? (
                    <img src={profile.picture} alt="" referrerPolicy="no-referrer" />
                  ) : (
                    <Icon name="user" />
                  )}
                </button>
              )}
              {dropdown && profile && (
                <div className="profile-dropdown">
                  <span className="profile-name">Hi {profile.given_name || profile.name} 👋</span>
                  <ul>
                    <li onClick={() => { navigate("/profile"); setDropDown(false); }}>
                      <Icon name="user" size={18} /> Profile
                    </li>
                    <li onClick={() => { navigate("/orders"); setDropDown(false); }}>
                      <Icon name="receipt" size={18} /> Orders
                    </li>
                    <li onClick={logOut}>
                      <Icon name="logout" size={18} /> Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile search lives under the bar so it gets the full width */}
        {isSearch && (
          <div className="navbar-search-mobile">
            <Search autoFocus />
          </div>
        )}
      </header>

      {sidebar && (
        <Sidebar
          logOut={logOut}
          setSidebar={setSidebar}
          setShowLogin={setShowLogin}
          profile={profile}
          goTo={goTo}
        />
      )}
    </>
  );
};
