import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

import "../scss/app.scss";
import Categories from "../Components/Categories";
import Card from "../Components/Card/Card";
import Sort from "../Components/Sort";
import SkeletonCard from "../Components/Card/SkeletonCard";

const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]); //use hook to render cards when it were got from server
  const [isLoading, setIsLoading] = useState(true); //use hook to render skeleton

  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: " 🔺 🔻 ",
    sortProperty: "rating",
  });

  useEffect(() => {
    setIsLoading(true); //set status to render skeleton

    //variables to create different search params (filtering by back-end)
    const category = categoryId > 0 ? `category=${categoryId}&` : "";
    const sort = sortType.sortProperty.startsWith("-") ? "asc" : "desc";
    const replace = sortType.sortProperty.replace("-", "");
    const search = searchValue ? `&search=${searchValue}` : "";

    //request with filter queries
    fetch(
      `https://6704f473031fd46a830e0b4e.mockapi.io/items?${category}sortBy=${replace}&order=${sort}${search}`,
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setItems(data); //set status to render content
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error is: ", error);
        setIsLoading(false);
      });
    window.scrollTo({ top: 0, behavior: "smooth" }); //to make scroll smoothely
  }, [categoryId, sortType, searchValue]);

  const noodles = items.map((obj) => <Card key={uuidv4()} {...obj} />);

  const skeleton = [...new Array(6)].map((_, index) => (
    <SkeletonCard key={index} />
  ));

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
        <div className="content__items">{isLoading ? skeleton : noodles}</div>
      </div>
    </>
  );
};

export default Home;

Home.propTypes = {
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func,
};
