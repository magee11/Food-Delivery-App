import React, { useContext } from "react";
import "./displayfood.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const DisplayFood = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div className="food-display" name="food-display">
      <h2> Top dishes near you</h2>
      <div className="food-display-items">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return <FoodItem item={item} index={index} />;
          }
        })}
      </div>
    </div>
  );
};

export default DisplayFood;
