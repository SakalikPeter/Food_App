import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import foodReducer from './food';
import recipeReducer from './recipe';
import unitReducer from './unit';
import categoryReducer from './category';
import tagReducer from './tag';
import menuReducer from './menu';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const foodPersistConfig = {
  key: 'food',
  storage: AsyncStorage,
};

const menuPersistConfig = {
  key: 'menu',
  storage: AsyncStorage,
};

const recipePersistConfig = {
  key: 'recipe',
  storage: AsyncStorage,
};

const categoryPersistConfig = {
  key: 'category',
  storage: AsyncStorage,
};

const tagPersistConfig = {
  key: 'tag',
  storage: AsyncStorage,
};

const unitPersistConfig = {
  key: 'unit',
  storage: AsyncStorage,
};

const persistedFoodReducer = persistReducer(foodPersistConfig, foodReducer);
const persistedMenuReducer = persistReducer(menuPersistConfig, menuReducer);
const persistedRecipeReducer = persistReducer(recipePersistConfig, recipeReducer);
const persistedCategoryReducer = persistReducer(categoryPersistConfig, categoryReducer);
const persistedTagReducer = persistReducer(tagPersistConfig, tagReducer);
const persistedUnitReducer = persistReducer(unitPersistConfig, unitReducer);

const store = configureStore({
  reducer: {
    food: persistedFoodReducer,
    recipe: persistedRecipeReducer,
    unit: persistedUnitReducer,
    category: persistedCategoryReducer,
    tag: persistedTagReducer,
    menu: persistedMenuReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
