import React, { useContext, useEffect, useState } from "react";
import "./checkout.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import Icon from "../../components/Icon/Icon";
import PaymentProcessing from "./PaymentProcessing";

const METHODS = [
  { id: "card", label: "Credit / Debit card", hint: "Visa, Mastercard, RuPay" },
  { id: "upi", label: "UPI", hint: "GPay, PhonePe, Paytm" },
  { id: "cod", label: "Cash on delivery", hint: "Pay when your food arrives" },
];
const UPI_APPS = ["GPay", "PhonePe", "Paytm"];
const TEST_CARD = { number: "4242 4242 4242 4242", name: "Biteway Tester", expiry: "12/30", cvv: "123" };

const readSavedAddress = () => {
  try {
    return JSON.parse(localStorage.getItem("checkoutAddress"));
  } catch {
    return null;
  }
};

const formatCardNumber = (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
const formatExpiry = (v) => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};
const cardBrand = (num) => {
  const n = num.replace(/\s/g, "");
  if (/^4/.test(n)) return "VISA";
  if (/^(5[1-5]|2[2-7])/.test(n)) return "Mastercard";
  if (/^(60|65|81|82)/.test(n)) return "RuPay";
  return "Card";
};

const validateAddress = (a) => {
  const e = {};
  if (!a.name.trim()) e.name = "Enter your name";
  if (!/^\+?\d{10,13}$/.test(a.phone.replace(/\s/g, ""))) e.phone = "Enter a valid phone number";
  if (a.line.trim().length < 5) e.line = "Enter your full address";
  if (!a.city.trim()) e.city = "Enter your city";
  if (!/^\d{5,6}$/.test(a.pincode.trim())) e.pincode = "Enter a valid pincode";
  return e;
};

const validatePayment = (method, card, upiId) => {
  const e = {};
  if (method === "card") {
    if (card.number.replace(/\s/g, "").length !== 16) e.number = "Card number must be 16 digits";
    if (!card.name.trim()) e.cardName = "Enter the name on the card";
    const [mm, yy] = card.expiry.split("/").map(Number);
    const now = new Date();
    const expired = !yy || yy + 2000 < now.getFullYear() ||
      (yy + 2000 === now.getFullYear() && mm < now.getMonth() + 1);
    if (!mm || mm > 12 || expired) e.expiry = "Enter a valid expiry";
    if (!/^\d{3}$/.test(card.cvv)) e.cvv = "3-digit CVV";
  }
  if (method === "upi" && !/^[\w.-]{2,}@[a-z]{2,}$/i.test(upiId.trim())) e.upi = "Enter a UPI ID like name@bank";
  return e;
};

const Field = ({ label, error, className = "", ...props }) => (
  <label className={`co-field ${error ? "has-error" : ""} ${className}`}>
    <span>{label}</span>
    <input {...props} />
    {error && <small>{error}</small>}
  </label>
);

