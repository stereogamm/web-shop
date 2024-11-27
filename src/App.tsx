import React from "react";

import { Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Basket from "./pages/Basket";

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
