import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./cart.css";
import { assets } from "../../assets/frontend_assets/assets";
const Cart = () => {
  const {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromcart,
    cartCount,
    isDarkTheme,
    getTotalAmount,
  } = useContext(StoreContext);
  const darkTheme = {
    color: "white",
  };
  const lightTheme = {
    color: "#000",
  };
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title"  style={isDarkTheme ? darkTheme : lightTheme}>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((items, index) => {
          if (cartItems[items._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item"  style={isDarkTheme ? darkTheme : lightTheme}>
                  <img src={items.image} alt="" />
                  <p>{items.name}</p>
                  <p>${items.price}</p>
                  <p>{cartItems[items._id]}</p>
                  <p>${items.price * cartItems[items._id]}</p>
                  <p
                    className="cross"
                    onClick={() => removeFromcart(items._id)}
                  >
                    X
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
        <div className="cart-bottom">
          <div className="cart-promotion">
            <div>
              <p  style={isDarkTheme ? darkTheme : lightTheme}>If you have a promo code, Enter it here </p>
              <div className="cart-promotion-input">
                <input type="text" placeholder="Promo Code" />
                <button>Submit</button>
              </div>
            </div>
          </div>
          <div className="cart-total" >
            <h2>Total price</h2>
            <div > 
              <div className="cart-total-details"  style={isDarkTheme ? darkTheme : lightTheme}>
                <p>Subtotal</p>
                <p>${getTotalAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details"  style={isDarkTheme ? darkTheme : lightTheme}>
                <p>Delivery Fee</p>
                <p>{2}</p>
              </div>
              <hr />
              <div className="cart-total-details"  style={isDarkTheme ? darkTheme : lightTheme}>
                <b>
                  <p>Total</p>
                </b>
                <b>
                  <p>${getTotalAmount() + 2}</p>
                </b>
              </div>
            </div>
            <button>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
