import React from "react";
import { View, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";
import MultiSelector from "../Components/MultiSelector";
import FoodCardList from "../Components/FoodCardList";
import { calculator } from "../Components/Calculator";
import NumberInput from "../Components/NumberInput";
import StringInput from "../Components/StringInput";

import { useSelector, useDispatch } from "react-redux";
import {
  addRecipe,
  removeRecipe,
  updateRecipe,
} from "../../store/redux/recipe";

function RecipeItemScreen({ route, navigation }) {
  // recipe item
  const item = {
    key: route.params.item.key,
    value: route.params.item.value,
    portions: route.params.item.portions,
    instructions: route.params.item.instructions,
    tags: route.params.item.tags,
  };
  // recipe valid
  const valid = {
    value: item.value ? true : false,
    portions: item.portions ? true : false,
    instructions: true,
    tags: true,
  };
  // recipe foods
  const [recipeFoods, setRecipeFoods] = React.useState(route.params.item.food);
  // all foods
  const foods = useSelector((state) => state.food.items);
  // all foods for selector
  const foods2 = foods.map((food) => {
    return { key: food.key, value: food.value + " (" + food.category + ")" };
  });
  // all tags
  const tags = useSelector((state) => state.tag.items);
  // nutrition
  const [nutrition, setNutrition] = React.useState({
    totalKcal: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
  });
  // maxkey value
  const maxKey = useSelector(
    (state) =>
      state.food.items.reduce(
        (max, item) => (item.key > max ? item.key : max),
        -Infinity
      ) + 1
  );
  // dispatch
  const dispatch = useDispatch();

  const setItem = (key, newValue) => {
    if (key === "food") {
      foodList = recipeFoods.map((f) => f.value);
      selFood = recipeFoods.filter((f) => newValue.includes(f.value));
      newfood = newValue.filter((f) => !foodList.includes(f));
      newfood = newfood.map((f) => {
        return { amount: 0, value: f, valid: true };
      });
      setRecipeFoods(selFood.concat(newfood));
    } else {
      item[key] = newValue;
    }
  };
  const setValid = (key, newValue) => {
    valid[key] = newValue;
  };

  const handleFoodsChange = (selectedFoods) => {
    // Remove foods from foods state that are not in selectedFoods
    const updatedFoods = foods.filter((food) =>
      selectedFoods.some((selectedFood) => selectedFood.key === food.key)
    );

    // Add new foods to foods state that are not already in foods
    selectedFoods.forEach((selectedFood) => {
      if (!foods.some((food) => food.key === selectedFood.key)) {
        updatedFoods.push(selectedFood);
      }
    });

    // Update the foods state
    setFoods(updatedFoods);
  };

  const handleSave = () => {
    const totalNutrition = calculator(recipeFoods, foods);
    setNutrition(totalNutrition);
    console.log("total: ", totalNutrition);

    item["food"] = recipeFoods

    if (Object.values(valid).every((value) => value === true)) {
      if (item.key >= 0) {
        dispatch(updateRecipe(item));
      } 
      else {
        setItem("key", maxKey);
        dispatch(addRecipe(item));
      }
      navigation.goBack();
    } else {
      Alert.alert('Alert Title', 'My Alert Msg', [
        {text: 'OK'},
      ]);      
    }
  };

  return (
      <ScrollView style={{ flex: 1 }}>
        <View>
          <StringInput
            label="Nazov"
            defaultValue={item.value}
            itemKey="value"
            setItem={setItem}
            setValid={setValid}
          />
          <NumberInput
            label="Porcie"
            defaultValue={item.portions}
            itemKey="portions"
            setItem={setItem}
            setValid={setValid}
          />
          <StringInput
            label="Instrukcie"
            defaultValue={item.instructions}
            itemKey="instructions"
            setItem={setItem}
            setValid={setValid}
          />
          <MultiSelector
            itemKey="food"
            items={foods2}
            defValue={recipeFoods.map((food) => food.value)}
            setItem={setItem}
            setValid={setValid}
            label="Potraviny"
            notFoundText="Ziadna potravina sa nenasla"
          />
          <MultiSelector
            itemKey="tag"
            items={tags}
            defValue={item.tags}
            setItem={setItem}
            setValid={setValid}
            label="Tagy"
            notFoundText="Ziadny tag sa nenasiel"
          />
        </View>
        <View>
          {recipeFoods.length > 0 && (
            <FoodCardList items={recipeFoods} setRecipeFood={setRecipeFoods} />
          )}
        </View>
        <View>
          <Text>KCAL: {nutrition.totalKcal}</Text>
          <Text>Bielkoviny: {nutrition.totalProtein}</Text>
          <Text>Sacharidy: {nutrition.totalCarbs}</Text>
          <Text>Tuky: {nutrition.totalFat}</Text>
        </View>
        <View>
          <Button title="Pridat" onPress={handleSave} />
        </View>
      </ScrollView>
  );
}

export default RecipeItemScreen;
