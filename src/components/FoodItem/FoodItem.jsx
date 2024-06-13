import React, { useContext, useState } from "react";
import "./fooditem.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ item, index }) => {
  const { _id, name, price, description, image } = item;
  const { cartItems, setCartItems, addToCart, removeFromCart } =
    useContext(StoreContext);
  const DarkThemeDescription = {
    color: "white",
  };
  
  const { isDarkTheme } = useContext(StoreContext);
  const darkTheme = {
    color: "white",
    background: "#454545",
  };
  const lightTheme = {
    backgroundColor: "#fff",
    color: "black",
  };
  return (
    <div
      className="food-item"
      key={index}
      style={isDarkTheme ? darkTheme : lightTheme}
    >
      <div className="food-item-img-container">
        <img src={image} className="food-item-image" alt="images" />
        {!cartItems[_id] ? (
          <img 
            className="add"
            alt="add_icon_white"
            onClick={() => addToCart(_id)}
            src={assets.add_icon_white}
          ></img>
        ) : (
          <div
            className="food-item-counter"
            style={{ background: isDarkTheme ? "#101010" : "white" }}
          >
            <img
              src={assets.remove_icon_red}
              alt="remove_icon_red"
              onClick={() => removeFromCart(_id)}
            />
            <p style={{ color: isDarkTheme ? "white" : "black" }}>
              {cartItems[_id]}
            </p>
            <img src={assets.add_icon_green} onClick={() => addToCart(_id)} alt="add_icon_green" />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating_starts"/>
        </div>
        <div className="food-item-desc" style={isDarkTheme ? darkTheme : lightTheme}>
          {description}
        </div>
        <div className="food-item-price">${price}</div>
      </div>
    </div>
  );
};

export default FoodItem;
