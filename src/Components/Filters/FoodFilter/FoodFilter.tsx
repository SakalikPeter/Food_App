import React, { useState } from "react";
import { View } from "react-native";
import SingleSelector from "../../SingleSelector";
import { FoodFilterCls, FoodFilterParams } from "../../../Models/FoodFilter";
import BaseSearchBar from "../../SearchBars/BaseSearchBar/BaseSearchBar";
import { Food } from "../../../Models/Food";

interface FoodFilterProps {
  foods: Food[]; // Adjust type as per your actual data structure
  setFilteredFoods: React.Dispatch<React.SetStateAction<Food[]>>;
}

const FoodFilter: React.FC<FoodFilterProps> = ({ foods, setFilteredFoods }) => {
  const [foodFilter, setFoodFilter] = useState<FoodFilterCls>(new FoodFilterCls());

  const handleInputChange = (field: keyof FoodFilterParams, value: string) => {
    if (field === "category") {
      foodFilter.setCategory(value);
    } else if (field === "unit") {
      foodFilter.setUnit(value);
    }
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
      {/* <BaseSearchBar value={foodFilter.value} setValue={handleSearchChange} /> */}
      <SingleSelector
        itemKey="category"
        defValue={null}
        setItem={handleInputChange}
        label="Kategoria"
        notFoundText="Ziadna kategoria sa nenasla"
      />
    </View>
  );
};

export default FoodFilter;
