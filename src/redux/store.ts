import { configureStore } from "@reduxjs/toolkit";

import filterSlice from "./slices/FilterSlice";
import basketSlice from "./slices/BasketSlice";
import ramensSlice from "./slices/RamensSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filterSlice,
    basketSlice,
    ramensSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
