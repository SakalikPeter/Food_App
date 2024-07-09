import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import FoodItemModal from "../Components/Modals/FoodItemModal/FoodItemModal";
import FilterFood from "../Components/Filter/Filter.Food/Filter.Food";
import ListFood from "../Components/List/List.Food/List.Food";
import { Food } from "../Models/Food";
import { useAppSelector } from "../../store/redux/hooks";
import { RootState } from "../../store/redux/store";

function FoodListScreen({ navigation }) {
  const foods: Food[] = useAppSelector((state: RootState) => state.food.items);
  const [filteredFoods, setFilteredfoods] = React.useState(foods)
  const [value, setValue] = React.useState("");
  const [item, setItem] = React.useState(null);
  const [itemVisible, setItemVisible] = React.useState(false);

  React.useEffect(() => {
    setFilteredfoods(foods);
  }, [foods]);

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
        <FilterFood foods={foods} setFilteredFoods={setFilteredfoods}/>
      </View>
      <ListFood items={filteredFoods} setSelectedItem={showItem}/>
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
