import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Icon from "../../components/Icon/Icon";
import { promo_codes } from "../../assets/dishes/offers";
import { FREE_DELIVERY_OVER } from "../../utils/bill";


const Cart = () => {
  const {
    food_list, cartItems, addToCart, removeFromCart, deleteFromCart,
    appliedPromo, setAppliedPromo, getBill, openFood,
  } = useContext(StoreContext);
  const navigate = useNavigate();
  const [promo, setPromo] = useState(appliedPromo);
  useEffect(() => setPromo(appliedPromo), [appliedPromo]);

  const items = food_list.filter((item) => cartItems[item._id] > 0);
  const { subtotal, discount, delivery, total } = getBill();

  const applyPromo = (e) => {
    e.preventDefault();
    const code = promo.trim().toUpperCase();
    if (promo_codes[code]) {
      setAppliedPromo(code);
      toast.success(`Promo applied: ${promo_codes[code] * 100}% off`);
    } else {
      setAppliedPromo("");
      toast.error("That promo code isn't valid");
    }
  };

  if (!items.length) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-icon">
          <Icon name="bag" size={44} strokeWidth={1.6} />
        </div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven&apos;t added anything yet. Let&apos;s fix that.</p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Browse dishes
        </button>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1 className="section-title">Your cart</h1>
      <div className="cart-layout">
        <ul className="cart-items">
          {items.map((item) => (
            <li className="cart-item" key={item._id}>
              <img src={item.image} alt={item.name} onClick={() => openFood(item._id)} />
              <div className="cart-item-info">
                <div className="cart-item-name">
                  <span className={`veg-mark ${item.veg ? "" : "nonveg"}`} />
                  <h3>{item.name}</h3>
                </div>
                <span className="cart-item-unit">${item.price} each</span>
                <div className="cart-item-controls">
                  <div className="food-item-counter">
                    <button onClick={() => removeFromCart(item._id)} aria-label="Decrease">
                      <Icon name="minus" size={16} strokeWidth={2.6} />
                    </button>
                    <span>{cartItems[item._id]}</span>
                    <button onClick={() => addToCart(item._id)} aria-label="Increase">
                      <Icon name="plus" size={16} strokeWidth={2.6} />
                    </button>
                  </div>
                  <strong>${item.price * cartItems[item._id]}</strong>
                </div>
              </div>
              <button
                className="cart-item-remove"
                onClick={() => deleteFromCart(item._id)}
                aria-label={`Remove ${item.name}`}
              >
                <Icon name="trash" size={18} />
              </button>
            </li>
          ))}
        </ul>

        <aside className="cart-summary">
          <form className="cart-promo" onSubmit={applyPromo}>
            <Icon name="tag" size={18} />
            <input
              type="text"
              placeholder="Promo code (try BITE10)"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
            />
            <button type="submit">Apply</button>
          </form>

          <div className="cart-total-details">
            <p><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></p>
            {discount > 0 && (
              <p className="cart-discount"><span>Discount ({appliedPromo})</span><span>−${discount.toFixed(2)}</span></p>
            )}
            <p>
              <span>Delivery fee</span>
              <span>{delivery ? `$${delivery.toFixed(2)}` : "Free"}</span>
            </p>
            {delivery > 0 && (
              <small>Add ${(FREE_DELIVERY_OVER - subtotal).toFixed(2)} more for free delivery</small>
            )}
            <hr />
            <p className="cart-grand"><span>Total</span><span>${total.toFixed(2)}</span></p>
          </div>
          <button
            className="btn btn-primary cart-checkout"
            onClick={() => navigate("/checkout")}
          >
            Proceed to checkout <Icon name="arrow" size={18} />
          </button>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
