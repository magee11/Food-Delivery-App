import React, { useContext, useEffect, useRef } from "react";
import "./productmodal.css";
import { StoreContext } from "../../context/StoreContext";
import Icon from "../Icon/Icon";

const tasteEmoji = {
  Spicy: "🌶️", "Mildly spicy": "🌶️", Smoky: "🔥", Tangy: "🍋", Zesty: "🍋", Citrusy: "🍋",
  Sweet: "🍯", "Sweet chilli": "🍯", Caramel: "🍮", Fruity: "🍓", Chocolatey: "🍫",
  Creamy: "🥛", Cheesy: "🧀", Buttery: "🧈", Velvety: "🍰", Rich: "✨",
  Fresh: "🌿", Herby: "🌿", Light: "🍃", Earthy: "🍄", Garlicky: "🧄", Nutty: "🥜",
  Crispy: "✨", Crunchy: "✨", Umami: "🍜", Aromatic: "🌼",
};

const ProductModal = () => {
  const { selectedFood: item, closeFood, openFood, food_list, cartItems, addToCart, removeFromCart } =
    useContext(StoreContext);
  const closeRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (!item) return;
    const previous = document.activeElement;
    const onKey = (e) => e.key === "Escape" && closeFood();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    bodyRef.current?.scrollTo({ top: 0 });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, [item, closeFood]);

  if (!item) return null;

  const qty = cartItems[item._id] || 0;
  const related = food_list
    .filter((f) => f.category === item.category && f._id !== item._id)
    .slice(0, 3);

  return (
    <div className="pm-backdrop" onClick={closeFood}>
      <div
        className="pm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pm-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} className="pm-close" onClick={closeFood} aria-label="Close">
          <Icon name="close" size={20} />
        </button>

        <div className="pm-media">
          <img src={item.image} alt={item.name} />
          {item.isNew && <span className="food-item-badge">New</span>}
        </div>

        <div className="pm-body" ref={bodyRef}>
          <div className="pm-meta">
            <span className={`veg-mark ${item.veg ? "" : "nonveg"}`} />
            <span>{item.veg ? "Veg" : "Non-veg"}</span>
            <span className="pm-dot">•</span>
            <span>{item.category}</span>
          </div>
          <h2 id="pm-title">{item.name}</h2>
          <div className="pm-stats">
            <span className="pm-rating">
              <Icon name="star" size={14} /> {item.rating}
            </span>
            <span>
              <Icon name="clock" size={14} /> {item.time} min
            </span>
          </div>
          <p className="pm-desc">{item.description}</p>

          <h3 className="pm-label">Taste profile</h3>
          <ul className="pm-pills">
            {item.taste.map((t) => (
              <li key={t} className="pm-pill pm-pill-taste">
                <span aria-hidden="true">{tasteEmoji[t] || "✨"}</span> {t}
              </li>
            ))}
          </ul>

          <h3 className="pm-label">Ingredients</h3>
          <ul className="pm-pills">
            {item.ingredients.map((ing) => (
              <li key={ing} className="pm-pill">{ing}</li>
            ))}
          </ul>

          {related.length > 0 && (
            <>
              <h3 className="pm-label">More {item.category.toLowerCase()}</h3>
              <div className="pm-related">
                {related.map((r) => (
                  <button key={r._id} onClick={() => openFood(r._id)}>
                    <img src={r.image} alt="" />
                    <span>{r.name}</span>
                    <strong>${r.price}</strong>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="pm-footer">
          <div>
            <span className="pm-price">${item.price}</span>
            {qty > 0 && <span className="pm-subtotal">${item.price * qty} in cart</span>}
          </div>
          {!qty ? (
            <button className="btn btn-primary pm-add" onClick={() => addToCart(item._id)}>
              <Icon name="bag" size={18} /> Add to cart
            </button>
          ) : (
            <div className="food-item-counter pm-counter">
              <button onClick={() => removeFromCart(item._id)} aria-label="Decrease">
                <Icon name="minus" size={18} strokeWidth={2.6} />
              </button>
              <span>{qty}</span>
              <button onClick={() => addToCart(item._id)} aria-label="Increase">
                <Icon name="plus" size={18} strokeWidth={2.6} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
