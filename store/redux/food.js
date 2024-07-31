import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "@react-native-async-storage/async-storage"; // Use AsyncStorage for React Native

// Sample food items for initial state
import foodItems from "../context/food"; // Make sure this import is correct

// Configuration for redux-persist
const persistConfig = {
  key: "food",
  storage,
};

// Create a slice using Redux Toolkit
const foodSlice = createSlice({
  name: "food",
  initialState: {
    items: foodItems,
  },
  reducers: {
    addFood: (state, action) => {
      action.payload.key = state.items.reduce(
        (max, item) => (item.key > max ? item.key : max),
        -Infinity
      ) + 1;
      state.items.push(action.payload);
    },
    removeFood: (state, action) => {
      state.items = state.items.filter((item) => item.key !== action.payload.key);
    },
    updateFood: (state, action) => {
      const index = state.items.findIndex(item => item.key === action.payload.key);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    }
  },
});

// Wrap the slice reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, foodSlice.reducer);

// Export actions and the persisted reducer
export const { addFood, removeFood, updateFood } = foodSlice.actions;
export default persistedReducer;
