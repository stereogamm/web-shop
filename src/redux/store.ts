import { configureStore } from "@reduxjs/toolkit";

import filterSlice from "./slices/FilterSlice";
import basketSlice from "./slices/BasketSlice";
import ramensSlice from "./slices/RamensSlice";

export const store = configureStore({
  reducer: {
    filterSlice,
    basketSlice,
    ramensSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
