import React from "react";
import { Text, View, Modal, Pressable, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import { removeFood } from "../../../../store/redux/food";
import styles from "./FoodItemModal.style";

const FoodItemModal = ({ food, hideFood, navigation }) => {
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
            dispatch(removeFood(food));
            hideFood();
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
                onPress={() => hideFood()}
              >
                <Icon name="close" />
              </Pressable>
            </View>
            <View>
              <Text style={styles.modalText}>Nazov: {food.value}</Text>
              <Text style={styles.modalText}>Kategoria: {food.category}</Text>
              <Text style={styles.modalText}>Jednotka: {food.unit}</Text>
              <Text style={styles.modalText}>Zaklad: {food.base}</Text>
              <Text style={styles.modalText}>KJ: {food.kj}</Text>
              <Text style={styles.modalText}>Kcal: {food.kcal}</Text>
              <Text style={styles.modalText}>Proteiny: {food.protein} g</Text>
              <Text style={styles.modalText}>Sacharidy: {food.carbs} g</Text>
              <Text style={styles.modalText}>Tuky: {food.fat} g</Text>
            </View>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleUpdateFood()}
            >
              <Icon name="edit" />
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleRemoveFood()}
            >
              <Icon name="delete" />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FoodItemModal;


