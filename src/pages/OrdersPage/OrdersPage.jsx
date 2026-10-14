import React, { useContext } from "react";
import "./orderspage.css";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon/Icon";
import { StoreContext } from "../../context/StoreContext";
import { ORDER_STEPS, getOrderStepIndex } from "../../utils/orderStatus";
import { useNow } from "../../utils/useNow";

const OrdersPage = () => {
  const { orders } = useContext(StoreContext);
  const navigate = useNavigate();
  const now = useNow(1000, orders.some((o) => getOrderStepIndex(o) < ORDER_STEPS.length - 1));

  if (!orders.length) {
    return (
      <div className="orders-empty">
        <div className="orders-empty-icon">
          <Icon name="receipt" size={42} strokeWidth={1.6} />
        </div>
        <h2>No orders yet</h2>
        <p>When you place an order, you can track it right here.</p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Start ordering
        </button>
      </div>
    );
  }

  return (
    <div className="orders">
      <h1 className="section-title">Your orders</h1>
      <ul className="orders-list">
        {orders.map((order) => {
          const stepIndex = getOrderStepIndex(order, now);
          const delivered = stepIndex === ORDER_STEPS.length - 1;
          return (
            <li key={order.id} className="orders-card">
              <div className="orders-card-head">
                <div>
                  <strong>#{order.id}</strong>
                  <span>
                    {new Date(order.createdAt).toLocaleString(undefined, {
                      day: "numeric", month: "short", hour: "numeric", minute: "2-digit",
                    })}
                  </span>
                </div>
                <span className={`orders-status ${delivered ? "delivered" : "active"}`}>
                  {ORDER_STEPS[stepIndex].label}
                </span>
              </div>
              <div className="orders-thumbs">
                {order.items.slice(0, 4).map((item) => (
                  <img key={item._id} src={item.image} alt="" />
                ))}
                <p>
                  {order.items.map((i) => `${i.name} × ${i.qty}`).join(", ")}
                </p>
              </div>
              <div className="orders-card-foot">
                <strong>${order.bill.total.toFixed(2)}</strong>
                <div>
                  {delivered && !order.rating && (
                    <button className="btn btn-ghost" onClick={() => navigate(`/order/${order.id}/rate`)}>
                      <Icon name="star" size={16} /> Rate
                    </button>
                  )}
                  {order.rating && (
                    <span className="orders-rated">
                      {"★".repeat(order.rating.stars)}
                      <i>{"★".repeat(5 - order.rating.stars)}</i>
                    </span>
                  )}
                  <button className="btn btn-primary" onClick={() => navigate(`/order/${order.id}`)}>
                    {delivered ? "Details" : "Track"}
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OrdersPage;
