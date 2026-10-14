import React, { useEffect, useState } from "react";
import "./splash.css";
import { LogoMark } from "../Logo/Logo";

const SPLASH_MS = 2200;

const SplashScreen = ({ onDone }) => {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const leave = setTimeout(() => setLeaving(true), SPLASH_MS);
    const done = setTimeout(onDone, SPLASH_MS + 450);
    return () => {
      clearTimeout(leave);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <div className={`splash ${leaving ? "splash-leave" : ""}`} role="status" aria-label="Loading Biteway">
      <div className="splash-ring" />
      <div className="splash-ring splash-ring-2" />
      <div className="splash-center">
        <div className="splash-mark">
          <LogoMark size={88} />
        </div>
        <h1 className="splash-word">
          Bite<span>way</span>
        </h1>
        <p className="splash-tag">Good food, on its way.</p>
      </div>
      <div className="splash-loader">
        <span />
      </div>
    </div>
  );
};

export default SplashScreen;
