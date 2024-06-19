import React from "react";
import { View, ScrollView, Alert } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import MultiSelector from "../Components/MultiSelector";
import FoodCardList from "../Components/FoodCardList";
import { checkStringInput, checkNumberInput } from "../Components/Checker";
import { useDispatch } from "react-redux";
import { addRecipe, updateRecipe } from "../../store/redux/recipe";
import { Recipe, RecipeParams } from "../Models/Recipe";
import { useAppSelector } from "../../store/redux/hooks";
import { RootState } from "../../store/redux/store";
import { Food } from "../Models/Food";
import { RecipeFood } from "../Models/RecipeFood";

function RecipeItemScreen({ route, navigation }) {
  const initialRecipeParams: RecipeParams = route.params.item || {};
  const [recipe, setRecipe] = React.useState(new Recipe(initialRecipeParams));
  const foods: Food[] = useAppSelector((state: RootState) => state.food.items);
  const tags = useAppSelector((state: RootState) => state.tag.items);
  const dispatch = useDispatch();

  const handleInputChange = (
    field: keyof RecipeParams,
    value: string | number
  ) => {
    setRecipe((prevFood) => new Recipe({ ...prevFood, [field]: value }));
  };
  const handleNumberChange = (field: keyof RecipeParams, value: string) => {
    if (Number(value)) handleInputChange(field, Number(value));
  };
  const handleTagsChange = (tags: string[]) => {
    setRecipe((prevRecipe) => new Recipe({ ...prevRecipe, tags }));
  };
  const handleFoodsChange = (foods: string[]) => {
    const foodValues = recipe.foods.map((food) => food.value);
    let originFood = recipe.foods.filter((food) => foods.includes(food.value));
    let newFood = foods
      .filter((food) => !foodValues.includes(food))
      .map((food) => new RecipeFood(food, 0, "g"));
    setRecipe(
      (prevRecipe) =>
        new Recipe({ ...prevRecipe, foods: [...originFood, ...newFood] })
    );
  };
  const handleAmountChange = (foods: RecipeFood[]) => {
    setRecipe((prevRecipe) => new Recipe({ ...prevRecipe, foods }));
  };

  const handleSave = () => {
    console.log("Submit", recipe);
    recipe.calculateNutritions(foods)
    console.log("Nutrition", recipe.nutritions)
    
    if (recipe.isValid()) {
      let title: string = "";

      if (recipe.key < 0) {
        dispatch(addRecipe(recipe.toParams()));
        title = "Recept bol pridany";
      } else {
        dispatch(updateRecipe(recipe.toParams()));
        title = "Recept bol upraveny";
      }
      Alert.alert(title, "", [{ text: "OK" }]);
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <Input
          label="Nazov"
          defaultValue={recipe.value}
          onChangeText={(value) => handleInputChange("value", value)}
          errorMessage={checkStringInput(recipe.value)}
        />
        <Input
          label="Pocet Porcii"
          defaultValue={String(recipe.portions)}
          onChangeText={(value) => handleNumberChange("portions", value)}
          errorMessage={checkNumberInput(recipe.portions)}
          keyboardType="numeric"
        />
        <Input
          label="Instrukcie"
          defaultValue={recipe.instruction}
          onChangeText={(value) => handleInputChange("instruction", value)}
        />
        <MultiSelector
          items={foods.map((food) => ({key: food.key, value: `${food.value} (${food.category})`}))}
          defValue={recipe.foods.map((food) => food.value)}
          setItem={handleFoodsChange}
          label="Potraviny"
          notFoundText="Ziadna potravina sa nenasla"
        />
        <MultiSelector
          items={tags}
          defValue={recipe.tags}
          setItem={handleTagsChange}
          label="Tagy"
          notFoundText="Ziadny tag sa nenasiel"
        />
      </View>
      <View>
        {recipe.foods.length > 0 && (
          <FoodCardList
            items={recipe.foods}
            setRecipeFood={handleAmountChange}
          />
        )}
      </View>
      <View>
        <Text>KJ: {recipe.nutritions.kj}</Text>
        <Text>KCAL: {recipe.nutritions.kcal}</Text>
        <Text>Bielkoviny: {recipe.nutritions.protein}</Text>
        <Text>Sacharidy: {recipe.nutritions.carbs}</Text>
        <Text>Tuky: {recipe.nutritions.fat}</Text>
      </View>
      <View>
        <Button title="Pridat" onPress={handleSave} />
      </View>
    </ScrollView>
  );
}

export default RecipeItemScreen;
