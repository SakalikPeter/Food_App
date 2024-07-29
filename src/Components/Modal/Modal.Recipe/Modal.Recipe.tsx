import React from "react";
import { Text, View, Modal, Pressable, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import { removeRecipe } from "../../../../store/redux/recipe";
import { useAppSelector } from "../../../../store/redux/hooks";
import styles from "./Modal.Recipe.styles";
import { removeRecipeFromMenu } from "../../../../store/redux/menu";

const ModalRecipe = ({ recipe, hideRecipe, navigation }) => {
  const dispatch = useDispatch();
  const foods = useAppSelector((state) => state.food.items);

  // Find the matching food items from the state
  const matchedFoods = recipe.foods.map((recipeFood) => {
    return foods.find((food) => food.key === recipeFood.key);
  });

  const handleUpdateRecipe = () => {
    hideRecipe();
    navigation.navigate("Recept", { item: recipe });
  };

  const handleRemoveRecipe = () => {
    Alert.alert("Recept bude vymazany", `Nazov: ${recipe.value}`, [
      {
        text: "Zrusit",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          dispatch(removeRecipeFromMenu(recipe.key));
          dispatch(removeRecipe(recipe.key));
          hideRecipe();
        },
      },
    ]);
  };

  return (
      <Modal animationType="slide" transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.closeButtonView}>
              <Pressable
                style={styles.buttonTopClose}
                onPress={() => hideRecipe()}
              >
                <Icon name="close" />
              </Pressable>
            </View>

            <View style={styles.titleContainer}>
              <Text style={styles.recipeName}>{recipe.value}</Text>
              <Text style={styles.recipeInfo}>
                Pocet porcii: {recipe.portions}
              </Text>
            </View>

            <View>
              <Text style={styles.modalText}>Tagy:</Text>
              <View style={styles.tagsContainer}>
                {recipe.tags.map((tag, index) => (
                  <Text key={index} style={styles.tag}>
                    {tag}
                  </Text>
                ))}
              </View>
            </View>
            <View>
              <Text style={styles.modalText}>Potraviny:</Text>
              <View style={styles.foodsContainer}>
                {matchedFoods.map((food, index) => (
                  <Text key={index} style={styles.food}>
                    {food
                      ? `${food.value} - ${recipe.foods[index].quantity} ${food.unit}`
                      : "Unknown Food"}
                  </Text>
                ))}
              </View>
            </View>

            <View style={styles.buttonBottomContainer}>
              <View style={styles.buttonBottomItem}>
                <Pressable
                  style={styles.buttonBottomDelete}
                  onPress={() => handleRemoveRecipe()}
                >
                  <Icon name="delete" />
                </Pressable>
              </View>

              <View>
                <Pressable
                  style={styles.buttonBottomUpdate}
                  onPress={() => handleUpdateRecipe()}
                >
                  <Icon name="edit" />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
  );
};

export default ModalRecipe;
