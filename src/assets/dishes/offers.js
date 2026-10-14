import paneer_butter_masala from "./paneer-butter-masala.jpg";
import chicken_rolls from "./chicken-rolls.jpg";
import veg_pulao from "./veg-pulao.jpg";
import red_velvet_cake from "./red-velvet-cake.jpg";

// `discount` marks a promo code the cart accepts; `dishId` makes the card open that dish.
export const offers = [
  {
    id: "welcome",
    eyebrow: "New here?",
    title: "20% off your first order",
    text: "Welcome to Biteway. Your first feast is on us (well, a fifth of it).",
    code: "WELCOME20",
    discount: 0.2,
    image: paneer_butter_masala,
    tone: "orange",
  },
  {
    id: "everyday",
    eyebrow: "Every day",
    title: "Flat 10% off everything",
    text: "No minimum order. Use it on any dish, any time.",
    code: "BITE10",
    discount: 0.1,
    image: chicken_rolls,
    tone: "green",
  },
  {
    id: "delivery",
    eyebrow: "Free delivery",
    title: "On orders over $20",
    text: "Fill your cart past $20 and we'll cover the delivery fee. No code needed.",
    image: veg_pulao,
    tone: "blue",
  },
  {
    id: "red-velvet",
    eyebrow: "Just landed",
    title: "Try the new Red Velvet",
    text: "Cocoa layers and cream cheese frosting. Tap to see what's inside.",
    dishId: "34",
    image: red_velvet_cake,
    tone: "berry",
  },
];

export const promo_codes = Object.fromEntries(
  offers.filter((o) => o.code).map((o) => [o.code, o.discount])
);
