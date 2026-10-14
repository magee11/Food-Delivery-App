import React from "react";
import "./footer.css";
import { assets } from "../../assets/frontend_assets/assets";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <Logo size={36} />
          <p>
            Biteway brings your neighbourhood&apos;s best kitchens to your door: fresh, fast and
            made with care. One app for every craving, from breakfast to late-night bites.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
            <img src={assets.twitter_icon} alt="Twitter" />
          </div>
        </div>
        <div className="footer-content-center">
          <h3>Company</h3>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h3>Get in touch</h3>
          <ul>
            <li>+91 9345237199</li>
            <li>mageshmarch@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        © {new Date().getFullYear()} Biteway. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
