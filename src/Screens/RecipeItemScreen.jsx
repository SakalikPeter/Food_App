import React from "react";
import { View, ScrollView } from "react-native";
import { Button, Input } from "react-native-elements";
import MultiSelector from "../Components/MultiSelector";
import FoodCardList from "../Components/FoodCardList";
import { calculator } from "../Components/Calculator";

function RecipeItemScreen() {
  const [tags, setTags] = React.useState([]);
  const [foods, setFoods] = React.useState([]);
  const [name, setName] = React.useState("");
  const [portions, setPortions] = React.useState(0);
  const [instructions, setInstructions] = React.useState("");

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
    console.log("Update: ", updatedFoods);
    setFoods(updatedFoods);
  };

  const handleSave = async () => {
    const recipe = {
      value: name,
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
      <View>
        <Input placeholder="Nazov" onChangeText={(value) => setName(value)} />
      </View>
      <View>
        <Input
          placeholder="Pocet Porcii"
          onChangeText={(value) => setPortions(value)}
        />
      </View>
      <View>
        <Input
          placeholder="Instrukcie"
          onChangeText={(value) => setInstructions(value)}
          inputStyle={{ minHeight: 200 }}
        />
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <MultiSelector
          value="tag"
          setter={setTags}
          label="Tagy"
          notFoundText="Ziadny tag sa nenasiel"
        />
        <View>
          <MultiSelector
            value="food"
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
          <Button title="Pridat" onPress={handleSave} />
        </View>
      </View>
    </ScrollView>
  );
}

export default RecipeItemScreen;
