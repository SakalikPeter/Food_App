import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { ListItem } from "react-native-elements";

const ValueList = ({ items, updateItem, removeItem }) => {
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
        onPress={() => removeItem(item.key)}
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
