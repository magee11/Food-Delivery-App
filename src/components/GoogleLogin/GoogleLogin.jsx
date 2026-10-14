import React, { useContext, useEffect, useState } from "react";
import "./googlelogin.css";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";

const GoogleLoginComponent = ({ setShowLogin }) => {
  const { setProfile } = useContext(StoreContext);
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
          setShowLogin(false);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div className="google-signin">
      <button type="button" onClick={() => login()}>
        <img src={assets.google_icon} alt="" /> Continue with Google
      </button>
    </div>
  );
};

export default GoogleLoginComponent;
