import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import CalendarMultipleDays from "../Components/CalendarMultipleDays/CalendarMultipleDays";
import { useAppSelector } from "../../store/redux/hooks";
import { RootState } from "../../store/redux/store";
import { selectMenuItemByDates } from "../../store/redux/menu";
import { Food } from "../Models/Food";
import { Menu } from "../Models/Menu";
import { Recipe } from "../Models/Recipe";

const ShoppingListScreen: React.FC = () => {
  const [dates, setDates] = useState<string[]>([]);
  const selectedMenuItems = useAppSelector(selectMenuItemByDates(dates));
  const [foodQuantities, setFoodQuantities] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const foods: Food[] = useAppSelector((state: RootState) => state.food.items);
  const recipes: Recipe[] = useAppSelector((state: RootState) => state.recipe.items);
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    if (dates.length > 0) {
      console.log(selectedMenuItems);

      const newMenus = selectedMenuItems.map((i) => {
        const menu = new Menu(i.date, i.foods, i.recipes);
        menu.calculateRecipeNutritions(recipes, foods);
        return menu;
      });

      const allFoodQuantities = newMenus.flatMap((menu) => menu.getFoodsQuantity(foods, recipes));
      const combinedFoodQuantities = combineFoodQuantities(allFoodQuantities);
      console.log(combinedFoodQuantities)

      setFoodQuantities(combinedFoodQuantities);
      setSelectedFoods(combinedFoodQuantities.map(item => item.foodItem));
      setMenus(newMenus);
    }
  }, [dates]);

  const combineFoodQuantities = (foodQuantities) => {
    const foodMap = new Map();

    foodQuantities.forEach((item) => {
      if (foodMap.has(item.key)) {
        foodMap.get(item.key).quantity += item.quantity;
      } else {
        foodMap.set(item.key, item);
      }
    });

    return Array.from(foodMap.values());
  };

  return (
    <ScrollView style={styles.container}>
      <CalendarMultipleDays setDates={setDates} />
      {foodQuantities.length > 0 && foodQuantities.map((food, index) => (
        <View key={index} style={styles.menuContainer}>
          <Text style={styles.menuDate}>{food.foodItem.value} {food.foodItem.category} {food.quantity} {food.foodItem.unit}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  menuContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    elevation: 2,
  },
  menuDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default ShoppingListScreen;
