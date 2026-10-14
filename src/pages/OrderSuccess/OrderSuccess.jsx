import React, { useCallback, useContext, useState } from "react";
import "./ordersuccess.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import Icon from "../../components/Icon/Icon";
import SuccessAnimation from "./SuccessAnimation";
import { ORDER_STEPS, getOrderStepIndex } from "../../utils/orderStatus";
import { useNow } from "../../utils/useNow";

const OrderSuccess = () => {
  const { id } = useParams();
  const { orders } = useContext(StoreContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const order = orders.find((o) => o.id === id);

  const [showIntro, setShowIntro] = useState(Boolean(state?.justPlaced));
  const endIntro = useCallback(() => {
    setShowIntro(false);
    // Drop the flag so a refresh or Back doesn't replay the celebration.
    navigate(".", { replace: true, state: null });
  }, [navigate]);

  const deliveredAt = order ? order.createdAt + ORDER_STEPS[ORDER_STEPS.length - 1].at * 1000 : 0;
  const now = useNow(1000, Boolean(order) && Date.now() < deliveredAt + 1000);

  if (!order) {
    return (
      <div className="os-missing">
        <h2>We couldn&apos;t find that order</h2>
        <button className="btn btn-primary" onClick={() => navigate("/orders")}>See my orders</button>
      </div>
    );
  }

  const stepIndex = getOrderStepIndex(order, now);
  const delivered = stepIndex === ORDER_STEPS.length - 1;
  const secondsLeft = Math.max(0, Math.ceil((deliveredAt - now) / 1000));
  const firstName = order.address.name.split(" ")[0];
  const itemCount = order.items.reduce((n, i) => n + i.qty, 0);

  return (
    <>
      {showIntro && <SuccessAnimation orderId={order.id} onDone={endIntro} />}

      <div className="os">
        <section className="os-hero">
          <div className="os-hero-badge">
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <circle cx="60" cy="60" r="54" />
              <path d="M36 62 l16 16 l32 -36" />
            </svg>
          </div>
          <h1>Thank you, {firstName}! 🎉</h1>
          <p>
            Your order <strong>#{order.id}</strong> is confirmed.{" "}
            {delivered ? "It has been delivered. Enjoy!" : `Arriving in about ${Math.ceil(secondsLeft / 60) || 1} min (demo time).`}
          </p>
        </section>

        <div className="os-layout">
          <section className="os-card os-track">
            <div className="os-card-head">
              <h2>{delivered ? "Delivered" : "Live tracking"}</h2>
              {!delivered && <span className="os-live"><i /> Live</span>}
            </div>
            <ol className="os-steps">
              {ORDER_STEPS.map((step, i) => (
                <li
                  key={step.id}
                  className={i < stepIndex ? "done" : i === stepIndex ? "current" : ""}
                >
                  <span className="os-step-dot">{i < stepIndex || delivered ? "✓" : ""}</span>
                  <div>
                    <strong>{step.label}</strong>
                    <small>{step.detail}</small>
                  </div>
                </li>
              ))}
            </ol>
            {stepIndex === 2 && (
              <div className="os-rider">
                <span className="os-rider-icon">
                  <Icon name="bike" size={22} />
                </span>
                <div>
                  <strong>Arjun is on the way</strong>
                  <small>Your rider · ★ 4.9</small>
                </div>
              </div>
            )}

            {delivered ? (
              order.rating ? (
                <div className="os-rated">
                  You rated this order {"★".repeat(order.rating.stars)}
                  <span>{"★".repeat(5 - order.rating.stars)}</span>
                </div>
              ) : (
                <button className="btn btn-primary os-rate" onClick={() => navigate(`/order/${order.id}/rate`)}>
                  <Icon name="star" size={18} /> Rate your order
                </button>
              )
            ) : (
              <p className="os-rate-hint">
                You can rate your food once it&apos;s delivered ({secondsLeft}s in this demo).
              </p>
            )}
          </section>

          <section className="os-card os-details">
            <h2>Order details</h2>
            <ul className="os-items">
              {order.items.map((item) => (
                <li key={item._id}>
                  <img src={item.image} alt="" />
                  <span>{item.name} <em>× {item.qty}</em></span>
                  <strong>${item.price * item.qty}</strong>
                </li>
              ))}
            </ul>
            <div className="os-bill">
              <p><span>{itemCount} items</span><span>${order.bill.subtotal.toFixed(2)}</span></p>
              {order.bill.discount > 0 && (
                <p className="os-discount"><span>Discount ({order.promo})</span><span>−${order.bill.discount.toFixed(2)}</span></p>
              )}
              <p><span>Delivery</span><span>{order.bill.delivery ? `$${order.bill.delivery.toFixed(2)}` : "Free"}</span></p>
              <p className="os-total"><span>Paid</span><span>${order.bill.total.toFixed(2)}</span></p>
            </div>
            <div className="os-meta">
              <div><Icon name="pin" size={16} /> {order.address.line}, {order.address.city}</div>
              <div><Icon name="receipt" size={16} /> {order.payment.label}</div>
            </div>
          </section>
        </div>

        <div className="os-actions">
          <button className="btn btn-ghost" onClick={() => navigate("/orders")}>View all orders</button>
          <button className="btn btn-primary" onClick={() => navigate("/")}>Order something else</button>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
