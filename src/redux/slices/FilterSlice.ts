import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ISort {
  name: string;
  sortProperty: string;
}

interface IFilterState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: ISort;
}

const initialState: IFilterState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: " 🔺 🔻 ",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    //actions includes all theese methods
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

//selectors to use it into the different components
export const selectFiltersCategory = (state: RootState) =>
  state.filterSlice.categoryId;
export const selectFiltersSortProperty = (state: RootState) =>
  state.filterSlice.sort.sortProperty;
export const selectFiltersCurrentPage = (state: RootState) =>
  state.filterSlice.currentPage;
export const selectSort = (state: RootState) => state.filterSlice.sort;
export const selectSearchValue = (state: RootState) =>
  state.filterSlice.searchValue;

// Action creators are generated for each case reducer function
// By default reducer will be exported, but if we need - we can use any actions as we want
export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
