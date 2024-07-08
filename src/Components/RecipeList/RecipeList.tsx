import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  VirtualizedList,
} from "react-native";
import { Recipe } from "../../Models/Recipe";

type Props = {
  items?: Recipe[];
  setSelectedItem: (key: number) => void;
};

const RecipeList: React.FC<Props> = ({ items = [], setSelectedItem }) => {
  const numColumns = 1;

  const getItem = (data: Recipe[], index: number) => {
    let itemsArray = [];
    for (let i = 0; i < numColumns; i++) {
      const item = data[index * numColumns + i];
      item && itemsArray.push(item);
    }
    return itemsArray;
  };

  const getItemCount = (data: Recipe[]) => Math.ceil(data.length / numColumns);

  const renderItem = ({ item }: { item: Recipe[] }) => {
    return (
      <View style={styles.row}>
        {item.map((recipe, i) => (
          <View key={i} style={styles.foodContainer}>
            <TouchableOpacity onPress={() => setSelectedItem(Number(recipe.key))}>
              <Text style={styles.foodName}>{recipe.value}</Text>
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

export default RecipeList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    padding: 16,
  },
  row: {
    flexDirection: "row",
  },
  foodContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 3,
    margin: 8, // Add margin for spacing between columns
  },
  foodDetails: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  foodCategory: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
    textAlign: "center",
  },
  foodQuantity: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
});
