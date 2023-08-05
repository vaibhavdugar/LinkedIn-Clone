import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

// index.js is the entry point of the react application. It is the first file that gets executed when the application starts. It is used to render the App component in the root element of the DOM

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Passing store as prop */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
