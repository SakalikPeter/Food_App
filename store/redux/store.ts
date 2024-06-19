// store.ts
import { configureStore } from "@reduxjs/toolkit";
import foodReducer from "./food";
import recipeReducer from "./recipe";
import unitReducer from "./unit";
import categoryReducer from "./category";
import tagReducer from "./tag";

const store = configureStore({
  reducer: {
    food: foodReducer,
    recipe: recipeReducer,
    unit: unitReducer,
    category: categoryReducer,
    tag: tagReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store, RootState, AppDispatch };
