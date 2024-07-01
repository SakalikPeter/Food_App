import { createSlice, createSelector } from "@reduxjs/toolkit";
import menuItems from "../context/menu";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    items: menuItems,
  },
  reducers: {},
});

const selectMenuItems = (state) => state.menu.items;

const selectMenuItemByDate = (date) => 
  createSelector(
    [selectMenuItems],
    (items) => items.filter(item => item.date === date)[0]
  );

export { selectMenuItemByDate };
export default menuSlice.reducer;
