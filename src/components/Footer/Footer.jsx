import React, { useContext } from "react";
import "./footer.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
const Footer = () => {
  const { cartItems, setCartItems, addToCart, removeFromcart, isDarkTheme } =
    useContext(StoreContext);
  const DarkTheme = {
    color: "white",
    background: "#1f1e1e",
  };
  const lightTheme = {
    color: "black",
    background: "white",
  };

  return (
    <div
      className="footer"
      name="footer"
      style={DarkTheme}
    >
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo"/>
          <p>
            The app becomes a convenient one-stop-shop for users, allowing them
            to order all sorts of items, food or otherwise. Customers can get
            everything they need in one place, making the app even more useful
            to them, which in turn brings their loyalty. Examples: DoorDash,
            UberEats
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook_icon" />
            <img src={assets.linkedin_icon} alt="linkedin_icon" />
            <img src={assets.twitter_icon} alt="twitter_icon" />
          </div>
        </div>
        <div className="footer-content-center">
          <h1>COMPANY</h1>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h1>GET IN TOUCH</h1>
          <ul>
            <li>+91 9345237199</li>
            <li>mageshmarch@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 Tomato.com - All Rights Reserved{" "}
      </p>
    </div>
  );
};

export default Footer;
