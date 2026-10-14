# Biteway

A food delivery web app built with React + Vite.

- Animated splash screen and first-run onboarding
- 35 dishes across 8 categories with veg/non-veg markers, ratings and delivery times
- Category picker, filters (pure veg, new, top rated) and live search
- Offers section with tap-to-apply promo codes (`BITE10`, `WELCOME20`) and free delivery over $20
- Dish detail modal with taste and ingredient pills (bottom sheet on mobile)
- Demo checkout: address, then card / UPI / cash on delivery, then simulated payment
- Animated order-placed screen, thank-you page with live (simulated) tracking, and a rating flow
- Light and dark themes, plus a mobile layout with a bottom tab bar
- Google sign-in and profile with location auto-fill

## Run

```bash
npm install
npm run dev
```

Dish photos live in `src/assets/dishes/` and the catalogue is defined in `src/assets/dishes/index.js`.
