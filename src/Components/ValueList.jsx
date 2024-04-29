import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { deleteItemByValue } from "./DataHandler";

const ValueList = ({ items, filename, navigation }) => {
  const updateItem = (item) => {
    navigation.navigate("Pridaj Potravinu", { item: item });
  };
  const deleteItem = async (value) => {
    const deleted = await deleteItemByValue(filename, value);
  };

  const getUserItem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.value}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron
        name="edit"
        size={25}
        color="orange"
        onPress={() => updateItem(item)}
      />
      <ListItem.Chevron
        name="delete"
        size={25}
        color="red"
        onPress={() => deleteItem(item.value)}
      />
    </ListItem>
  );

  return (
    <FlatList
      keyExtractor={(user) => user.key.toString()}
      data={items}
      renderItem={getUserItem}
    />
  );
};

export default ValueList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
  },
});
