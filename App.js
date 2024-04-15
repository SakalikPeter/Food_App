import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/Screens/HomeScreen";
import FoodListScreen from "./src/Screens/FoodListScreen";
import FoodItemScreen from "./src/Screens/FoodItemScreen";
import RecipeListScreen from "./src/Screens/RecipeListScreen";
import RecipeItemScreen from "./src/Screens/RecipeItemScreen";

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Pridaj Recept">
        <Drawer.Screen name="Domov" component={HomeScreen} />
        <Drawer.Screen name="Recepty" component={RecipeListScreen} />
        <Drawer.Screen name="Potraviny" component={FoodListScreen} />
        <Drawer.Screen name="Pridaj Potravinu" component={FoodItemScreen} />
        <Drawer.Screen name="Pridaj Recept" component={RecipeItemScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
