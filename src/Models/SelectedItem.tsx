import { Food } from "./Food";
import { Recipe } from "./Recipe";

export class SelectedItem {
    key: number;
    quantity: number
  
    constructor(key: number, quantity: number) {
      this.key = key;
      this.quantity = quantity;
    }

    getFood(foods: Food[]): Food | undefined {
      return foods.find((food) => food.key === this.key);
    }
  
    getRecipe(recipes: Recipe[]): Recipe | undefined {
      return recipes.find((recipe) => recipe.key === this.key);
    }

    toPlainObject() {
      return {
        key: this.key,
        quantity: this.quantity,
      };
    }
}