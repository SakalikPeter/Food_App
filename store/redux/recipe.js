import { createSlice, createSelector } from "@reduxjs/toolkit";
import recipeItems from "../context/recipe";

const recipeSlice = createSlice({
  name: "recipe",
  initialState: {
    items: recipeItems,
  },
  reducers: {
    addRecipe: (state, action) => {
      state.items.push(action.payload);
    },
    removeRecipe: (state, action) => {
      console.log("reducer:", action.payload);
      state.items = state.items.filter((item) => item.key !== action.payload);
    },
  },
});

export const selectRecipeByKey = (key) =>
  createSelector(
    (state) => state.food.items,
    (items) => items.some((item) => item.key === key)
  );

export const { addRecipe, removeRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
