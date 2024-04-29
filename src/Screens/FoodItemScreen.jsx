import React from "react";
import { View, Button } from "react-native";
import NumberInput from "../Components/NumberInput";
import StringInput from "../Components/StringInput";
import SingleSelector from "../Components/SingleSelector";

function FoodItemScreen({ route, navigation }) {
  const [value, setValue] = React.useState(route.params.item.value);
  const [category, setCategory] = React.useState(route.params.item.category);
  const [unit, setUnit] = React.useState(route.params.item.unit);
  const [unitAmount, setUnitAmount] = React.useState(route.params.item.base);
  const [energy, setEnergy] = React.useState(route.params.item.kj);
  const [calory, setCalory] = React.useState(route.params.item.kcal);
  const [protein, setProtein] = React.useState(route.params.item.protein);
  const [carb, setCarb] = React.useState(route.params.item.carbs);
  const [fat, setFat] = React.useState(route.params.item.fat);
  const [isValid, setIsValid] = React.useState({});

  const handleSubmit = () => {
    const food = {
      value: value,
      category: category,
      unit: unit,
      unitAmount: unitAmount,
      energy: energy,
      calory: calory,
      protein: protein,
      carb: carb,
      fat: fat,
    };
    console.log(food);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View>
        <StringInput
          placeholder="Nazov"
          defaultValue={value}
          setValue={setValue}
          isValid={setIsValid}
        />
      </View>
      <View>
        <SingleSelector
          value="category"
          defValue={category}
          setter={setCategory}
          label="Kategoria"
          notFoundText="Ziadna kategoria sa nenasla"
        />
        <SingleSelector
          value="unit"
          defValue={unit}
          setter={setUnit}
          label="Jednotka"
          notFoundText="Ziadna jednotka sa nenasla"
        />
        <NumberInput
          placeholder="Mnozstvo"
          defaultValue={unitAmount}
          setValue={setUnitAmount}
          isValid={setIsValid}
        />
      </View>
      <View>
        <NumberInput
          placeholder="Energia"
          defaultValue={energy}
          setValue={setEnergy}
          isValid={setIsValid}
        />
      </View>
      <View>
        <NumberInput
          placeholder="Kalorie"
          defaultValue={calory}
          setValue={setCalory}
          isValid={setIsValid}
        />
      </View>
      <View>
        <NumberInput
          placeholder="Bielkoviny"
          defaultValue={protein}
          setValue={setProtein}
          isValid={setIsValid}
        />
      </View>
      <View>
        <NumberInput
          placeholder="Sacharidy"
          defaultValue={carb}
          setValue={setCarb}
          isValid={setIsValid}
        />
      </View>
      <View>
        <NumberInput
          placeholder="Tuky"
          defaultValue={fat}
          setValue={setFat}
          isValid={setIsValid}
        />
      </View>
      <View>
        <Button title="Pridat" onPress={handleSubmit} />
      </View>
    </View>
  );
}

export default FoodItemScreen;
