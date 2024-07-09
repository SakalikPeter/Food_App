import React from "react";
import { View, Button, ScrollView, Alert } from "react-native";
import { checkStringInput, checkNumberInput } from "../Services/Checker";
import { Input } from "react-native-elements";
import { useDispatch } from "react-redux";
import { addFood, updateFood } from "../../store/redux/food";
import { Food, FoodParams } from "../Models/Food";
import { RootState } from "../../store/redux/store";
import { useAppSelector } from "../../store/redux/hooks";
import { Category } from "../Models/Category";
import Selector2 from "../Components/Selector/Selector.Base/Selector.Base";

function FoodItemScreen({ route, navigation }) {
  const initialFoodParams: FoodParams = route.params.item || {};
  const categories: Category[] = useAppSelector((state: RootState) => state.category.items);
  const units: any[] = useAppSelector((state: RootState) => state.unit.items);

  const [food, setFood] = React.useState(new Food(initialFoodParams));
  const dispatch = useDispatch();

  const handleInputChange = (
    field: keyof FoodParams,
    value: string | number
  ) => {
    setFood((prevFood) => new Food({ ...prevFood, [field]: value }));
  };
  const handleNumberChange = (field: keyof FoodParams, value: string) => {
    if (Number(value)) handleInputChange(field, Number(value));
  };

  const handleCategoryChange = (value: string[]) => {
    handleInputChange("category", value[0])
  };

  const handleUnitChange = (value: string[]) => {
    handleInputChange("unit", value[0])
  };

  const handleSubmit = () => {
    if (food.isValid()) {
      let title: string = "";

      if (food.key < 0) {
        dispatch(addFood(food.toParams()));
        title = "Potravina bola pridana";
      } else {
        dispatch(updateFood(food.toParams()));
        title = "Potravina bola upravena";
      }
      Alert.alert(title, "", [{ text: "OK" }]);
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <View>
          <Input
            label="Nazov"
            defaultValue={food.value}
            onChangeText={(value) => handleInputChange("value", value)}
            errorMessage={checkStringInput(food.value)}
          />
        </View>
        <View>
        <Selector2 items={categories} checkedValue={[food.category]} setCheckedItems={handleCategoryChange} title="Kategoria" /> 
        <Selector2 items={units} checkedValue={[food.unit]} setCheckedItems={handleUnitChange} title="Jednotka" /> 
          <Input
            label="Mnozstvo"
            defaultValue={String(food.base)}
            onChangeText={(value) => handleNumberChange("base", value)}
            errorMessage={checkNumberInput(food.base)}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Input
            label="Energia (KJ)"
            defaultValue={String(food.kj)}
            onChangeText={(value) => handleNumberChange("kj", value)}
            errorMessage={checkNumberInput(food.kj)}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Input
            label="Kalorie (KCal)"
            defaultValue={String(food.kcal)}
            onChangeText={(value) => handleNumberChange("kcal", value)}
            errorMessage={checkNumberInput(food.kcal)}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Input
            label="Bielkoviny"
            defaultValue={String(food.protein)}
            onChangeText={(value) => handleNumberChange("protein", value)}
            errorMessage={checkNumberInput(food.protein)}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Input
            label="Sacharidy"
            defaultValue={String(food.carbs)}
            onChangeText={(value) => handleNumberChange("carbs", value)}
            errorMessage={checkNumberInput(food.carbs)}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Input
            label="Tuky"
            defaultValue={String(food.fat)}
            onChangeText={(value) => handleNumberChange("fat", value)}
            errorMessage={checkNumberInput(food.fat)}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Button
            title={food.key > -1 ? "Upravit" : "Pridat"}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default FoodItemScreen;
