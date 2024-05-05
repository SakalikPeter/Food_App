import React from "react";
import { View, StyleSheet } from "react-native";
import FoodCard from "./FoodCard";

const FoodCardList = ({ items, updateItem }) => {
  return (
    <View>
      {items.map((item) => (
        <FoodCard key={item.value} item={item} updateItem={updateItem} />
      ))}
    </View>
  );
};

export default FoodCardList;
