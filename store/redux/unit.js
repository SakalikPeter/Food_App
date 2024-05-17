import { createSlice } from "@reduxjs/toolkit";
import unitItems from "../context/unit";

const unitSlice = createSlice({
  name: "unit",
  initialState: {
    items: unitItems,
  },
});

export default unitSlice.reducer;
