import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./scss/app.scss";
import Header from "./Components/Header.jsx";
import Categories from "./Components/Categories.jsx";
import Card from "./Components/Card/Card.jsx";
import Sort from "./Components/Sort.jsx";
// import SkeletonCard from "./Components/Card/SkeletonCard.jsx";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://6704f473031fd46a830e0b4e.mockapi.io/items")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error is: ", error));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Ctrl + Slurp + Del</h2>
          <div className="content__items">
            {items.map((obj) => (
              <Card
                key={uuidv4()}
                price={obj.price}
                title={obj.title}
                image={obj.image}
                sizes={obj.sizes}
                types={obj.types}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
