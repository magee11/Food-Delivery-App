import React from "react";
import "./appdownload.css";
import { assets } from "../../assets/frontend_assets/assets";
const AppDownload = () => {
  return (
    <div className="app-download" name="app-download">
      <p>
        For Better Exprience Download <br /> Tomato App
      </p>
      <div className="app-download-platform">
        <img src={assets.app_store} alt="app_store" />
        <img src={assets.play_store} alt="play_store" />
      </div>
    </div>
  );
};

export default AppDownload;
