import React, { useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { CheckBox } from "react-native-elements";
import CalendarMultipleDays from "../../Components/Calendar/Calendar.MultipleDays/Calendar.MultipleDays";
import { useAppSelector } from "../../../store/redux/hooks";
import { RootState } from "../../../store/redux/store";
import { selectMenuItemByDates } from "../../../store/redux/menu";
import { Food } from "../../Models/Food";
import { Menu } from "../../Models/Menu";
import { Recipe } from "../../Models/Recipe";
import styles from "./ShoppingListScreen.styles";

const ShoppingListScreen: React.FC = () => {
  const [dates, setDates] = useState<string[]>([]);
  const selectedMenuItems = useAppSelector(selectMenuItemByDates(dates));
  const [foodQuantities, setFoodQuantities] = useState([]);
  const [checkedCount, setCheckedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0)
  const foods: Food[] = useAppSelector((state: RootState) => state.food.items);
  const recipes: Recipe[] = useAppSelector((state: RootState) => state.recipe.items);

  useEffect(() => {
    if (dates.length > 0) {

      const newMenus = selectedMenuItems.map((i) => {
        const menu = new Menu(i.date, i.foods, i.recipes);
        return menu;
      });

      const allFoodQuantities = newMenus.flatMap((menu) => menu.getFoodsQuantity(foods, recipes));
      
      const combinedFoodQuantities = combineFoodQuantities(allFoodQuantities).map(item => ({
        ...item,
        checked: false,  // Default checked property
      }));

      setFoodQuantities(combinedFoodQuantities);
      setCheckedCount(0)
      setTotalCount(combinedFoodQuantities.length)
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

  const handleCheckBoxChange = (index) => {
    const newFoodQuantities = [...foodQuantities];
    newFoodQuantities[index].checked = !newFoodQuantities[index].checked;
    setFoodQuantities(newFoodQuantities);
    setCheckedCount(newFoodQuantities.filter(item => item.checked).length);
  };

  return (
    <ScrollView style={styles.container}>
      <CalendarMultipleDays setDates={setDates} />
      <Text style={styles.checkedCount}>Checked Items: {checkedCount} / {totalCount}</Text>
      {foodQuantities.length > 0 && foodQuantities.map((food, index) => (
        <View key={index} style={food.checked? styles.menuContainerChecked : styles.menuContainer}>
          <CheckBox
            containerStyle={styles.checkBox}
            checked={food.checked}
            onPress={() => handleCheckBoxChange(index)}
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checkedColor="#009688"
          />
          <View style={styles.foodDetails}>
            <Text style={styles.foodName}>{food.foodItem.value}</Text>
            <Text style={styles.foodCategory}>{food.foodItem.category}</Text>
            <Text style={styles.foodQuantity}>{food.quantity} {food.foodItem.unit}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default ShoppingListScreen;
