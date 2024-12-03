import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type TbasketItem = {
  id: number;
  title: string;
  price: number;
  count: number;
  type: string;
  size: string;
};

interface IBasketSliceState {
  totalPrice: number;
  items: TbasketItem[];
}

const initialState: IBasketSliceState = {
  totalPrice: 0,
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TbasketItem>) {
      const findItem = state.items.find((obj) => obj.id == action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce(
        (sum, obj) => obj.price * obj.count + sum,
        0,
      );
    },
    minusItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id == action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

//selector to get info from this slice and use it in the different components
export const basketSelector = (state: RootState) => state.basketSlice;

export const { addItem, removeItem, clearItems, minusItem } =
  basketSlice.actions;

export default basketSlice.reducer;
