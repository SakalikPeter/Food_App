import React from "react";
import { View } from "react-native";
import { Input, Text, Button } from "react-native-elements";
import { loadList, loadUniqueValues } from "../Components/DataHandler";
import { checkStringInput, checkNumberInput } from "../Components/Checker";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";

function RecipeItemScreen(props) {
  const [units, setUnits] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [foods, setFoods] = React.useState([]);
  const [selectedUnit, setSelectedUnit] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [selectedFoods, setSelectedFoods] = React.useState([]);

  React.useEffect(() => {
    loadList("unit")
      .then((data) => setUnits(data))
      .catch((error) => console.error(error));
    loadList("tag")
      .then((data) => setTags(data))
      .catch((error) => console.error(error));
    loadUniqueValues("food")
      .then((data) => setFoods(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View>
        <Text>Nazov</Text>
        <Input
          placeholder="Nazov"
          //   onChangeText={(value) => handleInputChange("name", value)}
          //   errorMessage={errorMessage["name"]}
        />
      </View>
      <View>
        <Input placeholder="Pocet Porcii" />
      </View>
      <View>
        <SelectList
          setSelected={(val) => setSelectedUnit(val)}
          data={units}
          save="key"
        />
      </View>
      <View>
        <MultipleSelectList
          setSelected={(val) => setSelectedTags(val)}
          data={tags}
          save="key"
          label="Tagy"
          notFoundText="Ziadny tag sa nenasiel"
        />
      </View>
      <View>
        <MultipleSelectList
          setSelected={(val) => setSelectedFoods(val)}
          data={foods}
          save="key"
          label="Tagy"
          notFoundText="Ziadny tag sa nenasiel"
        />
      </View>
    </View>
  );
}

export default RecipeItemScreen;
