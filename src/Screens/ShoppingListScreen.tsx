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
  const foods: Food[] = useAppSelector((state: RootState) => state.food.items);
  const recipes: Recipe[] = useAppSelector((state: RootState) => state.recipe.items);
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    if (dates.length > 0) {
        console.log(selectedMenuItems)
        const newMenus = selectedMenuItems.map((i) => {const menu = new Menu(i.date, i.foods, i.recipes); menu.calculatRecipeNutritions(recipes, foods); return menu})

      setMenus(newMenus);
    }
  }, [dates]);

  return (
    <ScrollView style={styles.container}>
      <CalendarMultipleDays setDates={setDates} />
      {menus.length > 0 && menus.map((menu, index) => (
        <View key={index} style={styles.menuContainer}>
          <Text style={styles.menuDate}>{menu.date}</Text>
          <View>
            <Text>KJ: {menu.nutritions.kj}</Text>
            <Text>KCal: {menu.nutritions.kcal}</Text>
            <Text>Proteins: {menu.nutritions.protein}</Text>
            <Text>Carbs: {menu.nutritions.carbs}</Text>
            <Text>Fats: {menu.nutritions.fat}</Text>
          </View>
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
