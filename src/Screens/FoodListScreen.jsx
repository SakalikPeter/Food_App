import React from "react";
import { Text, View, Button } from "react-native";
import LoadList from "../Components/ListView";
import DropdownTextFilter from "../Components/DropdownTextFilter";
import {
  loadUniqueValues,
  loadJsonData,
  // deleteItemByName,
} from "../Components/DataHandler";

function FoodListScreen() {
  const filename = "food";

  const [names, setNames] = React.useState("");
  const [categories, setCategories] = React.useState("");
  const [units, setUnits] = React.useState("");
  const [items, setItems] = React.useState([]);
  const [selectedName, setSelectedName] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedUnit, setSelectedUnit] = React.useState("");
  const [itemToRemove, setItemToRemove] = React.useState(null);
  const [itemToUpdate, setItemToUpdate] = React.useState(null);

  React.useEffect(() => {
    loadJsonData(filename)
      .then((data) => data[filename])
      .then((data) => setItems(data));
    loadUniqueValues(filename, "name")
      .then((data) => setNames(data))
      .catch((error) => console.error(error));
    loadUniqueValues(filename, "category")
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));
    loadUniqueValues(filename, "unit")
      .then((data) => setUnits(data))
      .catch((error) => console.error(error));
  }, []);

  // React.useEffect(() => {
  //   if (itemToRemove) {
  //     deleteItemByName("food", itemToRemove.name);
  //   }
  // }, [itemToRemove]);

  const filteredItems = items.filter((item) => {
    if (selectedName && item.name !== selectedName) return false;
    if (selectedCategory && item.category !== selectedCategory) return false;
    if (selectedUnit && item.unit !== selectedUnit) return false;
    return true;
  });

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View>
        <Text>Food List page</Text>
      </View>
      <View>
        <DropdownTextFilter
          items={names}
          setter={setSelectedName}
          text="Nazov"
        />
        <DropdownTextFilter
          items={categories}
          setter={setSelectedCategory}
          text="Kategoria"
        />
        <DropdownTextFilter
          items={units}
          setter={setSelectedUnit}
          text="Jednotka"
        />
      </View>
      <View>
        <LoadList
          items={filteredItems}
          updater={setItemToUpdate}
          remover={setItemToRemove}
        />
      </View>
    </View>
  );
}

export default FoodListScreen;
