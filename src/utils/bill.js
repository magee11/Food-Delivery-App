import { promo_codes } from "../assets/dishes/offers";

export const DELIVERY_FEE = 2;
export const FREE_DELIVERY_OVER = 20;

const round = (n) => Math.round(n * 100) / 100;

// Single source for cart, checkout and order totals.
export const computeBill = (subtotal, promoCode) => {
  const rate = promo_codes[promoCode] || 0;
  const discount = round(subtotal * rate);
  const delivery = subtotal >= FREE_DELIVERY_OVER || subtotal === 0 ? 0 : DELIVERY_FEE;
  return { subtotal, rate, discount, delivery, total: round(subtotal - discount + delivery) };
};
