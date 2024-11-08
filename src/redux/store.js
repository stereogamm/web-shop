import { configureStore } from "@reduxjs/toolkit";

import FilterSlice from "./slices/FilterSlice";
import BasketSlice from "./slices/BasketSlice";

export const store = configureStore({
  reducer: {
    FilterSlice,
    BasketSlice,
  },
});
