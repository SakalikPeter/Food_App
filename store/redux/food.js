import { createSlice } from "@reduxjs/toolkit";
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
    updateFood: (state, action) => {
      const index = state.items.findIndex(item => item.key === action.payload.key);
      if (index !== -1) {
        console.log("index: ", index)
        state.items[index] = action.payload;
      }
    }
  },
});

export const { addFood, removeFood, updateFood } = foodSlice.actions;
export default foodSlice.reducer;
