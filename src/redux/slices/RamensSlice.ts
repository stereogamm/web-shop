import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type RamenItem = {
  id: string;
  title: string;
  price: number;
  count: number;
  type: number;
  size: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
interface IRamensSliceState {
  items: RamenItem[];
  status: Status;
}

interface FetchRamensParams {
  category: string;
  sort: string;
  replace: string;
  search: string;
  currentPage: number;
}

// make initial state for ramen data
const initialState: IRamensSliceState = {
  items: [], // Array to store the list of ramen items
  status: Status.LOADING, //Current loading status: loading | success | error
};

// asynchronous action to fetch the list of ramen
export const getRamens = createAsyncThunk(
  "ramens/fetchRamens", // Name of the async action
  async (params: FetchRamensParams) => {
    // destructuring the parameters
    const { category, sort, replace, search, currentPage } = params;

    // sending a GET request to mockAPI to fetch the data
    const res = await axios.get<RamenItem[]>(
      `https://6704f473031fd46a830e0b4e.mockapi.io/items?page=${currentPage}&limit=6&${category}sortBy=${replace}&order=${sort}${search}`,
    );
    return res.data as RamenItem[];
  },
);

export const ramensSlice = createSlice({
  name: "ramens",
  initialState, // setting the initial state
  reducers: {
    // reducer to manually set the items
    setItems(state, action) {
      state.items = action.payload; // updating the items array
    },
  },
  extraReducers: (builder) => {
    // handling additional states for the async action
    builder.addCase(getRamens.pending, (state) => {
      state.items = [];
      state.status = Status.LOADING;
    });
    builder.addCase(getRamens.fulfilled, (state, action) => {
      // action for when the fetch request is successful
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(getRamens.rejected, (state, action) => {
      // action for when the fetch request is failed
      console.error("Error fetching ramens:", action.error);
      state.items = [];
      state.status = Status.ERROR;
    });
  },
});

//get info from this slice and use it in other slices
export const RamenSliceSelector = (state: RootState) => state.ramensSlice;

// exporting the action for manually updating items
export const { setItems } = ramensSlice.actions;

// exporting the reducer to be added to the store
export default ramensSlice.reducer;
