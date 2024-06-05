import React, { createContext, useEffect, useState } from "react";
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

  const handleDarkTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

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

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
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
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
