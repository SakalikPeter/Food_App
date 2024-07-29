import React from "react";
import { Text, View, Modal, Pressable, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import { removeFood } from "../../../../store/redux/food";
import styles from "./Modal.Food.styles";
import { removeFoodFromMenu } from "../../../../store/redux/menu";
import { removeFoodFromRecipe } from "../../../../store/redux/recipe";

const ModalFood = ({ food, hideFood, navigation }) => {
  const dispatch = useDispatch();

  const handleUpdateFood = () => {
    hideFood();
    navigation.navigate("Potravina", { item: food });
  };
  const handleRemoveFood = () => {
    Alert.alert(
      "Potravina bude vymazana",
      `Nazov: ${food.value}\nKategoria: ${food.category}\nJednotka: ${food.unit}`,
      [
        {
          text: "Zrusit",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            dispatch(removeFoodFromMenu(food.key));
            dispatch(removeFoodFromRecipe(food.key));
            dispatch(removeFood(food));
            hideFood();
          },
        },
      ]
    );
  };

  return (
    <Modal animationType="slide" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          
          <View style={styles.closeButtonView}>
            <Pressable style={styles.buttonTopClose} onPress={() => hideFood()}>
              <Icon name="close" />
            </Pressable>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.foodName}>{food.value}</Text>
            <Text style={styles.foodCategory}>Kategoria: {food.category}</Text>
            <Text style={styles.foodQuantity}>{`(${food.base} ${food.unit} )`}</Text>
          </View>

          <View>
            <Text style={styles.modalText}>KJ: {food.kj}</Text>
            <Text style={styles.modalText}>Kcal: {food.kcal}</Text>
            <Text style={styles.modalText}>Proteiny: {food.protein} g</Text>
            <Text style={styles.modalText}>Sacharidy: {food.carbs} g</Text>
            <Text style={styles.modalText}>Tuky: {food.fat} g</Text>
          </View>

          <View style={styles.buttonBottomContainer}>
            <View style={styles.buttonBottomItem}>
              <Pressable
                style={styles.buttonBottomDelete}
                onPress={() => handleRemoveFood()}
              >
                <Icon name="delete" />
              </Pressable>
            </View>

            <View>
              <Pressable
                style={styles.buttonBottomUpdate}
                onPress={() => handleUpdateFood()}
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

export default ModalFood;
