import React from "react";
// import "./scss/app.scss";

import Header from "./Components/Header.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container" >
        <Home />
        </div>
      </div>
    </div>
  );
}

export default App;
