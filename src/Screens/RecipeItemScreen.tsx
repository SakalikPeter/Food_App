import React from "react";
import { View, ScrollView, Alert } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { useDispatch } from "react-redux";
import { addRecipe, updateRecipe } from "../../store/redux/recipe";
import { Recipe, RecipeParams } from "../Models/Recipe";
import { useAppSelector } from "../../store/redux/hooks";
import { RootState } from "../../store/redux/store";
import { Food } from "../Models/Food";
import { SelectedItem } from "../Models/SelectedItem";
import Selector from "../Components/Selector/Selector";
import Selector2 from "../Components/Selector/SingleSelector/SingleSelector";
import { checkNumberInput, checkStringInput } from "../Services/Checker";

const itemSelectorFood = (item) => ({
  key: item.key,
  value: item.value + " (" + item.category + ")",
  unit: item.unit,
});

function RecipeItemScreen({ route, navigation }) {
  const initialRecipeParams: RecipeParams = route.params.item || {};
  const [recipe, setRecipe] = React.useState(new Recipe(initialRecipeParams));
  const foods: Food[] = useAppSelector((state: RootState) => state.food.items);
  const tags = useAppSelector((state: RootState) => state.tag.items);
  const dispatch = useDispatch();

  // Update nutritions whenever recipe or its foods change
  React.useEffect(() => {
    const updatedRecipe = new Recipe(recipe);
    updatedRecipe.calculateNutritions(foods);
    setRecipe(updatedRecipe);
  }, [recipe.foods]);

  const handleInputChange = (field: keyof RecipeParams, value: string | number) => {
    setRecipe((prevRecipe) => new Recipe({ ...prevRecipe, [field]: value }));
  };

  const handleNumberChange = (field: keyof RecipeParams, value: string) => {
    if (Number(value)) handleInputChange(field, Number(value));
  };

  const handleFoodsChange = (key: string) => {
    let updatedFoods = recipe.foods;
    const selectedKeys = recipe.foods.map((f) => f.key);
    if (selectedKeys.includes(Number(key))) {
      updatedFoods = recipe.foods.filter((f) => f.key !== Number(key));
    } else {
      const newItem = new SelectedItem(Number(key), 0);
      updatedFoods = [...updatedFoods, newItem];
    }
    setRecipe((prevRecipe) => new Recipe({ ...prevRecipe, foods: updatedFoods }));
  };

  const handleTagsChange = (value: string[]) => {
    setRecipe((prevRecipe) => new Recipe({ ...prevRecipe, tags: value }));
  };

  const handleFoodInput = (item: SelectedItem) => {
    const updatedFoods = recipe.foods.map((food) => {
      if (food.key === item.key) {
        return new SelectedItem(food.key, item.quantity);
      }
      return food;
    });
    setRecipe((prevRecipe) => new Recipe({ ...prevRecipe, foods: updatedFoods }));
  };

  const handleSave = () => {
    console.log("Submit", recipe);
    recipe.calculateNutritions(foods);
    console.log("Nutrition", recipe.nutritions);

    if (recipe.isValid()) {
      let title = "";

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
    <View style={{ flex: 1 }}>
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
        <Selector2
          items={tags}
          checkedValue={recipe.tags}
          setCheckedItems={handleTagsChange}
          title="Tagy"
          multi={true}
        />
        <Selector
          items={foods.map((f) => itemSelectorFood(f))}
          checkedItems={recipe.foods}
          setCheckedItems={handleFoodsChange}
          setInput={handleFoodInput}
          title="Potraviny"
        />
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
    </View>
  );
}

export default RecipeItemScreen;
