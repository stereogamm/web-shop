import Loadable from "react-loadable";
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import Home from "./pages/Home";

//use lazy loading when component is required and create chunk. When you locate on page without this component - you don't need load it
// const Basket = React.lazy(() => import("./pages/Basket"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

//use Loadable function from react-loadable lib if we use SSR
const Basket = Loadable({
  loader: () => import("./pages/Basket"),
  loading: () => <div>Loading ...</div>,
});

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basket" element={<Basket />} />
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
