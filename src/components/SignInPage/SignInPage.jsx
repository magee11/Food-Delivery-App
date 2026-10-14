import React, { useContext, useState } from "react";
import "./signinpage.css";
import { StoreContext } from "../../context/StoreContext";
import GoogleLoginComponent from "../GoogleLogin/GoogleLogin";
import axios from "axios";
import { toast } from "react-toastify";
import Logo from "../Logo/Logo";
import Icon from "../Icon/Icon";

const SignInPage = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const { setProfile } = useContext(StoreContext);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currState === "Sign Up") {
        const response = await axios.post(
          "http://localhost:8080/api/user/register",
          userData
        );
        if (response.status === 200) {
          localStorage.setItem("Access-Token", response.data.token);
          toast.success("Account created successfully!");
        }
        setShowLogin(false);
      } else {
        const response = await axios.post(
          "http://localhost:8080/api/user/login",
          userData
        );
        if (response.status === 200) {
          localStorage.setItem("Access-Token", response.data.token);
          setProfile(response.data.user);
          toast.success("Logged in successfully!");
        }
        setShowLogin(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-popup" onClick={() => setShowLogin(false)}>
      <form
        className="login-popup-container"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="login-popup-title">
          <Logo size={30} />
          <button type="button" className="icon-btn" onClick={() => setShowLogin(false)} aria-label="Close">
            <Icon name="close" />
          </button>
        </div>
        <div className="login-popup-heading">
          <h2>{currState === "Login" ? "Welcome back" : "Create your account"}</h2>
          <p>{currState === "Login" ? "Log in to track orders and save favourites." : "Join Biteway and get 20% off your first order."}</p>
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <>
              <input
                name="name"
                onChange={onChangeHandler}
                value={userData.name}
                type="text"
                placeholder="Your name"
                required
              />
              <input
                name="phone"
                onChange={onChangeHandler}
                value={userData.phone}
                type="text"
                placeholder="Your Phone Number"
                required
              />
            </>
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={userData.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={userData.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button className="btn btn-primary loginButton">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
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
        <div className="login-divider"><span>or</span></div>
        <GoogleLoginComponent setShowLogin={setShowLogin} />
      </form>
    </div>
  );
};

export default SignInPage;
