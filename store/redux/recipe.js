import { createSlice, createSelector } from "@reduxjs/toolkit";
import recipeItems from "../context/recipe";
import { persistReducer } from "redux-persist";
import storage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "recipe",
  storage,
};

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
      state.items = state.items.filter((item) => item.key !== action.payload);
    },
    updateRecipe: (state, action) => {
      const index = state.items.findIndex(item => item.key === action.payload.key);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeFoodFromRecipe: (state, action) => {
      state.items = state.items.map(recipe => ({
        ...recipe,
        foods: recipe.foods.filter(food => food.key !== action.payload)
      }));
    }
  },
});

export const selectRecipeByKey = (key) =>
  createSelector(
    (state) => state.food.items,
    (items) => items.some((item) => item.key === key)
  );

const persistedReducer = persistReducer(persistConfig, recipeSlice.reducer);    
export const { addRecipe, removeRecipe, updateRecipe, removeFoodFromRecipe } = recipeSlice.actions;
export default persistedReducer;
