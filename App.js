import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/Screens/HomeScreen/HomeScreen";
import FoodListScreen from "./src/Screens/FoodListScreen/FoodListScreen";
import FoodItemScreen from "./src/Screens/FoodItemScreen/FoodItemScreen";
import RecipeListScreen from "./src/Screens/RecipeListScreen/RecipeListScreen";
import RecipeItemScreen from "./src/Screens/RecipeitemScreen/RecipeItemScreen";
import ShoppingListScreen from "./src/Screens/ShoppingListScreen/ShoppingListScreen";
import { Provider } from "react-redux";
import { store } from "./store/redux/store";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Root() {
  return (
    <Drawer.Navigator initialRouteName="Jedalnicek"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerContentStyle: {
          backgroundColor: '#f4511e',
        },
        drawerLabelStyle: {
          color: '#fff',
        }
      }}
    >
      <Drawer.Screen name="Jedalnicek" component={HomeScreen} />
      <Drawer.Screen name="Nakupny Zoznam" component={ShoppingListScreen} />
      <Drawer.Screen name="Recepty" component={RecipeListScreen} />
      <Drawer.Screen name="Potraviny" component={FoodListScreen} />
    </Drawer.Navigator>
  );
}

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ cardStyle: { flex: 1 } }}>
          <Stack.Screen
            options={{ headerShown: false, presentation: "card" }}
            name="Root"
            component={Root}
          />
          <Stack.Screen name="Potravina" component={FoodItemScreen} />
          <Stack.Screen name="Recept" component={RecipeItemScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
