import React from "react";
import "./logo.css";

export const LogoMark = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <rect width="48" height="48" rx="14" fill="#FF5A1F" />
    {/* A plate with a bite taken out of it */}
    <circle cx="23" cy="25" r="13" fill="#fff" />
    <circle cx="23" cy="25" r="7.5" fill="none" stroke="#FF5A1F" strokeWidth="2.2" />
    <circle cx="33.5" cy="13.5" r="4.6" fill="#FF5A1F" />
    <circle cx="37" cy="19.5" r="3.6" fill="#FF5A1F" />
    <circle cx="28" cy="10.8" r="3.6" fill="#FF5A1F" />
  </svg>
);

const Logo = ({ size = 36, onClick }) => (
  <div className="logo" onClick={onClick} role={onClick ? "button" : undefined}>
    <LogoMark size={size} />
    <span className="logo-word" style={{ fontSize: size * 0.62 }}>
      Bite<span>way</span>
    </span>
  </div>
);

export default Logo;
