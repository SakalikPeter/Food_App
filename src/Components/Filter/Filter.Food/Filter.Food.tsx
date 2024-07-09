import React, { useState } from "react";
import { View } from "react-native";
import { FoodFilterCls } from "../../../Models/FoodFilter";
import SearchBarBase from "../../SearchBars/SearchBar.Base/SearchBar.Base";
import { Food } from "../../../Models/Food";
import Selector2 from "../../Selector/Selector.Base/Selector.Base";
import { useAppSelector } from "../../../../store/redux/hooks";
import { RootState } from "../../../../store/redux/store";

interface FoodFilterProps {
  foods: Food[];
  setFilteredFoods: React.Dispatch<React.SetStateAction<Food[]>>;
}

const FilterFood: React.FC<FoodFilterProps> = ({ foods, setFilteredFoods }) => {
  const [foodFilter, setFoodFilter] = useState<FoodFilterCls>(
    new FoodFilterCls()
  );
  const categories = useAppSelector((state: RootState) => state.category.items);

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
      <SearchBarBase value={foodFilter.value} setter={handleSearchChange} />
      <Selector2
        items={categories}
        checkedValue={[foodFilter.category]}
        setCheckedItems={handleCategoryChange}
        title="Kategoria"
      />
    </View>
  );
};

export default FilterFood;
