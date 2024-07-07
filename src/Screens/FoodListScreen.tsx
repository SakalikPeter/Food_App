import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import ValueList from "../Components/ValueList";
import { useSelector } from "react-redux";
import FoodItemModal from "../Components/Modals/FoodItemModal/FoodItemModal";
import BaseSearchBar from "../Components/SearchBars/BaseSearchBar/BaseSearchBar";
import FoodFilter from "../Components/Filters/FoodFilter/FoodFilter";
import FoodList from "../Components/FoodList/FoodList";
import { Food } from "../Models/Food";
import { useAppSelector } from "../../store/redux/hooks";
import { RootState } from "../../store/redux/store";
import category from "../../store/redux/category";

function FoodListScreen({ navigation }) {
  const foods: Food[] = useAppSelector((state: RootState) => state.food.items);
  const [filteredItems, setFilteredItems] = React.useState([])
  const [value, setValue] = React.useState("");
  const [item, setItem] = React.useState(null);
  const [itemVisible, setItemVisible] = React.useState(false);

  const hideItem = () => {
    setItemVisible(false);
    setItem(null);
    setValue("");
  };
  const handleAddFood = () => {
    navigation.navigate("Potravina", {});
  };
  const showItem = (key: Number) => {
    setItemVisible(true);
    setItem(foods.find((food) => food.key === key));
  }

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
        {/*<FoodFilter foods={items} setFilteredFoods={setFilteredItems}/> */}
      </View>
      <FoodList items={foods} setSelectedItem={showItem}/>
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
