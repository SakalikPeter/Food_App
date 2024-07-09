import React from "react";
import { Text, View, Modal, Pressable, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import { removeRecipe } from "../../../../store/redux/recipe";
import { useAppSelector } from "../../../../store/redux/hooks";
import styles from "./Modal.Recipe.styles";

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
    Alert.alert(
      "Recept bude vymazany",
      `Nazov: ${recipe.value}`,
      [
        {
          text: "Zrusit",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            dispatch(removeRecipe(recipe.key));
            hideRecipe();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.closeButtonView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => hideRecipe()}
              >
                <Icon name="close" />
              </Pressable>
            </View>
            <View>
              <Text style={styles.modalText}>Nazov: {recipe.value}</Text>
            </View>
            <View>
              <Text style={styles.modalText}>Pocet porcii: {recipe.portions}</Text>
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
                    {food ? `${food.value} - ${recipe.foods[index].quantity} ${food.unit}` : "Unknown Food"}
                  </Text>
                ))}
              </View>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleUpdateRecipe()}
            >
              <Icon name="edit" />
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleRemoveRecipe()}
            >
              <Icon name="delete" />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalRecipe;