// Demo tracking: status advances with time since the order was placed.
export const ORDER_STEPS = [
  { id: "confirmed", label: "Order confirmed", detail: "The restaurant has your order", at: 0 },
  { id: "preparing", label: "Preparing", detail: "Your food is being cooked fresh", at: 8 },
  { id: "on_the_way", label: "On the way", detail: "Your rider is heading to you", at: 20 },
  { id: "delivered", label: "Delivered", detail: "Enjoy your meal!", at: 35 },
];

export const getOrderStepIndex = (order, now = Date.now()) => {
  const elapsed = (now - order.createdAt) / 1000;
  let index = 0;
  ORDER_STEPS.forEach((step, i) => {
    if (elapsed >= step.at) index = i;
  });
  return index;
};

export const isDelivered = (order, now) => getOrderStepIndex(order, now) === ORDER_STEPS.length - 1;
