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
import { SelectedItems } from "../Models/Menu";
import { RecipeNutritions } from "../Models/RecipeNutritions";

// Define the selector function
const itemSelector = (item) => ({
  key: item.key,
  value: item.value,
  unit: item.unit,
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

  // Update menu and nutritions whenever date changes
  useEffect(() => {
    setMenu(selectedMenu || new Menu(date));
    setNutritions(selectedMenu?.nutritions || new RecipeNutritions());
  }, [date, selectedMenu]);

  const updateMenuAndNutritions = (updatedMenu: Menu) => {
    updatedMenu.calculatRecipeNutritions(recipes, foods);
    setMenu(updatedMenu);
    setNutritions(updatedMenu.nutritions);
  };

  const handleRecipesChange = (key: string) => {
    let mFood = menu.recipes;
    let menuFoods = menu.recipes.map((f) => f.key);
    if (menuFoods.includes(Number(key))) {
      mFood = menu.recipes.filter((f) => f.key != Number(key));
    } else {
      let obj = new SelectedItems(Number(key), 0);
      mFood = [...mFood, obj];
    }
    const updatedMenu = new Menu(menu.date, menu.foods, mFood);
    updateMenuAndNutritions(updatedMenu);
  };

  const handleFoodsChange = (key: string) => {
    let mFood = menu.foods;
    let menuFoods = menu.foods.map((f) => f.key);
    if (menuFoods.includes(Number(key))) {
      mFood = menu.foods.filter((f) => f.key != Number(key));
    } else {
      let obj = new SelectedItems(Number(key), 0);
      mFood = [...mFood, obj];
    }
    const updatedMenu = new Menu(menu.date, mFood, menu.recipes);
    updateMenuAndNutritions(updatedMenu);
  };

  const handleFoodInput = (item: SelectedItems) => {
    const updatedFood = menu.foods.map((book) => {
      if (book.key === item.key) {
        return { ...book, quantity: item.quantity };
      }
      return book;
    });
    const updatedMenu = new Menu(menu.date, updatedFood, menu.recipes);
    updateMenuAndNutritions(updatedMenu);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Calendar date={date} setDate={setDate} />
        <View style={styles.selector}>
          {foods.length > 0 && (
            <Selector
              items={foods.map((f) => itemSelector(f))}
              checkedItems={menu.foods}
              setCheckedItems={handleFoodsChange}
              setInput={handleFoodInput}
              title="Potraviny"
            />
          )}
        </View>
        <View style={styles.selector}>
          {/* {recipes.length > 0 && (
            <Selector
              items={recipes.map((f) => itemSelector(f))}
              checkedItems={menu.recipes}
              setCheckedItems={handleRecipesChange}
              title="Recepty"
            />
          )} */}
        </View>
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 10,
  },
  selector: {
    marginBottom: 20,
  },
});
