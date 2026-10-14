import React, { useContext, useState } from "react";
import "./offers.css";
import { offers } from "../../assets/dishes/offers";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import Icon from "../Icon/Icon";

const Offers = () => {
  const { openFood, setAppliedPromo } = useContext(StoreContext);
  const [copied, setCopied] = useState(null);

  const applyCode = (code) => {
    // Apply first: the clipboard call can stay pending (e.g. permission prompt).
    setAppliedPromo(code);
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopied(code);
    toast.success(`${code} copied and applied to your cart`);
    setTimeout(() => setCopied((c) => (c === code ? null : c)), 2000);
  };

  return (
    <section className="offers" id="offers">
      <div className="offers-head">
        <h2 className="section-title">Offers for you</h2>
        <p className="section-sub">Grab a deal before you order.</p>
      </div>
      <div className="offers-list">
        {offers.map((offer, i) => (
          <article
            key={offer.id}
            className={`offer offer-${offer.tone} ${offer.dishId ? "offer-clickable" : ""}`}
            style={{ animationDelay: `${i * 0.07}s` }}
            onClick={offer.dishId ? () => openFood(offer.dishId) : undefined}
          >
            <div className="offer-copy">
              <span className="offer-eyebrow">{offer.eyebrow}</span>
              <h3>{offer.title}</h3>
              <p>{offer.text}</p>
              {offer.code && (
                <button className="offer-code" onClick={() => applyCode(offer.code)}>
                  <span>{offer.code}</span>
                  {copied === offer.code ? "Applied ✓" : "Use code"}
                </button>
              )}
              {offer.dishId && (
                <span className="offer-cta">
                  View dish <Icon name="arrow" size={16} />
                </span>
              )}
            </div>
            <img src={offer.image} alt="" className="offer-img" loading="lazy" />
          </article>
        ))}
      </div>
    </section>
  );
};

export default Offers;
