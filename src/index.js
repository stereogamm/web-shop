import React from "react";
// Import ReactDOM to render React components in the DOM
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
//import provider from library r-r to combine Redux/React between each other
import { Provider } from "react-redux";

import "./scss/app";

// Import the main component of the application, App
import App from "./App.js";

//ctreate common redux store to manage app conditions
import { store } from "../src/redux/store.js";

// Create a root element for rendering in the DOM with id 'root'
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the code from App.js
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
);
