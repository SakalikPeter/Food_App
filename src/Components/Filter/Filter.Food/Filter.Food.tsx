import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { FoodFilterCls } from "../../../Models/FoodFilter";
import SearchBarBase from "../../SearchBars/SearchBar.Base/SearchBar.Base";
import { Food } from "../../../Models/Food";
import SelectorBase from "../../Selector/Selector.Base/Selector.Base";
import { useAppSelector } from "../../../../store/redux/hooks";
import { RootState } from "../../../../store/redux/store";
import styles from "./Filter.Food.styles";

interface FoodFilterProps {
  foods: Food[];
  setFilteredFoods: React.Dispatch<React.SetStateAction<Food[]>>;
}

const FilterFood: React.FC<FoodFilterProps> = ({ foods, setFilteredFoods }) => {
  const [foodFilter, setFoodFilter] = useState<FoodFilterCls>(
    new FoodFilterCls()
  );
  const categories = useAppSelector((state: RootState) => state.category.items);
  const [showFilters, setShowFilters] = useState(false);

  const handleCategoryChange = (value: string[]) => {
    foodFilter.setCategory(value[0]);
    applyFilters();
  };

  const handleSearchChange = (value: string) => {
    foodFilter.setValue(value);
    applyFilters();
  };

  const applyFilters = () => {
    const filtered = foodFilter.filterFoods(foods);
    setFilteredFoods(filtered);
  };

  return (
    <View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Text style={styles.buttonText}>
            {showFilters ? "Skryt filtre" : "Zobrazit filtre"}
          </Text>
        </Pressable>
      </View>
      {showFilters && (
        <View>
          <SearchBarBase value={foodFilter.value} setter={handleSearchChange} />
          <SelectorBase
            items={categories}
            checkedValue={foodFilter.category? [foodFilter.category] : []}
            setCheckedItems={handleCategoryChange}
            title="Kategoria"
          />
        </View>
      )}
    </View>
  );
};

export default FilterFood;
