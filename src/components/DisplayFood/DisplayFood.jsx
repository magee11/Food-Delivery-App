import React, { useContext, useState } from "react";
import "./displayfood.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const filters = [
  { id: "all", label: "All" },
  { id: "veg", label: "Pure veg" },
  { id: "new", label: "New" },
  { id: "top", label: "Rated 4.5+" },
];

const DisplayFood = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [filter, setFilter] = useState("all");

  const items = food_list.filter((item) => {
    if (category !== "All" && category !== item.category) return false;
    if (filter === "veg") return item.veg;
    if (filter === "new") return item.isNew;
    if (filter === "top") return item.rating >= 4.5;
    return true;
  });

  return (
    <section className="food-display" id="food-display">
      <div className="food-display-head">
        <div>
          <h2 className="section-title">
            {category === "All" ? "Top dishes near you" : category}
          </h2>
          <p className="section-sub">{items.length} dishes ready to order</p>
        </div>
        <div className="food-display-filters">
          {filters.map((f) => (
            <button
              key={f.id}
              className={filter === f.id ? "active" : ""}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      {items.length ? (
        <div className="food-display-items">
          {items.map((item) => (
            <FoodItem key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <p className="food-display-empty">No dishes match this filter yet.</p>
      )}
    </section>
  );
};

export default DisplayFood;
