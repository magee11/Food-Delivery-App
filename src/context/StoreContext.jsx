import React, { createContext, useCallback, useEffect, useState } from "react";
import { computeBill } from "../utils/bill";
import { food_list } from "../assets/frontend_assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : {};
  });

  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedIsDarkTheme = localStorage.getItem("isDarkTheme");
    return savedIsDarkTheme === "true";
  });

  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("profile");
    return savedProfile ? JSON.parse(savedProfile) : null;
  });

  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);

  const [userProfile, setUserProfile] = useState(() => {
    const savedUserProfile = localStorage.getItem("userProfile");
    return savedUserProfile
      ? JSON.parse(savedUserProfile)
      : {
          firstName: "",
          secondName: "",
          email: "",
          phoneNumber: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          pincode: "",
          country: "",
          image: null,
          preview: "",
        };
  });

  useEffect(() => {
    if (profile) {
      setUserProfile({
        firstName: profile.given_name || "",
        secondName: profile.family_name || "",
        email: profile.email || "",
        phoneNumber: "",
        address1:
          getAddressPart(address, "house_number") +
          " " +
          getAddressPart(address, "neighbourhood"),
        address2: getAddressPart(address, "road"),
        city: getAddressPart(address, "city"),
        state: getAddressPart(address, "state"),
        pincode: getAddressPart(address, "postcode"),
        country: getAddressPart(address, "country"),
        image: null,
        preview: profile.picture || "",
      });
    }
  }, [profile, address]);

  const getAddressPart = (addressObj, part) => {
    return addressObj && addressObj.address && addressObj.address[part]
      ? addressObj.address[part]
      : "";
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("isDarkTheme", isDarkTheme);
    document.documentElement.dataset.theme = isDarkTheme ? "dark" : "light";
  }, [isDarkTheme]);

  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const cartCount = Object.values(cartItems).reduce((a, b) => a + b, 0);

  const updateProfile = (field, value) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  const setProfileImage = (file, preview) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      image: file,
      preview: preview,
    }));
  };

  const saveProfile = () => {
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: prev[itemId] - 1 };
      if (updatedCart[itemId] <= 0) {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });
  };
  

  const deleteFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      delete updatedCart[itemId];
      return updatedCart;
    });
  };

  const handleDarkTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchAddress(latitude, longitude);
        },
        (error) => {
          console.error(error.message);
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      setAddress(data);
    } catch (error) {
      console.error("Failed to fetch address details.", error);
      setError("Failed to fetch address details.");
    }
  };

  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetchAddress(location.latitude, location.longitude);
    }
  }, [location]);

  useEffect(() => {
    const savedUserProfile = localStorage.getItem("userProfile");
    if (savedUserProfile) {
      setUserProfile(JSON.parse(savedUserProfile));
    } else {
      setUserProfile({
        firstName: "",
        secondName: "",
        email: "",
        phoneNumber: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        image: null,
        preview: "",
      });
    }
  }, []);

  // Dish shown in the product modal (null when closed).
  const [selectedFood, setSelectedFood] = useState(null);
  const openFood = useCallback((id) => setSelectedFood(food_list.find((f) => f._id === id) || null), []);
  const closeFood = useCallback(() => setSelectedFood(null), []);

  const [appliedPromo, setAppliedPromo] = useState(() => localStorage.getItem("appliedPromo") || "");
  useEffect(() => {
    localStorage.setItem("appliedPromo", appliedPromo);
  }, [appliedPromo]);
  const getBill = () => computeBill(getTotalAmount(), appliedPromo);

  const [orders, setOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("orders")) || [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // Snapshot the cart into an order, then empty the cart. Returns the new order.
  const placeOrder = ({ address, payment }) => {
    const items = food_list
      .filter((f) => cartItems[f._id] > 0)
      .map(({ _id, name, price, image, veg }) => ({ _id, name, price, image, veg, qty: cartItems[_id] }));
    const order = {
      id: "BW" + Date.now().toString(36).toUpperCase().slice(-6),
      items,
      bill: getBill(),
      promo: appliedPromo,
      address,
      payment,
      createdAt: Date.now(),
      rating: null,
    };
    setOrders((prev) => [order, ...prev]);
    setCartItems({});
    setAppliedPromo("");
    return order;
  };

  const rateOrder = (orderId, rating) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, rating } : o)));
  };

  const [isSearch, setIsSearch] = useState(false);
  const [searchQuery,setSearchQuery]= useState("")

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    cartCount,
    getTotalAmount,
    handleDarkTheme,
    isDarkTheme,
    userProfile,
    updateProfile,
    setProfileImage,
    saveProfile,
    profile,
    setProfile,
    getLocation,
    setUserProfile,
    isSearch,
    searchQuery,
    setSearchQuery,
    setIsSearch,
    selectedFood,
    openFood,
    closeFood,
    appliedPromo,
    setAppliedPromo,
    getBill,
    orders,
    placeOrder,
    rateOrder,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
