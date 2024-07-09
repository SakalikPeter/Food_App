import { Food } from "./Food";
import { Recipe } from "./Recipe";

export class SelectedItem {
    key: Number;
    quantity: Number
  
    constructor(key: Number, quantity: Number) {
      this.key = key;
      this.quantity = quantity;
    }

    getFood(foods: Food[]): Food | undefined {
      return foods.find((food) => food.key === this.key);
    }
  
    getRecipe(recipes: Recipe[]): Recipe | undefined {
      return recipes.find((recipe) => recipe.key === this.key);
    }
}