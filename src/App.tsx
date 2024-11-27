import React from "react";

import { Routes, Route } from "react-router-dom";

import Header from "./Components/Header.tsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Basket from "./pages/Basket.jsx";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
