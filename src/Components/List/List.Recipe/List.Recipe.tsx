import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  VirtualizedList,
} from "react-native";
import { Chip, Divider } from "react-native-elements";
import { useAppSelector } from "../../../../store/redux/hooks";
import { RootState } from "../../../../store/redux/store";
import { Recipe } from "../../../Models/Recipe";
import { Food } from "../../../Models/Food";
import styles from "./List.Recipe.styles";
import { SelectedItem } from "../../../Models/SelectedItem";
import ChipBase from "../../Chip/Chip.Base/Chip.Base";

type Props = {
  items?: Recipe[];
  setSelectedItem: (key: number) => void;
};

const foodMark = (foods: Food[], food: SelectedItem) => {
  const foundFood = foods.find((foodItem) => foodItem.key === food.key);
  return foundFood ? `${foundFood.value} (${foundFood.category})` : "";
};

const ListRecipe: React.FC<Props> = ({ items = [], setSelectedItem }) => {
  const numColumns = 1;
  const foods = useAppSelector((state: RootState) => state.food.items);

  const getItem = (data: Recipe[], index: number) => {
    const startIndex = index * numColumns;
    return data.slice(startIndex, startIndex + numColumns);
  };

  const getItemCount = (data: Recipe[]) => Math.ceil(data.length / numColumns);

  const renderItem = ({ item }: { item: Recipe[] }) => (
    <View style={styles.row}>
      {item.map((recipe, i) => (
        <View key={i} style={styles.foodContainer}>
          <TouchableOpacity onPress={() => setSelectedItem(Number(recipe.key))}>
            <Text style={styles.foodName}>{recipe.value}</Text>
          </TouchableOpacity>
          <Divider subHeader="Tagy" style={styles.divider} />
          <View style={styles.chipsContainer}>
            {recipe.tags.map((tag) => (
              <Chip key={tag} title={tag} containerStyle={styles.chip} />
            ))}
          </View>
          <Divider subHeader="Potraviny" style={styles.divider} />
          <View style={styles.chipsContainer}>
            <View>
              <ChipBase items={recipe.foods.map((food) => ({ key: food.key.toString(), value: foodMark(foods, food) }))} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );

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

export default ListRecipe;
