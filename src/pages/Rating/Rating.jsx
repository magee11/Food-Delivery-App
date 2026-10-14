import React, { useContext, useState } from "react";
import "./rating.css";
import { useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import Icon from "../../components/Icon/Icon";

const MOODS = [
  { emoji: "😞", label: "Terrible" },
  { emoji: "😕", label: "Not great" },
  { emoji: "😐", label: "It was okay" },
  { emoji: "😊", label: "Really good" },
  { emoji: "😍", label: "Loved it!" },
];
const GOOD_TAGS = ["Hot & fresh", "Tasty", "Great portions", "Well packed", "On time", "Friendly rider", "Value for money"];
const BAD_TAGS = ["Cold food", "Late delivery", "Missing items", "Poor packaging", "Too spicy", "Small portions", "Rude rider"];

const Stars = ({ value, onChange, size = 44, label }) => {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div className="rt-stars" role="radiogroup" aria-label={label} onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          className={n <= shown ? "on" : ""}
          style={{ "--i": n }}
          onMouseEnter={() => setHover(n)}
          onClick={() => onChange(n)}
        >
          <Icon name="star" size={size} />
        </button>
      ))}
    </div>
  );
};

const Rating = () => {
  const { id } = useParams();
  const { orders, rateOrder } = useContext(StoreContext);
  const navigate = useNavigate();
  const order = orders.find((o) => o.id === id);

  const [step, setStep] = useState(order?.rating ? 3 : 1);
  const [stars, setStars] = useState(order?.rating?.stars || 0);
  const [riderStars, setRiderStars] = useState(0);
  const [tags, setTags] = useState([]);
  const [dishVotes, setDishVotes] = useState({});
  const [comment, setComment] = useState("");

  if (!order) {
    return (
      <div className="rt-missing">
        <h2>We couldn&apos;t find that order</h2>
        <button className="btn btn-primary" onClick={() => navigate("/orders")}>See my orders</button>
      </div>
    );
  }

  const tagOptions = stars >= 4 ? GOOD_TAGS : BAD_TAGS;
  const toggleTag = (t) => setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  const voteDish = (dishId, vote) =>
    setDishVotes((prev) => ({ ...prev, [dishId]: prev[dishId] === vote ? undefined : vote }));

  const chooseStars = (n) => {
    // Switching between a good and bad rating changes which tags make sense.
    if ((n >= 4) !== (stars >= 4)) setTags([]);
    setStars(n);
  };

  const submit = () => {
    rateOrder(order.id, { stars, riderStars, tags, dishVotes, comment: comment.trim(), ratedAt: Date.now() });
    setStep(3);
  };

  return (
    <div className="rt">
      {step < 3 && (
        <div className="rt-progress" aria-hidden="true">
          <span className={step >= 1 ? "on" : ""} />
          <span className={step >= 2 ? "on" : ""} />
        </div>
      )}

      {step === 1 && (
        <section className="rt-card rt-overall" key="s1">
          <span className="rt-eyebrow">Order #{order.id}</span>
          <h1>How was your food?</h1>
          <div className="rt-thumbs">
            {order.items.slice(0, 4).map((item, i) => (
              <img key={item._id} src={item.image} alt="" style={{ "--i": i }} />
            ))}
          </div>
          <div className="rt-mood" key={stars}>
            <span>{stars ? MOODS[stars - 1].emoji : "🍽️"}</span>
            <p>{stars ? MOODS[stars - 1].label : "Tap a star to rate"}</p>
          </div>
          <Stars value={stars} onChange={chooseStars} label="Overall rating" />
          <button className="btn btn-primary rt-next" disabled={!stars} onClick={() => setStep(2)}>
            Continue <Icon name="arrow" size={18} />
          </button>
          <button className="rt-skip" onClick={() => navigate(`/order/${order.id}`)}>Maybe later</button>
        </section>
      )}

      {step === 2 && (
        <section className="rt-card" key="s2">
          <button className="rt-back" onClick={() => setStep(1)}>
            <Icon name="back" size={18} /> {MOODS[stars - 1].emoji} {stars} star{stars > 1 ? "s" : ""}
          </button>
          <h2>{stars >= 4 ? "What did you love?" : "What went wrong?"}</h2>
          <div className="rt-tags">
            {tagOptions.map((t, i) => (
              <button
                key={t}
                className={tags.includes(t) ? "on" : ""}
                style={{ "--i": i }}
                onClick={() => toggleTag(t)}
              >
                {tags.includes(t) && "✓ "}{t}
              </button>
            ))}
          </div>

          <h3>Rate each dish</h3>
          <ul className="rt-dishes">
            {order.items.map((item) => (
              <li key={item._id}>
                <img src={item.image} alt="" />
                <span>{item.name}</span>
                <div className="rt-vote">
                  <button
                    className={dishVotes[item._id] === "up" ? "up" : ""}
                    onClick={() => voteDish(item._id, "up")}
                    aria-label={`Liked ${item.name}`}
                  >👍</button>
                  <button
                    className={dishVotes[item._id] === "down" ? "down" : ""}
                    onClick={() => voteDish(item._id, "down")}
                    aria-label={`Didn't like ${item.name}`}
                  >👎</button>
                </div>
              </li>
            ))}
          </ul>

          <h3>Rate your rider</h3>
          <Stars value={riderStars} onChange={setRiderStars} size={28} label="Rider rating" />

          <h3>Anything else?</h3>
          <textarea
            className="rt-comment"
            rows={3}
            maxLength={300}
            placeholder="Tell the kitchen what you thought (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <span className="rt-count">{comment.length}/300</span>

          <button className="btn btn-primary rt-next" onClick={submit}>
            Submit feedback
          </button>
        </section>
      )}

      {step === 3 && (
        <section className="rt-card rt-thanks" key="s3">
          <div className="rt-hearts" aria-hidden="true">
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} style={{ "--i": i, left: `${8 + i * 9}%` }}>
                {["❤️", "🧡", "⭐"][i % 3]}
              </span>
            ))}
          </div>
          <div className="rt-thanks-badge">{MOODS[(order.rating?.stars || stars) - 1]?.emoji || "🙏"}</div>
          <h1>Thanks for your feedback!</h1>
          <p>
            Your review helps our kitchens get even better.
            {(order.rating?.stars || stars) >= 4
              ? " We're so glad you enjoyed it."
              : " We're sorry it wasn't great. We'll make it right next time."}
          </p>
          <div className="rt-thanks-stars">
            {"★".repeat(order.rating?.stars || stars)}
            <span>{"★".repeat(5 - (order.rating?.stars || stars))}</span>
          </div>
          <div className="rt-thanks-actions">
            <button className="btn btn-ghost" onClick={() => navigate("/orders")}>My orders</button>
            <button className="btn btn-primary" onClick={() => navigate("/")}>Back to home</button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Rating;
