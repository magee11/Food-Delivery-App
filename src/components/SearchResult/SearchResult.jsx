import React, { useContext } from "react";
import { food_list } from "../../assets/frontend_assets/assets";
import FoodItem from "../FoodItem/FoodItem";
import { StoreContext } from "../../context/StoreContext";
import "./searchresult.css";

const SearchResult = () => {
  const { searchQuery } = useContext(StoreContext);
  return (
    <div className="search-result">
      <h2> Search Result for "{searchQuery}"</h2>
      <div className="search-result-items">
        {food_list
          .filter((item) =>
            item.name
              .toLocaleLowerCase()
              .includes(searchQuery.toLocaleLowerCase())
          )
          .map((item, index) => (
            <FoodItem item={item} index={index} />
          ))}
      </div>
    </div>
  );
};

export default SearchResult;
