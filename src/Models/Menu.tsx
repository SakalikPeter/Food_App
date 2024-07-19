import { Food } from "./Food";
import { Recipe } from "./Recipe";
import { SelectedItem } from "./SelectedItem";

export class Menu {
  date: string;
  foods?: SelectedItem[];
  recipes?: SelectedItem[];

  constructor(
    date: string,
    foods?: SelectedItem[],
    recipes?: SelectedItem[],
  ) {
    this.date = date;
    this.foods = foods ?? [];
    this.recipes = recipes ?? [];
  }

  toPlainObject() {
    return {
      date: this.date,
      foods: this.foods?.map(food => food.toPlainObject()) ?? [],
      recipes: this.recipes?.map(recipe => recipe.toPlainObject()) ?? [],
    };
  }

  public getFoodsQuantity(foods: Food[], recipes: Recipe[]): any[] {
    const foodMap = new Map<number, any>();

    // Process individual foods in the menu
    if (this.foods) {
      this.foods.forEach((menuFood) => {
        const foodItem = foods.find((food) => food.key === menuFood.key);
        if (foodItem) {
          const quantity = menuFood.quantity;
          if (foodMap.has(foodItem.key)) {
            foodMap.get(foodItem.key).quantity += quantity;
          } else {
            foodMap.set(foodItem.key, { ...menuFood, foodItem });
          }
        }
      });
    }

    // Process foods from recipes in the menu
    if (this.recipes) {
      this.recipes.forEach((menuRecipe) => {
        const recipeItem = recipes.find((recipe) => recipe.key === menuRecipe.key);
        if (recipeItem) {
          recipeItem.foods.forEach((recipeFood) => {
            const foodItem = foods.find((food) => food.key === recipeFood.key);
            if (foodItem) {
              const quantity = (recipeFood.quantity / recipeItem.portions) * menuRecipe.quantity;
              if (foodMap.has(foodItem.key)) {
                foodMap.get(foodItem.key).quantity += quantity;
              } else {
                foodMap.set(foodItem.key, { key: foodItem.key, quantity, foodItem });
              }
            }
          });
        }
      });
    }

    return Array.from(foodMap.values());
  }
}
