import React, { useContext, useEffect, useState } from "react";
import "./googlelogin.css";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";

const GoogleLoginComponent = ({ setShowLogin }) => {
  const { setProfile, profile } = useContext(StoreContext);
  const [user, setUser] = useState(null);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
          console.log(res.data);
          setShowLogin(false);
        })
        .catch((err) => console.log(err));
    }
    console.log(profile, "Profile");
    console.log(user, "user");
  }, [user]);

  console.log(profile, "Profile");
  console.log(user, "user");

  return (
    <div className="google-signin">
      <button onClick={login}>
        <img src={assets.google_icon} /> Sign in with Google
      </button>
    </div>
  );
};

export default GoogleLoginComponent;
