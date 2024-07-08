import React, { useState } from "react";
import { View } from "react-native";
import { RecipeFilterCls } from "../../../Models/RecipeFilter";
import BaseSearchBar from "../../SearchBars/BaseSearchBar/BaseSearchBar";
import { Food } from "../../../Models/Food";
import { Recipe } from "../../../Models/Recipe";
import Selector from "../../Selector/SingleSelector/SingleSelector";
import { Tag } from "../../../Models/Tags";
import { useAppSelector } from "../../../../store/redux/hooks";
import { RootState } from "../../../../store/redux/store";

interface RecipeFilterProps {
  recipes: Recipe[];
  setFilteredRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

const RecipeFilter: React.FC<RecipeFilterProps> = ({ recipes, setFilteredRecipes }) => {
  const [recipeFilter, setRecipeFilter] = useState<RecipeFilterCls>(new RecipeFilterCls());
  const tags: Tag[] = useAppSelector((state: RootState) => state.tag.items);
  const foods: Food[] = useAppSelector((state: RootState) => state.food.items);

  const handleTagChange = (value: string[]) => {
    console.log(value)
    recipeFilter.setTags(value[0]);
    applyFilters()
  };

  const handleFoodChange = (value: Number[]) => {
    recipeFilter.setFoods(value);
    applyFilters();
  };

  const handleSearchChange = (value: string) => {
    console.log(value)
    recipeFilter.setValue(value);
    applyFilters();
  };


  const applyFilters = () => {
    console.log("SF: ",recipeFilter.tags)
    const filtered = recipeFilter.filterRecipes(recipes);
    setFilteredRecipes(filtered);
  };

  return (
    <View>
      <BaseSearchBar value={recipeFilter.value} setter={handleSearchChange} />
      {/* <Selector items={foods} checkedValue={recipeFilter.foods} setCheckedItems={handleFoodChange} title="Potraviny" multi={true} />  */}
      <Selector items={tags} checkedValue={[recipeFilter.tags]} setCheckedItems={handleTagChange} title="Tagy" /> 
    </View>
  );
};

export default RecipeFilter;