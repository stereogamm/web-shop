import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import "../scss/app.scss";
import Categories from "../Components/Categories";
import Card from "../Components/Card/Card";
import Sort from "../Components/Sort";
import SkeletonCard from "../Components/Card/SkeletonCard";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://6704f473031fd46a830e0b4e.mockapi.io/items")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error is: ", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Ctrl + Slurp + Del</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <SkeletonCard key={index} />)
          : items.map((obj) => (
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
    </>
  );
};

export default Home;
