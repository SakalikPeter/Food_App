import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, VirtualizedList } from 'react-native';
import { Food } from '../../../Models/Food';
import styles from './List.Food.styles';

type Props = {
  items?: Food[];
  setSelectedItem: (key: number) => void;
};

const ListFood: React.FC<Props> = ({ items = [], setSelectedItem }) => {
  const numColumns = 2;

  const getItem = (data: Food[], index: number) => {
    return data.slice(index * numColumns, index * numColumns + numColumns);
  };

  const getItemCount = (data: Food[]) => Math.ceil(data.length / numColumns);

  const renderItem = ({ item }: { item: Food[] }) => (
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

  return (
    <SafeAreaView style={styles.container}>
      <VirtualizedList
        data={items}
        initialNumToRender={10}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
  );
};

export default ListFood;
