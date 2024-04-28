import React from "react";
import { View, StyleSheet } from "react-native";
import FoodCard from "./FoodCard";

const FoodCardList = ({ items, updateItem }) => {
  React.useEffect(() => {
    console.log("List: ", items);
  }, []);

  return (
    <View>
      {items.map((item) => (
        <FoodCard key={item} item={item} updateItem={updateItem} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FoodCardList;
