import React from "react";
import "./appdownload.css";
import { assets } from "../../assets/frontend_assets/assets";
import { LogoMark } from "../Logo/Logo";

const AppDownload = () => {
  return (
    <section className="app-download" id="app-download">
      <div className="app-download-copy">
        <LogoMark size={52} />
        <h2>Get the Biteway app</h2>
        <p>
          Live order tracking, one-tap reorders and app-only deals. Your next meal is a few taps
          away.
        </p>
        <div className="app-download-platform">
          <img src={assets.app_store} alt="Download on the App Store" />
          <img src={assets.play_store} alt="Get it on Google Play" />
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
