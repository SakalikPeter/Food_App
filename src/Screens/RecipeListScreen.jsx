import React from "react";
import { Text, View, Button } from "react-native";
import LoadList from "../Components/ListView";
import { SelectList } from "react-native-dropdown-select-list";
import {
  loadUniqueValues,
  loadJsonData,
  loadList,
  // deleteItemByName,
} from "../Components/DataHandler";
import { MultipleSelectList } from "react-native-dropdown-select-list";

function RecipeListScreen() {
  const filename = "recipe";
  const [values, setValues] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState([]);

  const [items, setItems] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [itemToRemove, setItemToRemove] = React.useState(null);
  const [itemToUpdate, setItemToUpdate] = React.useState(null);

  React.useEffect(() => {
    loadJsonData(filename)
      .then((data) => data[filename])
      .then((data) => setItems(data))
      .catch((error) => console.error(error));
    loadUniqueValues(filename)
      .then((data) => setValues(data))
      .catch((error) => console.error(error));
    loadList("tag")
      .then((data) => setTags(data))
      .catch((error) => console.error(error));
  }, []);

  const filteredItems = items.filter((item) => {
    if (selectedValue && item.key !== selectedValue) return false;
    if (selectedTags && !selectedTags.every((tag) => item.tags.includes(tag)))
      return false;
    // if (selectedUnit && item.unit !== selectedUnit) return false;
    return true;
  });

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View>
        <Text>Food List page</Text>
      </View>
      <View>
        <SelectList
          setSelected={(val) => setSelectedValue(val)}
          data={values}
          save="key"
          notFoundText="Ziadny recept sa nenasiel"
        />
        <MultipleSelectList
          setSelected={(val) => setSelectedTags(val)}
          data={tags}
          save="key"
          label="Tagy"
          notFoundText="Ziadny tag sa nenasiel"
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

export default RecipeListScreen;
