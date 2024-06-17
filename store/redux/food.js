import { createSlice } from "@reduxjs/toolkit";
import foodItems from "../context/food";

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

export const { addFood, removeFood, updateFood } = foodSlice.actions;
export default foodSlice.reducer;
