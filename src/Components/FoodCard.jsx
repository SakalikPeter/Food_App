import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card, Input } from "react-native-elements";
import { checkNumberInput } from "./Checker";

const FoodCard = ({item, setCard}) => {
  const setValid = (key, newValue) => {
    // item = {...item, valid: newValue}
    // setCard(item)
  }
  const setValue = (key, newValue) => {
    item = {...item, quantity: newValue}
    setCard(item)
  }

  return (
    <View>
      <Card key={item.value}>
        <Card.Title>{item.value}</Card.Title>
        <Card.Divider />
        {/* <View style={styles.user}>
          <Text style={styles.name}>Kategoria: {item.category}</Text>
        </View>
        <View>
          <Text style={styles.name}>Jednotka: {item.unit}</Text>
        </View> */}
        <View>
          <Input
            label="Mnozstvo"
            defaultValue={String(item.quantity)}
            onChangeText={(value) => setValue("food", value)}
            errorMessage={checkNumberInput(item.quantity)}
            keyboardType="numeric"
          />
        </View>
      </Card>
    </View>
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
