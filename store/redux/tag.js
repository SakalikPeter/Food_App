import { createSlice } from "@reduxjs/toolkit";
import tagItems from "../context/tag";
import { persistReducer } from "redux-persist";
import storage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "tag",
  storage,
};

const tagSlice = createSlice({
  name: "tag",
  initialState: {
    items: tagItems,
  },
});
const persistedReducer = persistReducer(persistConfig, tagSlice.reducer);  
export default persistedReducer;
