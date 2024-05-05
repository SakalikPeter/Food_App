import { configureStore } from "@reduxjs/toolkit";
import foodReducer from "./food";
import recipeReducer from "./recipe";

export const store = configureStore({
  reducer: {
    food: foodReducer,
    recipe: recipeReducer,
  },
});
