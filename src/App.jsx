import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { useContext, useState } from "react";
import SignInPage from "./components/SignInPage/SignInPage";
import { StoreContext } from "./context/StoreContext";
import Profile from "./pages/Profile/Profile";
import Search from "./components/Search/Search";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from 'react-helmet';
import { assets } from "./assets/frontend_assets/assets";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const { isDarkTheme } = useContext(StoreContext);
  const darkTheme = {
    backgroundColor: "#101011",
    color: "#fff",
    transition: ".8s",
  };
  const lightTheme = {
    backgroundColor: "#fff",
    color: "#000",
    transition: ".8s",
  };
  return (
    <>
      {showLogin ? <SignInPage setShowLogin={setShowLogin} /> : <></>}
      <div className="app" style={isDarkTheme ? darkTheme : lightTheme}>
        <Navbar setShowLogin={setShowLogin} />
        <Helmet>
        <title>Food Delivery App</title>
        <meta name="description" content="Order your favorite meals from our wide selection of delicious food options." />
        <meta name="keywords" content="food, delivery, order, meals, restaurant" />
        <meta property="og:title" content="Food Delivery App" />
        <meta property="og:description" content="Order your favorite meals from our wide selection of delicious food options." />
        <meta property="og:image" content={assets.header_img} />
        <meta property="og:url" content="https://imaginative-chimera-bd0733.netlify.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Food Delivery App" />
        <meta name="twitter:description" content="Order your favorite meals from our wide selection of delicious food options." />
        <meta name="twitter:image" content={assets.header_img} />
      </Helmet>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/foods" element={<Home />} />
          <Route path="/category" element={<Home />} />
          <Route path="/mobile-app" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
