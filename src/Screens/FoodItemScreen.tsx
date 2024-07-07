import React from "react";
import { View, Button, ScrollView, Alert } from "react-native";
import { checkStringInput, checkNumberInput } from "../Components/Checker";
import { Input } from "react-native-elements";
import SingleSelector from "../Components/SingleSelector";
import { useDispatch } from "react-redux";
import { addFood, updateFood } from "../../store/redux/food";
import { Food, FoodParams } from "../Models/Food";

function FoodItemScreen({ route, navigation }) {
  const initialFoodParams: FoodParams = route.params.item || {};
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
          <SingleSelector
            itemKey="category"
            defValue={food.category}
            setItem={handleInputChange}
            label="Kategoria"
            notFoundText="Ziadna kategoria sa nenasla"
          />
          <SingleSelector
            itemKey="unit"
            defValue={food.unit}
            setItem={handleInputChange}
            label="Jednotka"
            notFoundText="Ziadna jednotka sa nenasla"
          />
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
