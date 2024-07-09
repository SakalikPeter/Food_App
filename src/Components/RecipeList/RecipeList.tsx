import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  VirtualizedList,
} from "react-native";
import { Recipe } from "../../Models/Recipe";
import { Chip, Divider } from "react-native-elements";
import { Food } from "../../Models/Food";
import { RootState } from "../../../store/redux/store";
import { useAppSelector } from "../../../store/redux/hooks";
import styles from "./RecipeList.style";

type Props = {
  items?: Recipe[];
  setSelectedItem: (key: number) => void;
};

const foodMark = (foods: Food[], food) => {
  const f = foods.find((foodItem) => foodItem.key === food.key)
  return f.value + " (" + f.category + ")"
}

const RecipeList: React.FC<Props> = ({ items = [], setSelectedItem }) => {
  const numColumns = 1;
  const foods: Food[] = useAppSelector((state: RootState) => state.food.items);

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
            <Divider subHeader="Tagy" style={styles.divider}/>
            <View style={styles.chipsContainer}>
            {recipe.tags.map((tag) =>
              <Chip key={tag} title={tag} containerStyle={styles.chip} />)
            }
          </View>
          <Divider subHeader="Potraviny" style={styles.divider}/>
          <View style={styles.chipsContainer}>
            {recipe.foods.map((food) =>
              <Chip key={food.key.toString()} title={foodMark(foods, food)} containerStyle={styles.chip} />)
            }
          </View>
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

