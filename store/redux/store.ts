// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Use AsyncStorage for React Native
import foodReducer from "./food";
import recipeReducer from "./recipe";
import unitReducer from "./unit";
import categoryReducer from "./category";
import tagReducer from "./tag";
import menuReducer from "./menu";

// Configuration for redux-persist
const foodPersistConfig = {
  key: "food",
  storage: AsyncStorage,
};
const menuPersistConfig = {
  key: "food",
  storage: AsyncStorage,
};
const recipePersistConfig = {
  key: "recipe",
  storage: AsyncStorage,
};
const categoryPersistConfig = {
  key: "category",
  storage: AsyncStorage,
}
const tagPersistConfig = {
  key: "tag",
  storage: AsyncStorage,
}
const unitPersistConfig = {
  key: "unit",
  storage: AsyncStorage,
}

// Wrap the foodReducer with persistReducer
const persistedFoodReducer = persistReducer(foodPersistConfig, foodReducer);
const persistedMenuReducer = persistReducer(menuPersistConfig, menuReducer);
const persistedRecipeReducer = persistReducer(
  recipePersistConfig,
  recipeReducer
)
const persistedCategoryReducer = persistReducer(
  categoryPersistConfig,
  categoryReducer
)
const persistedTagReducer = persistReducer(tagPersistConfig, tagReducer)
const persistedUnitReducer = persistReducer(unitPersistConfig, unitReducer)

// Configure the Redux store
const store = configureStore({
  reducer: {
    food: persistedFoodReducer, // Use the persisted reducer
    recipe: persistedRecipeReducer,
    unit: persistedUnitReducer,
    category: persistedCategoryReducer,
    tag: persistedTagReducer,
    menu: persistedMenuReducer,
  },
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };
