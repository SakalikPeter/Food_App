import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import Calendar from "../Components/Calendar/Calendar";
import { Food } from "../Models/Food";
import { Menu } from "../Models/Menu";
import { Recipe } from "../Models/Recipe";
import { useAppSelector } from "../../store/redux/hooks";
import { RootState } from "../../store/redux/store";
import Selector from "../Components/Selector/Selector";
import { selectMenuItemByDate } from "../../store/redux/menu";
import { useSelector } from "react-redux";
import { Button } from "react-native-elements";
import { SelectedItem } from "../Models/SelectedItem";
import { RecipeNutritions } from "../Models/RecipeNutritions";

// Define the selector function
const itemSelectorFood = (item) => ({
  key: item.key,
  value: item.value + " (" + item.category + ")",
  unit: item.unit,
});

const itemSelectorRecipe = (item) => ({
  key: item.key,
  value: item.value,
  unit: "porcie",
});

const HomeScreen: React.FC = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const recipes: Recipe[] = useAppSelector(
    (state: RootState) => state.recipe.items
  );
  const foods: Food[] = useAppSelector((state: RootState) => state.food.items);
  const selectedMenu = useSelector(
    selectMenuItemByDate(date)
  );

  const [menu, setMenu] = useState<Menu>(selectedMenu || new Menu(date));
  const [nutritions, setNutritions] = useState<RecipeNutritions>(menu.nutritions);

  // Update menu and nutritions whenever date or selectedMenu changes
  useEffect(() => {
    setMenu(selectedMenu || new Menu(date));
    setNutritions(selectedMenu?.nutritions || new RecipeNutritions());
  }, [date, selectedMenu]);

  // Function to update menu and nutritions
  const updateMenuAndNutritions = (updatedMenu: Menu) => {
    updatedMenu.calculateRecipeNutritions(recipes, foods);
    setMenu(updatedMenu);
    setNutritions(updatedMenu.nutritions);
  };

  // Handle changes in recipes
  const handleRecipesChange = (key: string) => {
    const updatedRecipes = toggleItemInArray(menu.recipes, key);
    const updatedMenu = new Menu(menu.date, menu.foods, updatedRecipes);
    updateMenuAndNutritions(updatedMenu);
  };

  // Handle changes in foods
  const handleFoodsChange = (key: string) => {
    const updatedFoods = toggleItemInArray(menu.foods, key);
    const updatedMenu = new Menu(menu.date, updatedFoods, menu.recipes);
    updateMenuAndNutritions(updatedMenu);
  };

  // Handle input changes in foods
  const handleFoodInput = (item: SelectedItem) => {
    const updatedFoods = updateItemQuantity(menu.foods, item);
    const updatedMenu = new Menu(menu.date, updatedFoods, menu.recipes);
    updateMenuAndNutritions(updatedMenu);
  };

  // Handle input changes in recipes
  const handleRecipeInput = (item: SelectedItem) => {
    const updatedRecipes = updateItemQuantity(menu.recipes, item);
    const updatedMenu = new Menu(menu.date, menu.foods, updatedRecipes);
    updateMenuAndNutritions(updatedMenu);
  };

  return (
    <View style={styles.container}>
      <Calendar date={date} setDate={setDate} />
      <View>
        {foods.length > 0 && (
          <Selector
            items={foods.map((f) => itemSelectorFood(f))}
            checkedItems={menu.foods}
            setCheckedItems={handleFoodsChange}
            setInput={handleFoodInput}
            title="Potraviny"
          />
        )}
      </View>
      <View>
        {recipes.length > 0 && (
          <Selector
            items={recipes.map((f) => itemSelectorRecipe(f))}
            checkedItems={menu.recipes}
            setCheckedItems={handleRecipesChange}
            setInput={handleRecipeInput}
            title="Recepty"
          />
        )}
      </View>
      <View>
        <Text>KJ: {nutritions.kj}</Text>
        <Text>KCal: {nutritions.kcal}</Text>
        <Text>Bielkoviny: {nutritions.protein}</Text>
        <Text>Sacharidy: {nutritions.carbs}</Text>
        <Text>Tuky: {nutritions.fat}</Text>
      </View>
      <ScrollView>
        <Button title={"Ulozit"} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    padding: 16,
  },
});

// Helper function to toggle an item in an array
const toggleItemInArray = (array, key) => {
  let updatedArray = array;
  const itemIndex = array.findIndex((item) => item.key === Number(key));
  if (itemIndex !== -1) {
    updatedArray = array.filter((item) => item.key !== Number(key));
  } else {
    updatedArray = [...array, new SelectedItem(Number(key), 0)];
  }
  return updatedArray;
};

// Helper function to update item quantity in an array
const updateItemQuantity = (array, item) => {
  return array.map((existingItem) => {
    if (existingItem.key === item.key) {
      return new SelectedItem(existingItem.key, item.quantity);
    }
    return existingItem;
  });
};
