import React from "react";
import { View, Modal, StyleSheet, Pressable } from "react-native";
import { Icon } from "react-native-elements";
import ValueList from "../Components/ValueList";
import { useSelector, useDispatch } from "react-redux";
import { removeRecipe } from "../../store/redux/recipe";
import BaseSearchBar from "../Components/SearchBars/BaseSearchBar/BaseSearchBar";
import RecipeItemModal from "../Components/Modals/RecipeItemModal/RecipeItemModal";

function RecipeListScreen({ navigation }) {
  const [value, setValue] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [foods, setFoods] = React.useState([]);
  const [filters, setFilters] = React.useState(false);
  const items = useSelector((state) => state.recipe.items);
  const dispatch = useDispatch();

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
  const updateItem = () => {
    hideItem();
    // console.log("item", item)
    navigation.navigate("Recept", { item: item });
  };
  const removeItem = () => {
    Alert.alert("Alert Title", `${item.value}`, [
      {
        text: "Zrusit",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "ANO",
        onPress: () => {
          dispatch(removeRecipe(item.key));
          hideItem();
        },
      },
    ]);
  };
  const handleAddRecipe = () => {
    navigation.navigate("Recept", {
      item: {
        key: -1,
        value: "",
        portions: "",
        instructions: "",
        food: [],
        tags: [],
      },
    });
  };

  return (
    <View style={styles.container}>
      <View>
        {itemVisible && (
          <RecipeItemModal
            recipe={item}
            hideRecipe={hideItem}
            removeRecipe={removeItem}
            updateRecipe={updateItem}
          />
        )}
      </View>
      <View>
        <BaseSearchBar value={value} setValue={setValue} />
      </View>
      <View style={styles.listContainer}>
        {items.length > 0 && (
          <ValueList
            showItem={showItem}
            updateItem={updateItem}
            removeItem={removeItem}
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
              const recipeFoods = item.food.map((food) => food.value);
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
