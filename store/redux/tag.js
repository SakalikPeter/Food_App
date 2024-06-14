import { createSlice } from "@reduxjs/toolkit";
import tagItems from "../context/tag";

const tagSlice = createSlice({
  name: "tag",
  initialState: {
    items: tagItems,
  },
});

export default tagSlice.reducer;
