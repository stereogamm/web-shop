import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
// import "./scss/app.scss";

import Header from "./Components/Header.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Basket from "./pages/Basket.jsx";

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home searchValue={searchValue} />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
