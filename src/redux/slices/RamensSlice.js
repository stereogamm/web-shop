import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
};

export const getRamens = createAsyncThunk(
  "ramens/fetchRamens",
  async (params) => {
    const { category, sort, replace, search, currentPage } = params;
    const res = await axios.get(
      `https://6704f473031fd46a830e0b4e.mockapi.io/items?page=${currentPage}&limit=6&${category}sortBy=${replace}&order=${sort}${search}`
    );
    return res.data;
  }
);

export const ramensSlice = createSlice({
  name: "ramens",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRamens.pending, (state) => {
      state.items = [];
      state.loading = true;
    });
    builder.addCase(getRamens.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(getRamens.rejected, (state, action) => {
      console.error("Error fetching ramens:", action.error);
      state.loading = false;
    });
  },
});

export const { setItems } = ramensSlice.actions;

export default ramensSlice.reducer;
