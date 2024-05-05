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

export const selectFoodByKey = (key) =>
  createSelector(
    (state) => state.food.items,
    (items) => items.some((item) => item.key === key)
  );

export const { addFood, removeFood } = foodSlice.actions;
export default foodSlice.reducer;
