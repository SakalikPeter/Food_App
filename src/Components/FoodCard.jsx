import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card, Input } from "react-native-elements";

const FoodCard = (props) => {
  const [item, setItem] = React.useState(props.item);

  React.useEffect(() => {
    setItem({ ...item, inputValue: "0" });
  }, []);

  function handleInputChange(value) {
    const updatedItem = { ...item, inputValue: value };
    setItem(updatedItem);
    props.updateItem(updatedItem);
  }

  return (
    <Card key={item.key}>
      <Card.Title>{item.value}</Card.Title>
      <Card.Divider />
      <View style={styles.user}>
        <Text style={styles.name}>Kategoria: {item.category}</Text>
      </View>
      <View>
        <Text style={styles.name}>Jednotka: {item.unit}</Text>
      </View>
      <View>
        <Input
          placeholder="Mnozstvo"
          onChangeText={(value) => handleInputChange(value)}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: "row",
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default FoodCard;
