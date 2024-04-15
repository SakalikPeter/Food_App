import React from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";

const LoadList = (props) => {
  const handleUpdate = (item) => {
    props.updater(item);
  };

  const handleDelete = (item) => {
    props.remover(item);
  };

  return (
    <View>
      {props.items.map((item, index) => (
        <Pressable
          key={item.key} // <-- Unique key prop
          style={styles.container}
          onPress={() => handleUpdate(item)}
        >
          <Text style={styles.text}>{item.value}</Text>
          <Text style={styles.text}>{item.category}</Text>
          <Text style={styles.text}>{item.unit}</Text>
          <Button
            type="outline"
            onPress={() => handleDelete(item)}
            icon={<Icon name="delete" color="red" />}
          />
        </Pressable>
      ))}
    </View>
  );
};

export default LoadList;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 3,
    backgroundColor: "#d9f9b1",
    alignItems: "center",
  },
  text: {
    color: "#4f603c",
  },
});
