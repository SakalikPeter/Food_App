import React from "react";
import { View, ScrollView, Alert, Pressable } from "react-native";
import { Button, Icon, Input, Text } from "react-native-elements";
import { useDispatch } from "react-redux";
import { addRecipe, updateRecipe } from "../../../store/redux/recipe";
import { Recipe, RecipeParams } from "../../Models/Recipe";
import { useAppSelector } from "../../../store/redux/hooks";
import { RootState } from "../../../store/redux/store";
import { Food } from "../../Models/Food";
import { SelectedItem } from "../../Models/SelectedItem";
import SelectorInput from "../../Components/Selector/Selector.Input/Selector.Input";
import Selector2 from "../../Components/Selector/Selector.Base/Selector.Base";
import { checkNumberInput, checkStringInput } from "../../Services/Checker";
import styles from "./RecipeItemScreen.styles";
import { Nutritions } from "../../Models/Nutritions";
import { calculateFoodsNutritions } from "../../Services/calculator";

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
  const [nutritions, setNutritions] = React.useState<Nutritions>(calculateFoodsNutritions(
    foods,
    recipe.foods,
  ));

  // Update nutritions whenever recipe or its foods change
  React.useEffect(() => {
    setNutritions(calculateFoodsNutritions(
      foods,
      recipe.foods,
    ));
  }, [recipe]);

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

    if (recipe.isValid()) {
      let title = "";

      if (recipe.key < 0) {
        const obj = recipe.toPlainObject()
        dispatch(addRecipe(obj));
        title = "Recept bol pridany";
      } else {
        const obj = recipe.toPlainObject()
        console.log("obje: ", obj)
        dispatch(updateRecipe(obj));
        title = "Recept bol upraveny";
      }
      Alert.alert(title, "", [{ text: "OK" }]);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Input
          label="Nazov"
          defaultValue={recipe.value || ''}
          onChangeText={(value) => handleInputChange("value", value)}
          errorMessage={checkStringInput(recipe.value)}
        />
        <Input
          label="Pocet Porcii"
          defaultValue={String(recipe.portions || 0)}
          onChangeText={(value) => handleNumberChange("portions", value)}
          errorMessage={checkNumberInput(recipe.portions)}
          keyboardType="numeric"
        />
        <Input
          label="Instrukcie"
          defaultValue={recipe.instruction || ''}
          onChangeText={(value) => handleInputChange("instruction", value)}
        />
        <Selector2
          items={tags}
          checkedValue={recipe.tags}
          setCheckedItems={handleTagsChange}
          title="Tagy"
          multi={true}
        />
        <SelectorInput
          items={foods.map((f) => itemSelectorFood(f))}
          checkedItems={recipe.foods}
          setCheckedItems={handleFoodsChange}
          setInput={handleFoodInput}
          title="Potraviny"
        />
      </View>
      <View>
        <View>
        <View style={styles.textContainer}>
          <View style={styles.textColumn}>
            <Text style={styles.text}>KCal: {Math.round(nutritions.kcal * 100) / 100}</Text>
            <Text style={styles.text}>Bielkoviny: {Math.round(nutritions.protein * 100) / 100}</Text>
          </View>
          <View style={styles.textColumn}>
            <Text style={styles.text}>Tuky: {Math.round(nutritions.fat * 100) / 100}</Text>
            <Text style={styles.text}>Sacharidy: {Math.round(nutritions.carbs * 100) / 100}</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleSave}>
            <Icon name="done" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default RecipeItemScreen;
