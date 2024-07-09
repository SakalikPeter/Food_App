import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  VirtualizedList,
} from "react-native";
import { Food } from "../../Models/Food";
import styles from "./FoodList.style";

type Props = {
  items?: Food[];
  setSelectedItem: (key: number) => void;
};

const FoodList: React.FC<Props> = ({ items = [], setSelectedItem }) => {
  const numColumns = 2;

  const getItem = (data: Food[], index: number) => {
    let itemsArray = [];
    for (let i = 0; i < numColumns; i++) {
      const item = data[index * numColumns + i];
      item && itemsArray.push(item);
    }
    return itemsArray;
  };

  const getItemCount = (data: Food[]) => Math.ceil(data.length / numColumns);

  const renderItem = ({ item }: { item: Food[] }) => {
    return (
      <View style={styles.row}>
        {item.map((food, i) => (
          <View key={i} style={styles.foodContainer}>
            <TouchableOpacity onPress={() => setSelectedItem(Number(food.key))}>
              <Text style={styles.foodName}>{food.value}</Text>
              <Text style={styles.foodCategory}>{food.category}</Text>
              <Text style={styles.foodQuantity}>
                {food.base} {food.unit}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <VirtualizedList
        data={items}
        initialNumToRender={10}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
  );
};

export default FoodList;
