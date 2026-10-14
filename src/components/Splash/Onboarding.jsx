import React, { useState } from "react";
import "./onboarding.css";
import { onboarding_images } from "../../assets/dishes";
import Logo from "../Logo/Logo";
import Icon from "../Icon/Icon";

const slides = [
  {
    title: "Discover dishes you'll love",
    text: "From paneer to brownies, browse hand-picked kitchens near you.",
    image: onboarding_images[0],
  },
  {
    title: "Fresh, fast and hot",
    text: "Live tracking and riders who get your order to you in about 30 minutes.",
    image: onboarding_images[1],
  },
  {
    title: "Treat yourself, every day",
    text: "Daily deals, free delivery over $20, and desserts that end every meal right.",
    image: onboarding_images[2],
  },
];

const Onboarding = ({ onDone }) => {
  const [index, setIndex] = useState(0);
  const isLast = index === slides.length - 1;
  const slide = slides[index];

  return (
    <div className="onboarding">
      <div className="onboarding-top">
        <Logo size={30} />
        <button className="onboarding-skip" onClick={onDone}>
          Skip
        </button>
      </div>

      <div className="onboarding-art" key={index}>
        <div className="onboarding-blob" />
        <img src={slide.image} alt="" className="onboarding-img" />
      </div>

      <div className="onboarding-body">
        <div className="onboarding-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={i === index ? "active" : ""}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <h2 key={`t${index}`}>{slide.title}</h2>
        <p key={`p${index}`}>{slide.text}</p>
        <button
          className="btn btn-primary onboarding-next"
          onClick={() => (isLast ? onDone() : setIndex(index + 1))}
        >
          {isLast ? "Get started" : "Next"}
          <Icon name="arrow" size={18} />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
