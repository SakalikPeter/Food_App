import React from "react";
import { Text, View, Modal, StyleSheet, Pressable } from "react-native";
import { Icon } from "react-native-elements";

const RecipeItemModal = ({ recipe, hideRecipe, removeRecipe, updateRecipe }) => {

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

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => updateRecipe()}
            >
              <Icon name="edit" />
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => removeRecipe()}
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
  closeButtonView: {
  },
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
});
