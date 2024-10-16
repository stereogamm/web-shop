import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import "../scss/app.scss";
import Categories from "../Components/Categories";
import Card from "../Components/Card/Card";
import Sort from "../Components/Sort";
import SkeletonCard from "../Components/Card/SkeletonCard";

const Home = () => {
  const [items, setItems] = useState([]); //use hook to render cards
  const [isLoading, setIsLoading] = useState(true); //use hook to render skeleton

  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: " 🔺 🔻 ",
    sortProperty: "rating",
  });

  useEffect(() => {
    setIsLoading(true); //set status to render skeleton

    const category = categoryId > 0 ? `category=${categoryId}&` : "";
    const sort = sortType.sortProperty.startsWith("-") ? "asc" : "desc";
    const replace = sortType.sortProperty.replace("-", "");

    //request with filter queries
    fetch(
      `https://6704f473031fd46a830e0b4e.mockapi.io/items?${category}sortBy=${replace}&order=${sort}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setItems(data); //set status to render content
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error is: ", error);
        setIsLoading(false);
      });
    window.scrollTo({ top: 0, behavior: "smooth" }); //to make scroll smoothely
  }, [categoryId, sortType]);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            value={categoryId}
            onClickCategory={(i) => setCategoryId(i)}
          />
          <Sort value={sortType} onClickSort={(i) => setSortType(i)} />
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
      </div>
    </>
  );
};

export default Home;
