import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ListItem } from "../../Components/Sort";

export interface ISort {
  name: string;
  sortProperty: string;
}

export interface IFilterState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: ListItem;
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
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<ISort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<IFilterState>) {
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
