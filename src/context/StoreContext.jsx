import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [profile, setProfile] = useState(null);

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };
  const cartCount = Object.values(cartItems).reduce((a, b) => a + b, 0);
  const removeFromcart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };
  const handleDarktheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  const handleProfile = (user)=>{
    setProfile(user)
  }
  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  useEffect(() => console.log(cartItems), [cartItems]);
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromcart,
    cartCount,
    getTotalAmount,
    handleDarktheme,
    isDarkTheme,
    setProfile,
    profile,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
