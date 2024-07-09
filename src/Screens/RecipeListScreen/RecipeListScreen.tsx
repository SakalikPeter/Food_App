import React from "react";
import { Pressable, View } from "react-native";
import { Icon } from "react-native-elements";
import { useAppSelector } from "../../../store/redux/hooks";
import { RootState } from "../../../store/redux/store";
import { Recipe } from "../../Models/Recipe";
import ListRecipe from "../../Components/List/List.Recipe/List.Recipe";
import FilterRecipe from "../../Components/Filter/Filter.Recipe/Filter.Recipe";
import ModalRecipe from "../../Components/Modal/Modal.Recipe/Modal.Recipe";
import styles from "./RecipeListScreen.styles";


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
          <ModalRecipe
            recipe={item}
            hideRecipe={hideItem}
            navigation={navigation}
          />
        )}
      </View>
      <View>
        <FilterRecipe recipes={recipes} setFilteredRecipes={setFilteredRecipes}/>
      </View>
      <ListRecipe items={filteredRecipes} setSelectedItem={showItem}/>
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

export default RecipeListScreen;
