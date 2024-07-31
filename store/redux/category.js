import { createSlice } from "@reduxjs/toolkit";
import categoryItems from "../context/category";
import { persistReducer } from "redux-persist";
import storage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "category",
  storage,
};

const categorySlice = createSlice({
  name: "category",
  initialState: {
    items: categoryItems,
  },
});

const persistedReducer = persistReducer(persistConfig, categorySlice.reducer);  
export default persistedReducer;
