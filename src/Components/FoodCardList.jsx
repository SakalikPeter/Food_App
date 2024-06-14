import React from "react";
import { View, StyleSheet } from "react-native";
import FoodCard from "./FoodCard";

const FoodCardList = ({ items, setRecipeFood }) => {

  const setCard = (item) => {
    objIndex = items.findIndex(obj => obj.value == item.value);
    items[objIndex] = item
    setRecipeFood(items)
    // setItem("food", value)
  }

  return (
    <View>
      {items.map((item) => (
        <FoodCard key={item.value} item={item} setCard={setCard} />
      ))}
    </View>
  );
};

export default FoodCardList;
