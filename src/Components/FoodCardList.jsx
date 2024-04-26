import React from "react";
import { View, StyleSheet } from "react-native";
import FoodCard from "./FoodCard";

const FoodCardList = ({ items, updateItem }) => {
  return (
    <View>
      {items.map((item) => (
        <FoodCard key={item.key} item={item} updateItem={updateItem} />
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
