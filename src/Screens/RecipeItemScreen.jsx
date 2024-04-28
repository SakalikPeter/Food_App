import React from "react";
import { View, ScrollView } from "react-native";
import { Button, Input } from "react-native-elements";
import MultiSelector from "../Components/MultiSelector";
import FoodCardList from "../Components/FoodCardList";
import { calculator } from "../Components/Calculator";
import NumberInput from "../Components/NumberInput";
import StringInput from "../Components/StringInput";

function RecipeItemScreen() {
  const [value, setValue] = React.useState("");
  const [portions, setPortions] = React.useState("");
  const [instructions, setInstructions] = React.useState("");

  const [tags, setTags] = React.useState([]);
  const [foods, setFoods] = React.useState([]);
  const [isValid, setIsValid] = React.useState(true);

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
      value: value,
      portions: portions,
      instructions: instructions,
      tags: tags,
      foods: foods.map((item) => ({
        key: item.key,
        amount: parseFloat(item.inputValue),
      })),
    };
    console.log("recipe: ", recipe);
    const totalNutrition = await calculator(recipe.foods);
    console.log("total: ", totalNutrition);
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <StringInput
          placeholder="Nazov"
          setValue={setValue}
          isValid={setIsValid}
        />
        <NumberInput
          placeholder="Pocet Porcii"
          setValue={setPortions}
          isValid={setIsValid}
        />
        <StringInput
          placeholder="Instrukcie"
          setValue={setInstructions}
          isValid={setIsValid}
        />
        <MultiSelector
          value="tag"
          setter={setTags}
          label="Tagy"
          notFoundText="Ziadny tag sa nenasiel"
        />
        <MultiSelector
          value="food"
          setter={handleFoodsChange}
          label="Potraviny"
          notFoundText="Ziadna potravina sa nenasla"
        />

        {foods.length > 0 && (
          <FoodCardList items={foods} updateItem={updateFood} />
        )}
        <View>
          <Button title="Pridat" onPress={handleSave} />
        </View>
      </View>
    </ScrollView>
  );
}

export default RecipeItemScreen;
