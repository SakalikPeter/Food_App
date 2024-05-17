import { createSlice, createSelector } from "@reduxjs/toolkit";
import foodItems from "../context/food";

const foodSlice = createSlice({
  name: "food",
  initialState: {
    items: foodItems,
  },
  reducers: {
    addFood: (state, action) => {
      state.items.push(action.payload);
    },
    removeFood: (state, action) => {
      state.items = state.items.filter((item) => item.key !== action.payload);
    },
  },
});

export const selectMaxKey = createSelector(
  (state) => state.food.items, // Access items directly from the state
  (items) => {
    if (!items || items.length === 0) {
      return 1; // Return 1 if items is empty or undefined
    }
    const maxKey =
      items.reduce(
        (max, item) => (item.key > max ? item.key : max),
        -Infinity
      ) + 1;
    return maxKey;
  }
);

export const { addFood, removeFood } = foodSlice.actions;
export default foodSlice.reducer;
