import { createSlice } from "@reduxjs/toolkit";
import unitItems from "../context/unit";
import { persistReducer } from "redux-persist";
import storage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "unit",
  storage,
};
const unitSlice = createSlice({
  name: "unit",
  initialState: {
    items: unitItems,
  },
});
const persistedReducer = persistReducer(persistConfig, unitSlice.reducer);  
export default persistedReducer;
