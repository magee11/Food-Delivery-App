import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { useCallback, useEffect, useState } from "react";
import SignInPage from "./components/SignInPage/SignInPage";
import Profile from "./pages/Profile/Profile";
import Search from "./components/Search/Search";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import BottomNav from "./components/BottomNav/BottomNav";
import SplashScreen from "./components/Splash/SplashScreen";
import Onboarding from "./components/Splash/Onboarding";
import { hero_images } from "./assets/dishes";
import ProductModal from "./components/ProductModal/ProductModal";
import Checkout from "./pages/Checkout/Checkout";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import Rating from "./pages/Rating/Rating";

const readFlag = (storage, key) => {
  try {
    return storage.getItem(key) === "1";
  } catch {
    return false;
  }
};
const writeFlag = (storage, key) => {
  try {
    storage.setItem(key, "1");
  } catch {
    /* storage unavailable: the screen will show again next time */
  }
};

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const [showSplash, setShowSplash] = useState(() => !readFlag(sessionStorage, "biteway-splash"));
  const [showOnboarding, setShowOnboarding] = useState(() => !readFlag(localStorage, "biteway-onboarded"));

  const finishSplash = useCallback(() => {
    writeFlag(sessionStorage, "biteway-splash");
    setShowSplash(false);
  }, []);
  const finishOnboarding = () => {
    writeFlag(localStorage, "biteway-onboarded");
    setShowOnboarding(false);
  };

  const description =
    "Biteway delivers your favourite meals from the best kitchens near you, fresh and fast.";

  return (
    <>
      <Helmet>
        <title>Biteway – Food Delivery</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="biteway, food, delivery, order, meals, restaurant" />
        <meta property="og:title" content="Biteway – Food Delivery" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={hero_images[0]} />
        <meta property="og:url" content="https://imaginative-chimera-bd0733.netlify.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Biteway – Food Delivery" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={hero_images[0]} />
      </Helmet>

      {showSplash && <SplashScreen onDone={finishSplash} />}
      {!showSplash && showOnboarding && <Onboarding onDone={finishOnboarding} />}
      {showLogin && <SignInPage setShowLogin={setShowLogin} />}
      <ProductModal />

      <Navbar setShowLogin={setShowLogin} />
      <main className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/foods" element={<Home />} />
          <Route path="/category" element={<Home />} />
          <Route path="/mobile-app" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/order/:id" element={<OrderSuccess />} />
          <Route path="/order/:id/rate" element={<Rating />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
      <Footer />
      <BottomNav setShowLogin={setShowLogin} />
      <ToastContainer position="top-center" autoClose={2200} hideProgressBar theme="colored" />
    </>
  );
}

export default App;
