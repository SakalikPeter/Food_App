import { createSlice, createSelector } from "@reduxjs/toolkit";
import menuItems from "../context/menu";
import { persistReducer } from "redux-persist";
import storage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "menu",
  storage,
};

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    items: menuItems,
  },
  reducers: {
    addMenu: (state, action) => {
      state.items.push(action.payload);
    },
    removeMenu: (state, action) => {
      state.items = state.items.filter((item) => item.date !== action.payload);
    },
    removeRecipeFromMenu: (state, action) => {
      state.items = state.items.map(menu => ({
        ...menu,
        recipes: menu.recipes.filter(recipe => recipe.key !== action.payload)
      }));
    },
    removeFoodFromMenu: (state, action) => {
      state.items = state.items.map(menu => ({
        ...menu,
        foods: menu.foods.filter(food => food.key !== action.payload)
      }));
    }
  },
});

const selectMenuItems = (state) => state.menu.items;

const selectMenuItemByDate = (date) => 
  createSelector(
    [selectMenuItems],
    (items) => items.filter(item => item.date === date)[0]
  );

const selectMenuItemByDates = (dates) => 
  createSelector(
    [selectMenuItems],
    (items) => items.filter(item => dates.includes(item.date))
  );


const persistedReducer = persistReducer(persistConfig, menuSlice.reducer);  
export { selectMenuItemByDate, selectMenuItemByDates };
export const { addMenu, removeMenu, removeRecipeFromMenu, removeFoodFromMenu } = menuSlice.actions;
export default persistedReducer;
