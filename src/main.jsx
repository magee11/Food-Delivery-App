import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <GoogleOAuthProvider clientId="426693182747-9ab7890rjl21lgsu93okv8s1271gmgon.apps.googleusercontent.com">
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </GoogleOAuthProvider>
  </BrowserRouter>
);
