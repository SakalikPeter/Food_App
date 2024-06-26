import { createSlice, createSelector } from "@reduxjs/toolkit";
import recipeItems from "../context/recipe";

const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    items: recipeItems,
  },
  reducers: {
    addRecipe: (state, action) => {
      action.payload.key = state.items.reduce(
        (max, item) => (item.key > max ? item.key : max),
        -Infinity
      ) + 1;
      state.items.push(action.payload);
    },
    removeRecipe: (state, action) => {
      console.log("reducer:", action.payload);
      state.items = state.items.filter((item) => item.key !== action.payload);
    },
    updateRecipe: (state, action) => {
      const index = state.items.findIndex(item => item.key === action.payload.key);
      if (index !== -1) {
        console.log("index: ", index)
        state.items[index] = action.payload;
      }
    }
  },
});

export const selectRecipeByKey = (key) =>
  createSelector(
    (state) => state.food.items,
    (items) => items.some((item) => item.key === key)
  );

export const { addRecipe, removeRecipe, updateRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
