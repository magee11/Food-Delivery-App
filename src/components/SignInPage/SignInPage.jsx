import React, { useContext, useEffect, useState } from "react";
import "./signinpage.css";
import { StoreContext } from "../../context/StoreContext";
import GoogleLoginComponent from "../GoogleLogin/GoogleLogin";

const SignInPage = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const { isDarkTheme } = useContext(StoreContext);
  const darkTheme = {
    color: "white",
    background: "rgb(52 51 51)",
  };
  const lightTheme = {
    backgroundColor: "#fff",
    color: "black",
  };
  return (
    <div className="login-popup">
      <form
        className="login-popup-container"
        style={isDarkTheme ? darkTheme : lightTheme}
      >
        <div
          className="login-popup-title"
          style={{ color: isDarkTheme ? "white" : "black" }}
        >
          <h1 style={{ color: isDarkTheme ? "white" : "black" }}>
            {currState}
          </h1>
          <p onClick={() => setShowLogin(false)}>X</p>
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input type="text" placeholder="Your name" required />
          )}
          <input type="email" placeholder="Your email" required />
          <input type="password" placeholder="Password" required />
        </div>
        <button className="loginButton">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy </p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account ?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account ?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
        <GoogleLoginComponent setShowLogin={setShowLogin}/>
      </form>
    </div>
  );
};

export default SignInPage;
