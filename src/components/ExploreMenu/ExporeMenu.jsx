import React from "react";
import "./exploremenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";

const ExporeMenu = ({ category, setCategory }) => {
  const toggle = (name) => setCategory((prev) => (prev === name ? "All" : name));

  return (
    <section className="explore-menu" id="explore-menu">
      <h2 className="section-title">What are you craving?</h2>
      <p className="section-sub">Pick a category. Tap it again to see everything.</p>
      <div className="explore-menu-list">
        <button
          className={`explore-menu-item ${category === "All" ? "active" : ""}`}
          onClick={() => setCategory("All")}
        >
          <span className="explore-menu-all">All</span>
          <p>Everything</p>
        </button>
        {menu_list.map((item) => (
          <button
            key={item.menu_name}
            className={`explore-menu-item ${category === item.menu_name ? "active" : ""}`}
            onClick={() => toggle(item.menu_name)}
          >
            <img src={item.menu_image} alt="" loading="lazy" />
            <p>{item.menu_name}</p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ExporeMenu;
