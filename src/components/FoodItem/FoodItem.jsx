import React, { useContext } from "react";
import "./fooditem.css";
import { StoreContext } from "../../context/StoreContext";
import Icon from "../Icon/Icon";

const FoodItem = ({ item }) => {
  const { _id, name, price, description, image, rating, time, veg, isNew } = item;
  const { cartItems, addToCart, removeFromCart, openFood } = useContext(StoreContext);
  const qty = cartItems[_id] || 0;

  return (
    <article
      className="food-item"
      role="button"
      tabIndex={0}
      aria-label={`View ${name}`}
      onClick={() => openFood(_id)}
      onKeyDown={(e) => {
        if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          openFood(_id);
        }
      }}
    >
      <div className="food-item-img-container">
        <img src={image} className="food-item-image" alt={name} loading="lazy" />
        {isNew && <span className="food-item-badge">New</span>}
        <span className="food-item-time">
          <Icon name="clock" size={13} /> {time} min
        </span>
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <span className={`veg-mark ${veg ? "" : "nonveg"}`} title={veg ? "Veg" : "Non-veg"} />
          <h3>{name}</h3>
        </div>
        <p className="food-item-desc">{description}</p>
        <ul className="food-item-tastes">
          {item.taste.slice(0, 2).map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {/* Cart controls shouldn't open the detail modal */}
        <div className="food-item-footer" onClick={(e) => e.stopPropagation()}>
          <div>
            <div className="food-item-price">${price}</div>
            <div className="food-item-rating">
              <Icon name="star" size={13} /> {rating}
            </div>
          </div>
          {!qty ? (
            <button className="food-item-add" onClick={() => addToCart(_id)} aria-label={`Add ${name}`}>
              <Icon name="plus" size={18} strokeWidth={2.6} /> Add
            </button>
          ) : (
            <div className="food-item-counter">
              <button onClick={() => removeFromCart(_id)} aria-label={`Remove one ${name}`}>
                <Icon name="minus" size={16} strokeWidth={2.6} />
              </button>
              <span>{qty}</span>
              <button onClick={() => addToCart(_id)} aria-label={`Add one ${name}`}>
                <Icon name="plus" size={16} strokeWidth={2.6} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default FoodItem;
