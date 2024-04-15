import React from "react";
import { View } from "react-native";
import { Input, Text, Button } from "react-native-elements";
import DropdownTextFilter from "../Components/DropdownTextFilter";
import { loadUniqueValues, saveItem } from "../Components/DataHandler";
import { checkStringInput, checkNumberInput } from "../Components/Checker";

function FoodItemScreen(props) {
  const [errorMessage, setErrorMessage] = React.useState({
    name: "",
    category: "",
    unit: "",
    kj: "",
    kcal: "",
    protein: "",
    carbs: "",
    fat: "",
  });
  const [placeholder, setPlacehlder] = React.useState({
    name: "Nazov",
    category: "Kategoria",
    unit: "Jednotka",
    kj: "Energia",
    kcal: "Kalorie",
    protein: "Bielkoviny",
    carbs: "Sacharidy",
    fat: "Tuky",
  });
  const [item, setItem] = React.useState({
    name: "",
    category: "",
    unit: "",
    kj: "",
    kcal: "",
    protein: "",
    carbs: "",
    fat: "",
  });
  const [categories, setCategories] = React.useState([]);
  const [units, setUnits] = React.useState([]);

  React.useEffect(() => {
    loadUniqueValues("category", "")
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));
    console.log(categories);
    loadUniqueValues("unit", "")
      .then((data) => setUnits(data))
      .catch((error) => console.error(error));
  }, []);

  const checkValue = (type, key, value) => {
    if (type === "string") {
      return checkStringInput(value);
    } else if (type === "number") {
      return checkNumberInput(value);
    }
    return res;
  };

  const handleSubmit = () => {
    // if (
    checkValue("string", "name", item["name"]);
    checkValue("string", "category", item["category"]);
    checkValue("string", "unit", item["unit"]);
    checkValue("number", "kj", item["kj"]);
    checkValue("number", "kcal", item["kcal"]);
    checkValue("number", "protein", item["protein"]);
    checkValue("number", "carbs", item["carbs"]);
    checkValue("number", "fat", item["fat"]);
    // ) {
    //   saveItem("food", item);
    // }
  };

  const handleInputChange = (key, value) => {
    setItem({
      ...item,
      [key]: value,
    });
  };

  const handleUnitChange = (value) => {
    handleInputChange("unit", value);
  };
  const handleCategoryChange = (value) => {
    handleInputChange("category", value);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View>
        <Text>Nazov</Text>
        <Input
          placeholder={placeholder["name"]}
          onChangeText={(value) => handleInputChange("name", value)}
          errorMessage={errorMessage["name"]}
        />
      </View>
      <View>
        <Text>Kategoria</Text>
        <DropdownTextFilter
          items={categories}
          setter={handleUnitChange}
          text={placeholder["category"]}
        />
      </View>
      <View>
        <Text>Jednotka</Text>
        <DropdownTextFilter
          items={units}
          setter={handleCategoryChange}
          text="Jednotka"
        />
      </View>
      <View>
        <Text>Kilo Joule</Text>
        <Input
          placeholder={placeholder["kj"]}
          onChangeText={(value) => handleInputChange("kj", value)}
          errorMessage={errorMessage["kj"]}
        />
      </View>
      <View>
        <Text>Kalorie</Text>
        <Input
          placeholder={placeholder["kcal"]}
          onChangeText={(value) => handleInputChange("kcal", value)}
          errorMessage={errorMessage["kcal"]}
        />
      </View>
      <View>
        <Text>Bielkoviny</Text>
        <Input
          placeholder={placeholder["protein"]}
          onChangeText={(value) => handleInputChange("protein", value)}
          errorMessage={errorMessage["protein"]}
        />
      </View>
      <View>
        <Text>Sacharidy</Text>
        <Input
          placeholder={placeholder["carbs"]}
          onChangeText={(value) => handleInputChange("carbs", value)}
          errorMessage={errorMessage["carbs"]}
        />
      </View>
      <View>
        <Text>Tuky</Text>
        <Input
          placeholder={placeholder["fat"]}
          onChangeText={(value) => handleInputChange("fat", value)}
          errorMessage={errorMessage["fat"]}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
}

export default FoodItemScreen;
