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
  selectRecipeByKey,
} from "../../store/redux/recipe";

function RecipeItemScreen({ route, navigation }) {
  const key = route.params.item.key || 100;
  const [value, setValue] = React.useState(route.params.item.value);
  const [portions, setPortions] = React.useState(route.params.item.portions);
  const [instructions, setInstructions] = React.useState(
    route.params.item.instructions
  );
  const [tags, setTags] = React.useState(route.params.item.tags);
  const [foods, setFoods] = React.useState(route.params.item.food);
  const [nutrition, setNutrition] = React.useState({});
  const [isValid, setIsValid] = React.useState(true);
  const itemExists = useSelector(selectRecipeByKey(key));
  const foodList = useSelector((state) => state.food.items);
  const dispatch = useDispatch();

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

  const updateFood = (updatedFood) => {
    const updatedFoods = foods.map((food) =>
      food.key === updatedFood.key ? updatedFood : food
    );
    setFoods(updatedFoods);
  };

  const handleSave = async () => {
    const recipe = {
      key: key,
      value: value,
      portions: portions,
      instructions: instructions,
      tags: tags,
      food: foods.map((item) => ({
        key: item.key,
        amount: parseFloat(item.inputValue),
      })),
    };
    console.log("recipe: ", recipe);
    const totalNutrition = await calculator(recipe.food, foodList);
    setNutrition(totalNutrition);
    console.log("total: ", totalNutrition);

    // if (itemExists) {
    //   dispatch(removeRecipe(recipe.key));
    //   dispatch(addRecipe(recipe));
    //   // TODO: update alert
    // } else {
    //   // TODO: add key
    //   dispatch(addRecipe(recipe));
    //   // TODO: add alert
    // }

    // navigation.goBack();
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ScrollView style={{ flex: 1 }}>
        <View>
          <StringInput
            placeholder="Nazov"
            defaultValue={value}
            setValue={setValue}
            isValid={setIsValid}
          />
          <NumberInput
            placeholder="Pocet Porcii"
            defaultValue={portions}
            setValue={setPortions}
            isValid={setIsValid}
          />
          <StringInput
            placeholder="Instrukcie"
            defaultValue={instructions}
            setValue={setInstructions}
            isValid={setIsValid}
          />
          {/* <MultiSelector
            value="tag"
            setter={setTags}
            label="Tagy"
            notFoundText="Ziadny tag sa nenasiel"
          /> */}
          <MultiSelector
            value="food"
            items={foodList}
            setter={handleFoodsChange}
            label="Potraviny"
            notFoundText="Ziadna potravina sa nenasla"
          />
        </View>
        <View>
          {foods.length > 0 && (
            <FoodCardList items={foods} updateItem={updateFood} />
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
    </View>
  );
}

export default RecipeItemScreen;
