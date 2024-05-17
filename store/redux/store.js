import { configureStore } from "@reduxjs/toolkit";
import foodReducer from "./food";
import recipeReducer from "./recipe";
import unitReducer from "./unit";
import categoryReducer from "./category";

export const store = configureStore({
  reducer: {
    food: foodReducer,
    recipe: recipeReducer,
    unit: unitReducer,
    category: categoryReducer,
  },
});
