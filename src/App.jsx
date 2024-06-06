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
        <Routes>
          <Route path="/" element={<Home />} />
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
