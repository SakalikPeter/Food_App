import { createSlice } from "@reduxjs/toolkit";
import categoryItems from "../context/category";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    items: categoryItems,
  },
});

export default categorySlice.reducer;
