import React, { useState } from "react";
import { View } from "react-native";
import { RecipeFilterCls } from "../../../Models/RecipeFilter";
import SearchBarBase from "../../SearchBars/SearchBar.Base/SearchBar.Base";
import { Food } from "../../../Models/Food";
import { Recipe } from "../../../Models/Recipe";
import SelectorBase from "../../Selector/Selector.Base/Selector.Base";
import { Tag } from "../../../Models/Tags";
import { useAppSelector } from "../../../../store/redux/hooks";
import { RootState } from "../../../../store/redux/store";
import SelectorInput from "../../Selector/Selector.Input/Selector.Input";
import { SelectedItem } from "../../../Models/SelectedItem";

interface RecipeFilterProps {
  recipes: Recipe[];
  setFilteredRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

const itemSelectorFood = (item) => ({
  key: item.key,
  value: item.value + " (" + item.category + ")",
  unit: item.unit,
});

const FilterRecipe: React.FC<RecipeFilterProps> = ({ recipes, setFilteredRecipes }) => {
  const [recipeFilter, setRecipeFilter] = useState<RecipeFilterCls>(new RecipeFilterCls());
  const tags: Tag[] = useAppSelector((state: RootState) => state.tag.items);
  const foods: Food[] = useAppSelector((state: RootState) => state.food.items);

  React.useEffect(() => {applyFilters()}, [recipeFilter])

  const handleTagChange = (value: string[]) => {
    setRecipeFilter(prevState => {
      const newFilter = new RecipeFilterCls();
      newFilter.setTags(value);
      newFilter.setFoods(prevState.foods);
      newFilter.setValue(prevState.value);
      return newFilter;
    });
  };

  const handleFoodChange = (key: string) => {
    const updatedFoods = toggleItemInArray(recipeFilter.foods, key);
    setRecipeFilter(prevState => {
      const newFilter = new RecipeFilterCls();
      newFilter.setTags(prevState.tags);
      newFilter.setFoods(updatedFoods);
      newFilter.setValue(prevState.value);
      return newFilter;
    });
    applyFilters();
  };

  const handleSearchChange = (value: string) => {
    setRecipeFilter(prevState => {
      const newFilter = new RecipeFilterCls();
      newFilter.setTags(prevState.tags);
      newFilter.setFoods(prevState.foods);
      newFilter.setValue(value);
      return newFilter;
    });
  };

  const applyFilters = () => {
    const filtered = recipeFilter.filterRecipes(recipes);
    setFilteredRecipes(filtered);
  };

  return (
    <View>
      <SearchBarBase value={recipeFilter.value} setter={handleSearchChange} />
      <SelectorInput 
        items={foods.map((f) => itemSelectorFood(f))} 
        checkedItems={recipeFilter.foods.map((f) => new SelectedItem(f, 0))} 
        setCheckedItems={handleFoodChange} 
        title="Potraviny"
        input={false}
      />
      <SelectorBase items={tags} checkedValue={recipeFilter.tags} setCheckedItems={handleTagChange} title="Tagy" multi={true} />

    </View>
  );
};

export default FilterRecipe;

// Helper function to toggle an item in an array
const toggleItemInArray = (array, key) => {
  let updatedArray = array;
  const itemIndex = array.findIndex((item) => item === Number(key));
  if (itemIndex !== -1) {
    updatedArray = array.filter((item) => item !== Number(key));
  } else {
    updatedArray = [...array, Number(key)];
  }
  return updatedArray;
};
