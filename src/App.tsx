import React, { Suspense } from "react";

import { Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import Home from "./pages/Home";

//use lazy loading when component is required and create chunk. When you locate on page without this component - you don't need load it
const Basket = React.lazy(() => import("./pages/Basket"));

const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/basket"
            element={
              <Suspense fallback={<div>Loading ...</div>}>
                <Basket />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<div>Loading ...</div>}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
