import React from "react";
import { View, Button } from "react-native";
import { Input, Text } from "react-native-elements";
import NumberInput from "../Components/NumberInput";
import StringInput from "../Components/StringInput";
import SingleSelector from "../Components/SingleSelector";

function FoodItemScreen(props) {
  const [item, setItem] = React.useState({});
  const [value, setValue] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [unit, setUnit] = React.useState("");
  const [unitAmount, setUnitAmount] = React.useState("");
  const [energy, setEnergy] = React.useState("");
  const [calory, setCalory] = React.useState("");
  const [protein, setProtein] = React.useState("");
  const [carb, setCarb] = React.useState("");
  const [fat, setFat] = React.useState("");
  const [isValid, setIsValid] = React.useState({});

  React.useEffect(() => {
    if (props.item) {
    } else {
      setItem({
        name: "",
        category: "",
        unit: "",
        kj: "",
        kcal: "",
        protein: "",
        carbs: "",
        fat: "",
      });
    }
  }, []);

  const handleChange = (key, value) => {
    setItem({ ...item, [key]: value });
  };

  const handleSubmit = () => {
    const food = {
      value: value,
      category: category,
      unit: unit,
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
          setValue={setValue}
          isValid={setIsValid}
        />
      </View>
      <View>
        <SingleSelector
          value="category"
          setter={setCategory}
          label="Kategoria"
          notFoundText="Ziadna kategoria sa nenasla"
        />
        <SingleSelector
          value="unit"
          setter={setUnit}
          label="Jednotka"
          notFoundText="Ziadna jednotka sa nenasla"
        />
        <NumberInput
          placeholder="Mnozstvo"
          setValue={setUnitAmount}
          isValid={setIsValid}
        />
      </View>
      <View>
        <NumberInput
          placeholder="Energia"
          setValue={setEnergy}
          isValid={setIsValid}
        />
      </View>
      <View>
        <NumberInput
          placeholder="Kalorie"
          setValue={setCalory}
          isValid={setIsValid}
        />
      </View>
      <View>
        <NumberInput
          placeholder="Bielkoviny"
          setValue={setProtein}
          isValid={setIsValid}
        />
      </View>
      <View>
        <NumberInput
          placeholder="Sacharidy"
          setValue={setCarb}
          isValid={setIsValid}
        />
      </View>
      <View>
        <NumberInput
          placeholder="Tuky"
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
