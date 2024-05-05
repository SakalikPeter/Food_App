import React from "react";
import { View, Button, ScrollView } from "react-native";
import NumberInput from "../Components/NumberInput";
import StringInput from "../Components/StringInput";
import SingleSelector from "../Components/SingleSelector";
import { useSelector, useDispatch } from "react-redux";
import { addFood, removeFood, selectFoodByKey } from "../../store/redux/food";

function FoodItemScreen({ route, navigation }) {
  const key = route.params.item.key || 100;
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

  const itemExists = useSelector(selectFoodByKey(key));
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const food = {
      key: key,
      value: value,
      category: category,
      unit: unit,
      base: unitAmount,
      kj: energy,
      kcal: calory,
      protein: protein,
      carbs: carb,
      fat: fat,
    };
    if (itemExists) {
      dispatch(removeFood(food));
      dispatch(addFood(food));
      // TODO: update alert
    } else {
      // TODO: add key
      dispatch(addFood(food));
      // TODO: add alert
    }

    navigation.goBack();
  };

  return (
    <ScrollView style={{ flex: 1 }}>
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
    </ScrollView>
  );
}

export default FoodItemScreen;