const Checkout = () => {
  const { food_list, cartItems, getBill, appliedPromo, userProfile, placeOrder } = useContext(StoreContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [address, setAddress] = useState(() => readSavedAddress() || {
    name: [userProfile?.firstName, userProfile?.secondName].filter(Boolean).join(" "),
    phone: userProfile?.phoneNumber || "",
    line: [userProfile?.address1, userProfile?.address2].filter((s) => s && s.trim()).join(", "),
    city: userProfile?.city || "",
    pincode: userProfile?.pincode || "",
  });
  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [cardFlipped, setCardFlipped] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  const items = food_list.filter((f) => cartItems[f._id] > 0);
  const bill = getBill();

  useEffect(() => {
    if (!items.length && !processing) navigate("/cart", { replace: true });
  }, [items.length, processing, navigate]);

  const setAddr = (k) => (e) => setAddress((a) => ({ ...a, [k]: e.target.value }));
  const setCardField = (k, fmt = (v) => v) => (e) => setCard((c) => ({ ...c, [k]: fmt(e.target.value) }));

  const continueToPayment = (e) => {
    e.preventDefault();
    const errs = validateAddress(address);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    try {
      localStorage.setItem("checkoutAddress", JSON.stringify(address));
    } catch {
      /* not critical */
    }
    setStep(2);
  };

  const pay = (e) => {
    e.preventDefault();
    const errs = validatePayment(method, card, upiId);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setProcessing(true);
  };

  const finishPayment = () => {
    const payment =
      method === "card"
        ? { method: "card", label: `${cardBrand(card.number)} •••• ${card.number.slice(-4)}` }
        : method === "upi"
        ? { method: "upi", label: `UPI · ${upiId.trim()}` }
        : { method: "cod", label: "Cash on delivery" };
    const order = placeOrder({ address, payment });
    navigate(`/order/${order.id}`, { replace: true, state: { justPlaced: true } });
  };

  if (!items.length && !processing) return null;

  const payLabel = method === "cod" ? "Place order" : `Pay $${bill.total.toFixed(2)}`;

  return (
    <div className="checkout">
      {processing && <PaymentProcessing method={method} amount={bill.total} onDone={finishPayment} />}

      <button className="co-back" onClick={() => (step === 2 ? setStep(1) : navigate("/cart"))}>
        <Icon name="back" size={18} /> {step === 2 ? "Back to address" : "Back to cart"}
      </button>
      <h1 className="section-title">Checkout</h1>

      <ol className="co-steps">
        {["Delivery address", "Payment"].map((label, i) => (
          <li key={label} className={step > i + 1 ? "done" : step === i + 1 ? "current" : ""}>
            <span>{step > i + 1 ? "✓" : i + 1}</span> {label}
          </li>
        ))}
      </ol>

      <div className="co-layout">
        <div className="co-main">
          {step === 1 && (
            <form className="co-card" onSubmit={continueToPayment} noValidate>
              <h2><Icon name="pin" size={20} /> Where should we deliver?</h2>
              <div className="co-grid">
                <Field label="Full name" value={address.name} onChange={setAddr("name")} error={errors.name} autoComplete="name" />
                <Field label="Phone" type="tel" value={address.phone} onChange={setAddr("phone")} error={errors.phone} autoComplete="tel" />
                <Field label="House / street / area" className="co-span" value={address.line} onChange={setAddr("line")} error={errors.line} autoComplete="street-address" />
                <Field label="City" value={address.city} onChange={setAddr("city")} error={errors.city} autoComplete="address-level2" />
                <Field label="Pincode" inputMode="numeric" value={address.pincode} onChange={setAddr("pincode")} error={errors.pincode} autoComplete="postal-code" />
              </div>
              <button className="btn btn-primary co-submit" type="submit">
                Continue to payment <Icon name="arrow" size={18} />
              </button>
            </form>
          )}

          {step === 2 && (
            <form className="co-card" onSubmit={pay} noValidate>
              <div className="co-address-summary">
                <Icon name="pin" size={18} />
                <div>
                  <strong>{address.name}</strong>
                  <span>{address.line}, {address.city} {address.pincode}</span>
                </div>
                <button type="button" onClick={() => setStep(1)}>Change</button>
              </div>

              <h2>How would you like to pay?</h2>
              <div className="co-demo-note">
                Demo checkout: no real payment is taken and nothing leaves this browser.
              </div>

              <div className="co-methods" role="radiogroup">
                {METHODS.map((m) => (
                  <button
                    type="button"
                    role="radio"
                    aria-checked={method === m.id}
                    key={m.id}
                    className={`co-method ${method === m.id ? "active" : ""}`}
                    onClick={() => { setMethod(m.id); setErrors({}); }}
                  >
                    <span className="co-radio" />
                    <span>
                      <strong>{m.label}</strong>
                      <small>{m.hint}</small>
                    </span>
                  </button>
                ))}
              </div>

              {method === "card" && (
                <div className="co-card-pay">
                  <div className={`co-cc ${cardFlipped ? "flipped" : ""}`} aria-hidden="true">
                    <div className="co-cc-face co-cc-front">
                      <div className="co-cc-top">
                        <span className="co-cc-chip" />
                        <span className="co-cc-brand">{cardBrand(card.number)}</span>
                      </div>
                      <div className="co-cc-number">{card.number || "•••• •••• •••• ••••"}</div>
                      <div className="co-cc-bottom">
                        <span>{card.name || "CARDHOLDER NAME"}</span>
                        <span>{card.expiry || "MM/YY"}</span>
                      </div>
                    </div>
                    <div className="co-cc-face co-cc-back">
                      <div className="co-cc-strip" />
                      <div className="co-cc-cvv">{card.cvv.replace(/./g, "•") || "CVV"}</div>
                    </div>
                  </div>

                  <div className="co-grid">
                    <Field label="Card number" className="co-span" inputMode="numeric" placeholder="1234 5678 9012 3456"
                      value={card.number} onChange={setCardField("number", formatCardNumber)} error={errors.number} autoComplete="off" />
                    <Field label="Name on card" className="co-span" value={card.name}
                      onChange={setCardField("name")} error={errors.cardName} autoComplete="off" />
                    <Field label="Expiry" inputMode="numeric" placeholder="MM/YY" value={card.expiry}
                      onChange={setCardField("expiry", formatExpiry)} error={errors.expiry} autoComplete="off" />
                    <Field label="CVV" inputMode="numeric" placeholder="123" value={card.cvv}
                      onChange={setCardField("cvv", (v) => v.replace(/\D/g, "").slice(0, 3))}
                      onFocus={() => setCardFlipped(true)} onBlur={() => setCardFlipped(false)}
                      error={errors.cvv} autoComplete="off" />
                  </div>
                  <button type="button" className="co-testcard" onClick={() => { setCard(TEST_CARD); setErrors({}); }}>
                    Fill demo test card
                  </button>
                </div>
              )}

              {method === "upi" && (
                <div className="co-upi">
                  <div className="co-upi-apps">
                    {UPI_APPS.map((app) => (
                      <button type="button" key={app} onClick={() => { setUpiId(`biteway@${app.toLowerCase()}`); setErrors({}); }}>
                        {app}
                      </button>
                    ))}
                  </div>
                  <Field label="UPI ID" placeholder="name@bank" value={upiId}
                    onChange={(e) => setUpiId(e.target.value)} error={errors.upi} autoComplete="off" />
                </div>
              )}

              {method === "cod" && (
                <p className="co-cod">
                  💵 Please keep ${bill.total.toFixed(2)} ready. Our rider will collect it at your door.
                </p>
              )}

              <button className="btn btn-primary co-submit" type="submit">
                {payLabel} <Icon name="arrow" size={18} />
              </button>
            </form>
          )}
        </div>

        <aside className="co-summary">
          <h3>Order summary</h3>
          <ul>
            {items.map((item) => (
              <li key={item._id}>
                <img src={item.image} alt="" />
                <span>{item.name} <em>× {cartItems[item._id]}</em></span>
                <strong>${item.price * cartItems[item._id]}</strong>
              </li>
            ))}
          </ul>
          <div className="co-bill">
            <p><span>Subtotal</span><span>${bill.subtotal.toFixed(2)}</span></p>
            {bill.discount > 0 && (
              <p className="co-discount"><span>Discount ({appliedPromo})</span><span>−${bill.discount.toFixed(2)}</span></p>
            )}
            <p><span>Delivery</span><span>{bill.delivery ? `$${bill.delivery.toFixed(2)}` : "Free"}</span></p>
            <p className="co-total"><span>To pay</span><span>${bill.total.toFixed(2)}</span></p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
