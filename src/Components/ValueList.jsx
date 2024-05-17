import React from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <View style={styles.item}>
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, { backgroundColor, textColor }]}
    >
      <Text style={styles.title}>{item.value}</Text>
      <Text>{item.category}</Text>
      <Text>{item.unit + item.base}</Text>
    </TouchableOpacity>
  </View>
);

const ValueList = ({ items, updateItem, removeItem }) => {
  const [selectedId, setSelectedId] = React.useState();

  const renderItem = ({ item }) => {
    const backgroundColor = item.key === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.key === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => updateItem(item)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };
  return (
    <FlatList
      keyExtractor={(user) => user.key.toString()}
      data={items}
      renderItem={renderItem}
    />
  );
};

export default ValueList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
