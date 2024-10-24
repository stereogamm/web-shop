import React, { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
// import "./scss/app.scss";

import Header from "./Components/Header.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Basket from "./pages/Basket.jsx";

//searchContext is an object containing values ({searchValue, setSearchValue}) that are accessible from different parts of the application
export const searchContext = createContext();

//Use searchContext.Provider value={{ searchValue, setSearchValue }} to transfer data (value) into an other app parts
function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      <searchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </searchContext.Provider>
    </div>
  );
}

export default App;
