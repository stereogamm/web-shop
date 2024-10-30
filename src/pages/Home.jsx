import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setCurrentPage } from "../redux/slices/FilterSlice";

import "../scss/app.scss";
import Categories from "../Components/Categories";
import Card from "../Components/Card/Card";
import Sort from "../Components/Sort";
import SkeletonCard from "../Components/Card/SkeletonCard";
import Pagination from "../Components/Pagination/index";
import { searchContext } from "../App";

const Home = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.FilterSlice.categoryId);
  const sortType = useSelector((state) => state.FilterSlice.sort.sortProperty);
  const currentPage = useSelector((state) => state.FilterSlice.currentPage);

  //Use the useContext hook to track changes in the { searchValue } value, avoiding the need for props drilling
  const { searchValue } = useContext(searchContext);

  const [items, setItems] = useState([]); //use hook to render cards when it were got from server
  const [isLoading, setIsLoading] = useState(true); //use hook to render skeleton

  // const [currentPage, setCurrentPage] = useState(1);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  useEffect(() => {
    setIsLoading(true); //set status to render skeleton

    //variables to create different search params (filtering by back-end)
    const category = categoryId > 0 ? `category=${categoryId}&` : "";
    const sort = sortType.startsWith("-") ? "asc" : "desc";
    const replace = sortType.replace("-", "");
    const search = searchValue ? `&search=${searchValue}` : "";

    //request with filter queries
    axios
      .get(
        `https://6704f473031fd46a830e0b4e.mockapi.io/items?page=${currentPage}&limit=6&${category}sortBy=${replace}&order=${sort}${search}`,
      )
      .then((res) => {
        setItems(res.data); //set status to render content
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error is: ", error);
        setIsLoading(false);
      });

    window.scrollTo({ top: 0, behavior: "smooth" }); //to make scroll smoothely
  }, [categoryId, sortType, searchValue, currentPage]);

  const noodles = items.map((obj) => <Card key={uuidv4()} {...obj} />);

  const skeleton = [...new Array(6)].map((_, index) => (
    <SkeletonCard key={index} />
  ));

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={onClickCategory} />
          <Sort />
        </div>
        <h2 className="content__title" />
        <div className="content__items">{isLoading ? skeleton : noodles}</div>
        <Pagination currentPage={currentPage} changePage={onChangePage} />
      </div>
    </>
  );
};

export default Home;

Home.propTypes = {
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.func,
};
