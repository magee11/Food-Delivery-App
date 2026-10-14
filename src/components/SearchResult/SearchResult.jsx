import React, { useContext } from "react";
import { food_list } from "../../assets/frontend_assets/assets";
import FoodItem from "../FoodItem/FoodItem";
import { StoreContext } from "../../context/StoreContext";
import "./searchresult.css";

const SearchResult = () => {
  const { searchQuery } = useContext(StoreContext);
  const q = searchQuery.trim().toLowerCase();
  const results = food_list.filter(
    (item) => item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
  );

  return (
    <section className="search-result">
      <h2 className="section-title">Results for “{searchQuery.trim()}”</h2>
      <p className="section-sub">
        {results.length} {results.length === 1 ? "dish" : "dishes"} found
      </p>
      {results.length ? (
        <div className="food-display-items">
          {results.map((item) => (
            <FoodItem key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <div className="search-empty">
          <span>🍽️</span>
          <p>Nothing matches yet. Try “cake”, “paneer” or “noodles”.</p>
        </div>
      )}
    </section>
  );
};

export default SearchResult;
