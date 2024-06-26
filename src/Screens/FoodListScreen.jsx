import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import ValueList from "../Components/ValueList";
import { useSelector } from "react-redux";
import FoodItemModal from "../Components/Modals/FoodItemModal/FoodItemModal";
import BaseSearchBar from "../Components/SearchBars/BaseSearchBar/BaseSearchBar";
import FoodFilter from "../Components/Filters/FoodFilter/FoodFilter";

function FoodListScreen({ navigation }) {
  const items = useSelector((state) => state.food.items);
  const [filteredItems, setFilteredItems] = React.useState([])
  const [value, setValue] = React.useState("");
  const [item, setItem] = React.useState(null);
  const [itemVisible, setItemVisible] = React.useState(false);

  const showItem = (item) => {
    setItemVisible(true);
    setItem(item);
  };
  const hideItem = () => {
    setItemVisible(false);
    setItem(null);
    setValue("");
  };
  const handleAddFood = () => {
    navigation.navigate("Potravina", {});
  };

  return (
    <View style={styles.container}>
      <View>
        {itemVisible && (
          <FoodItemModal
            food={item}
            hideFood={hideItem}
            navigation={navigation}
          />
        )}
      </View>
      <View>
        {/* <BaseSearchBar value={value} setValue={setValue} /> */}
        <FoodFilter foods={items} setFilteredFoods={setFilteredItems}/>
      </View>
      <View style={styles.listContainer}>
        {items.length > 0 && (
          <ValueList
            showItem={showItem}
            items={filteredItems}
          />
        )}
      </View>
      <View style={styles.addButtonContainer}>
        <Pressable
          style={[styles.button, styles.buttonAdd]}
          onPress={() => handleAddFood()}
        >
          <Icon name="add" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  listContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonContainer: {
    alignItems: "center",
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonAdd: {
    backgroundColor: "#2196F3",
  },
});

export default FoodListScreen;
