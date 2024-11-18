import React, { useEffect, useContext, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
// import axios from "axios";
import qs from "qs"; // lib qs to create query string
import { useNavigate } from "react-router-dom"; //use this function to navigate inline with query params

import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/FilterSlice"; // Redux actions

import "../scss/app.scss";
import Categories from "../Components/Categories";
import Card from "../Components/Card/Card";
import Sort from "../Components/Sort";
import SkeletonCard from "../Components/Card/SkeletonCard";
import Pagination from "../Components/Pagination/index";
import { searchContext } from "../App"; // Context to manage search state globally
import { list } from "../Components/Sort";
import { getRamens } from "../redux/slices/RamensSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false); // Track if it's a search to prevent initial fetch
  const isMounted = useRef(false); // Track if it's the first render

  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const sortType = useSelector((state) => state.filterSlice.sort.sortProperty);
  const currentPage = useSelector((state) => state.filterSlice.currentPage);

  const { items, status } = useSelector((state) => state.ramensSlice);

  //Use the useContext hook to track changes in the { searchValue } value, avoiding the need for props drilling
  const { searchValue } = useContext(searchContext);

  // Dispatch action to set selected category
  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  // Dispatch action to set current page
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  // Fetch data from API with applied filters
  const fetchRamens = async () => {
    //variables to create different search params (filtering by back-end)
    const category = categoryId > 0 ? `category=${categoryId}&` : "";
    const sort = sortType.startsWith("-") ? "asc" : "desc";
    const replace = sortType.replace("-", "");
    const search = searchValue ? `&search=${searchValue}` : "";

    // request with filter queries
    dispatch(
      getRamens({
        category,
        sort,
        replace,
        search,
        currentPage,
      })
    );
  };

  //use this hook to create query string consists of parameters
  //If it’s not the first render, there’s no need to pass parameters into the URL string
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  //use this hook  if we have data into search params - we will parse it and rebuild it to an object
  //If it’s the first render, check the URL and save the parameters to Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortType);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = false;
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); //to make scroll smoothely

    if (!isSearch.current) {
      fetchRamens();
    }
    isSearch.current = false;
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
        {status === "error" ? (
          <div className="content__error">
            <h2>Error occurs</h2>
            <p>You can try to order ramen later</p>
          </div>
        ) : (
          <div className="content__items">
            {status === "loading" ? skeleton : noodles}
          </div>
        )}
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
