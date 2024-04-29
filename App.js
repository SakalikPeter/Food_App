import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/Screens/HomeScreen";
import FoodListScreen from "./src/Screens/FoodListScreen";
import FoodItemScreen from "./src/Screens/FoodItemScreen";
import RecipeListScreen from "./src/Screens/RecipeListScreen";
import RecipeItemScreen from "./src/Screens/RecipeItemScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Root() {
  return (
    <Drawer.Navigator initialRouteName="Domov">
      <Drawer.Screen name="Domov" component={HomeScreen} />
      <Drawer.Screen name="Recepty" component={RecipeListScreen} />
      <Drawer.Screen name="Potraviny" component={FoodListScreen} />
    </Drawer.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Root"
          component={Root}
        />
        <Stack.Screen
          // options={{
          //   title: "DetailPage",
          // }}
          name="Pridaj Potravinu"
          component={FoodItemScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
