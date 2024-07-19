import React, { useEffect, useState } from "react";
import { View, Text, Alert, Pressable } from "react-native";
import { Icon } from "react-native-elements";
import CalendarSingleDay from "../../Components/Calendar/Calendar.SingleDay/Calendar.SingleDay";
import { Food } from "../../Models/Food";
import { Menu } from "../../Models/Menu";
import { Recipe } from "../../Models/Recipe";
import { useAppSelector } from "../../../store/redux/hooks";
import { RootState } from "../../../store/redux/store";
import SelectorInput from "../../Components/Selector/Selector.Input/Selector.Input";
import { selectMenuItemByDate } from "../../../store/redux/menu";
import { useDispatch, useSelector } from "react-redux";
import { SelectedItem } from "../../Models/SelectedItem";
import { Nutritions } from "../../Models/Nutritions";
import { addMenu, removeMenu } from "../../../store/redux/menu";
import styles from "./HomeScreen.styles";
import calculateRecipesNutritions from "../../Services/calculator";
import {
  toggleItemInArray,
  updateItemQuantity,
  itemSelectorFood,
  itemSelectorRecipe,
} from "./HomeScreen.helpers";

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const recipes: Recipe[] = useAppSelector(
    (state: RootState) => state.recipe.items
  );
  const foods: Food[] = useAppSelector((state: RootState) => state.food.items);
  const selectedMenu: Menu =
    useSelector(selectMenuItemByDate(date)) || new Menu(date);
  const [menu, setMenu] = useState<Menu>(selectedMenu);
  const [nutritions, setNutritions] = useState<Nutritions>(new Nutritions());

  useEffect(() => {
    setNutritions(
      calculateRecipesNutritions(
        foods,
        selectedMenu.foods,
        recipes,
        selectedMenu.recipes
      )
    );
    setMenu(selectedMenu);
  }, [date]);

  const updateMenuAndNutritions = (updatedMenu: Menu) => {
    setMenu(updatedMenu);
    setNutritions(
      calculateRecipesNutritions(
        foods,
        updatedMenu.foods,
        recipes,
        updatedMenu.recipes
      )
    );
  };

  const handleRecipesChange = (key: string) => {
    const updatedRecipes = toggleItemInArray(menu.recipes, key);
    const updatedMenu = new Menu(menu.date, menu.foods, updatedRecipes);
    updateMenuAndNutritions(updatedMenu);
  };

  const handleFoodsChange = (key: string) => {
    const updatedFoods = toggleItemInArray(menu.foods, key);
    const updatedMenu = new Menu(menu.date, updatedFoods, menu.recipes);
    updateMenuAndNutritions(updatedMenu);
  };

  const handleFoodInput = (item: SelectedItem) => {
    const updatedFoods = updateItemQuantity(menu.foods, item);
    const updatedMenu = new Menu(menu.date, updatedFoods, menu.recipes);
    updateMenuAndNutritions(updatedMenu);
  };

  const handleRecipeInput = (item: SelectedItem) => {
    const updatedRecipes = updateItemQuantity(menu.recipes, item);
    const updatedMenu = new Menu(menu.date, menu.foods, updatedRecipes);
    updateMenuAndNutritions(updatedMenu);
  };

  const handleSave = () => {
    dispatch(removeMenu(menu.date));
    dispatch(addMenu(menu.toPlainObject()));
    Alert.alert("Recept bol pridany", "", [{ text: "OK" }]);
  };

  return (
    <View style={styles.container}>
      <View>
        <CalendarSingleDay date={date} setDate={setDate} />
        <View>
          {foods.length > 0 && (
            <SelectorInput
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
            <SelectorInput
              items={recipes.map((f) => itemSelectorRecipe(f))}
              checkedItems={menu.recipes}
              setCheckedItems={handleRecipesChange}
              setInput={handleRecipeInput}
              title="Recepty"
            />
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.textContainer}>
          <View style={styles.textColumn}>
            <Text style={styles.text}>KCal: {nutritions.kcal}</Text>
            <Text style={styles.text}>Bielkoviny: {nutritions.protein}</Text>
          </View>
          <View style={styles.textColumn}>
            <Text style={styles.text}>Tuky: {nutritions.fat}</Text>
            <Text style={styles.text}>Sacharidy: {nutritions.carbs}</Text>
          </View>
        </View>
        <Pressable style={styles.button} onPress={handleSave}>
          <Icon name="add" />
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;
