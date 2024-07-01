import React from "react";
import { View, Modal, StyleSheet, Pressable } from "react-native";
import { Icon } from "react-native-elements";
import ValueList from "../Components/ValueList";
import { useSelector, useDispatch } from "react-redux";
import BaseSearchBar from "../Components/SearchBars/BaseSearchBar/BaseSearchBar";
import RecipeItemModal from "../Components/Modals/RecipeItemModal/RecipeItemModal";
import RecipeFilter from "../Components/Filters/RecipeFilter/RecipeFilter";

function RecipeListScreen({ navigation }) {
  const [value, setValue] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [foods, setFoods] = React.useState([]);
  const [filters, setFilters] = React.useState(false);
  const items = useSelector((state) => state.recipe.items);
  const [filteredItems, setFilteredItems] = React.useState([])


  const [item, setItem] = React.useState(null);
  const [itemVisible, setItemVisible] = React.useState(false);

  const showItem = (item) => {
    setItemVisible(true);
    setItem(item);
  };
  const hideItem = () => {
    console.log(item);
    setItemVisible(false);
    setItem(null);
    setValue("");
  };
  const handleAddRecipe = () => {
    navigation.navigate("Recept", {});
  };

  return (
    <View style={styles.container}>
      <View>
        {itemVisible && (
          <RecipeItemModal
            recipe={item}
            hideRecipe={hideItem}
            navigation={navigation}
          />
        )}
      </View>
      <View>
        <RecipeFilter foods={items} setFilteredFoods={setFilteredItems}/>
      </View>
      <View style={styles.listContainer}>
        {items.length > 0 && (
          <ValueList
            showItem={showItem}
            items={items.filter((item) => {
              const a = item.value.toLowerCase();
              const b = value.toLowerCase();
              if (value && !a.includes(b)) return false;
              if (
                tags.length > 0 &&
                !tags.every((tag) => item.tags.includes(tag))
              ) {
                return false;
              }
              const recipeFoods = item.foods.map((food) => food.value);
              const selectedFoods = foods.map((food) => food.value);
              if (
                foods.length > 0 &&
                !selectedFoods.every((food) => recipeFoods.includes(food))
              ) {
                return false;
              }

              return true;
            })}
          />
        )}
      </View>
      <View style={styles.addButtonContainer}>
        <Pressable
          style={[styles.button, styles.buttonAdd]}
          onPress={() => handleAddRecipe()}
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

export default RecipeListScreen;
