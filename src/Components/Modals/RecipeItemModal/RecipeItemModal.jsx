import React from "react";
import { Text, View, Modal, StyleSheet, Pressable, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { removeRecipe } from "../../../../store/redux/recipe";
import { useAppSelector } from "../../../../store/redux/hooks";
import { RootState } from "../../../../store/redux/store";

const RecipeItemModal = ({ recipe, hideRecipe, navigation }) => {
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

export default RecipeItemModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButtonView: {},
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  tag: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    padding: 5,
    margin: 5,
    textAlign: "center",
  },
  foodsContainer: {
    marginTop: 15,
  },
  food: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 5,
    marginVertical: 2,
    textAlign: "center",
  },
});
