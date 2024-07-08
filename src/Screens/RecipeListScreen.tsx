import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import FoodItemModal from "../Components/Modals/FoodItemModal/FoodItemModal";
import FoodFilter from "../Components/Filters/FoodFilter/FoodFilter";
import FoodList from "../Components/FoodList/FoodList";
import { Food } from "../Models/Food";
import { useAppSelector } from "../../store/redux/hooks";
import { RootState } from "../../store/redux/store";
import { Recipe } from "../Models/Recipe";
import RecipeList from "../Components/RecipeList/RecipeList";
import RecipeFilter from "../Components/Filters/RecipeFilter/RecipeFilter";

function RecipeListScreen({ navigation }) {
  const recipes: Recipe[] = useAppSelector((state: RootState) => state.recipe.items);
  const [filteredRecipes, setFilteredRecipes] = React.useState(recipes)
  const [value, setValue] = React.useState("");
  const [item, setItem] = React.useState(null);
  const [itemVisible, setItemVisible] = React.useState(false);

  React.useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);

  const hideItem = () => {
    setItemVisible(false);
    setItem(null);
    setValue("");
  };
  const handleAddRecipe = () => {
    navigation.navigate("Recept", {});
  };
  const showItem = (key: Number) => {
    setItemVisible(true);
    setItem(recipes.find((recipe) => recipe.key === key));
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
        <RecipeFilter recipes={recipes} setFilteredRecipes={setFilteredRecipes}/>
      </View>
      <RecipeList items={filteredRecipes} setSelectedItem={showItem}/>
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
