import React, { useEffect, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import qs from "qs"; // lib qs to create query string
import { useNavigate } from "react-router-dom"; //use this function to navigate inline with query params

import { useSelector } from "react-redux";
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
import { list } from "../Components/Sort";
import { getRamens } from "../redux/slices/RamensSlice";
import {
  selectFiltersCategory,
  selectFiltersSortProperty,
  selectFiltersCurrentPage,
  selectSearchValue,
} from "../redux/slices/FilterSlice";
import { RamenSliceSelector } from "../redux/slices/RamensSlice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false); // Track if it's a search to prevent initial fetch
  const isMounted = useRef(false); // Track if it's the first render

  const categoryId = useSelector(selectFiltersCategory);
  const sortType = useSelector(selectFiltersSortProperty);
  const currentPage = useSelector(selectFiltersCurrentPage);
  const searchValue = useSelector(selectSearchValue);

  const { items, status } = useSelector(RamenSliceSelector);

  // Dispatch action to set selected category
  const onClickCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  // Dispatch action to set current page
  const onChangePage = (number: number) => {
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
      }),
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

      dispatch(
        setFilters({
          ...params,
          sort: sort ? sort : list[0],
          searchValue:
            typeof params.searchValue === "string" ? params.searchValue : "",
          categoryId: Number(params.categoryId) || 0,
          currentPage: Number(params.currentPage) || 1,
        }),
      );
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
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const noodles = items.map((obj: any) => <Card key={uuidv4()} {...obj} />); //NEED TO FIX ANY

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
