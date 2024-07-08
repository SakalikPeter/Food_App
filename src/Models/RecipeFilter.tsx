import { Recipe } from "./Recipe";

export class RecipeFilterCls {
  value: string;
  tags: string;
  foods: Number[];

  constructor() {
    this.value = "";
    this.tags = "";
    this.foods = [];
  }

  setValue(value: string) {
    this.value = value.toLowerCase();
  }

  setTags(tags: string) {
    this.tags = tags;
  }

  setFoods(foods: Number[]) {
    this.foods = foods;
  }

  filterRecipes(recipes: Recipe[]): Recipe[] {
    return recipes
  }
}
