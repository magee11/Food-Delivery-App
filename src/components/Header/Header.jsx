import React from "react";
import "./header.css";
import { useLocation, useNavigate } from "react-router-dom";
import { hero_images } from "../../assets/dishes";
import Icon from "../Icon/Icon";
import { scrollToSection } from "../../utils/scrollTo";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <section className="header" id="top">
      <div className="header-content">
        <span className="header-pill">
          <Icon name="bike" size={16} /> Delivering in ~30 min near you
        </span>
        <h1>
          Cravings, <span>delivered</span> the Biteway.
        </h1>
        <p>
          Order from your favourite neighbourhood kitchens: curries, rolls, pasta, cakes and more,
          brought to your door hot and fresh.
        </p>
        <div className="header-actions">
          <button
            className="btn btn-primary"
            onClick={() => scrollToSection(navigate, pathname, "food-display")}
          >
            Order now <Icon name="arrow" size={18} />
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => scrollToSection(navigate, pathname, "explore-menu")}
          >
            Explore menu
          </button>
        </div>
        <div className="header-stats">
          <div><strong>35</strong><span>Dishes</span></div>
          <div><strong>4.7★</strong><span>Avg. rating</span></div>
          <div><strong>30 min</strong><span>Delivery</span></div>
        </div>
      </div>

      <div className="header-art" aria-hidden="true">
        <div className="header-plate header-plate-main">
          <img src={hero_images[1]} alt="" />
        </div>
        <div className="header-plate header-plate-a">
          <img src={hero_images[0]} alt="" />
        </div>
        <div className="header-plate header-plate-b">
          <img src={hero_images[2]} alt="" />
        </div>
        <div className="header-plate header-plate-c">
          <img src={hero_images[3]} alt="" />
        </div>
        <div className="header-chip header-chip-rating">
          <Icon name="star" size={16} /> 4.9 · Paneer Butter Masala
        </div>
        <div className="header-chip header-chip-time">
          <Icon name="clock" size={16} /> Arriving in 24 min
        </div>
      </div>
    </section>
  );
};

export default Header;
