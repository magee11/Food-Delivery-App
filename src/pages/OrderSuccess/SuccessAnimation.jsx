import React, { useEffect, useMemo } from "react";

const COLORS = ["#ff5a1f", "#f5a524", "#1f9d55", "#4a7dff", "#e0457b", "#ffffff"];
const DURATION_MS = 2800;

// Full-screen "order placed" moment: drawn check mark, ripples and confetti.
const SuccessAnimation = ({ orderId, onDone }) => {
  const confetti = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.6 + 0.5,
        duration: Math.random() * 1.4 + 1.8,
        drift: (Math.random() - 0.5) * 220,
        spin: Math.random() * 720 - 360,
        color: COLORS[i % COLORS.length],
        round: i % 3 === 0,
      })),
    []
  );

  useEffect(() => {
    const t = setTimeout(onDone, DURATION_MS);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="os-intro" onClick={onDone} role="status" aria-label="Order placed">
      <div className="os-confetti" aria-hidden="true">
        {confetti.map((c, i) => (
          <i
            key={i}
            className={c.round ? "round" : ""}
            style={{
              left: `${c.left}%`,
              background: c.color,
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`,
              "--drift": `${c.drift}px`,
              "--spin": `${c.spin}deg`,
            }}
          />
        ))}
      </div>

      <div className="os-check-wrap">
        <span className="os-ripple" />
        <span className="os-ripple os-ripple-2" />
        <svg className="os-check" viewBox="0 0 120 120" aria-hidden="true">
          <circle className="os-check-circle" cx="60" cy="60" r="54" />
          <path className="os-check-mark" d="M36 62 l16 16 l32 -36" />
        </svg>
      </div>
      <h1 className="os-intro-title">Order placed!</h1>
      <p className="os-intro-sub">#{orderId} · Sit back, we&apos;re on it</p>
      <span className="os-intro-skip">Tap anywhere to continue</span>
    </div>
  );
};

export default SuccessAnimation;
