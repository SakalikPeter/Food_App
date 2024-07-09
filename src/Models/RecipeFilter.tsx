import { Recipe } from "./Recipe";

export class RecipeFilterCls {
  value: string;
  tags: string[];
  foods: number[];

  constructor() {
    this.value = "";
    this.tags = [];
    this.foods = [];
  }

  setValue(value: string) {
    this.value = value.toLowerCase();
  }

  setTags(tags: string[]) {
    this.tags = tags;
  }

  setFoods(foods: number[]) {
    this.foods = foods;
  }

  filterRecipes(recipes: Recipe[]): Recipe[] {
    return recipes.filter(recipe => {
      console.log(this.value, recipe.value)
      // Filter by value (search text)
      const matchesValue = this.value === "" || recipe.value.toLowerCase().includes(this.value);

      // if (!matchesValue) return false

      // Filter by tags
      const matchesTags = this.tags.length === 0 || this.tags.some(tag => recipe.tags.includes(tag));

      // if (!matchesTags) return false

      // Filter by foods
      const matchesFoods = this.foods.length === 0 || recipe.foods.some(food => this.foods.includes(food.key));

      // if (!matchesFoods) return false

      return matchesValue && matchesTags && matchesFoods;
    });
  }
}
