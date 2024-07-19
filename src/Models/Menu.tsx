import { Food } from "./Food";
import { Recipe } from "./Recipe";
import { RecipeNutritions } from "./RecipeNutritions";
import { SelectedItem } from "./SelectedItem";

export class Menu {
  date: string;
  foods?: SelectedItem[];
  recipes?: SelectedItem[];
  nutritions: RecipeNutritions;

  constructor(date: string, foods?: SelectedItem[], recipes?: SelectedItem[], nutritions?: RecipeNutritions) {
    this.date = date;
    this.foods = foods ?? [];
    this.recipes = recipes ?? [];
    this.nutritions = nutritions ?? new RecipeNutritions();
  }

  public getFoodKeys(): number[] {
    if (!this.foods) return [];
    return this.foods.map((f) => f.key);
  }

  public calculateRecipeNutritions(recipes: Recipe[], foods: Food[]): void {
    this.nutritions.clearValues();

    // Calculate nutritions from recipes
    if (this.recipes) {
      this.recipes.forEach((menuRecipe) => {
        const recipe = recipes.find((r) => r.key === menuRecipe.key);

        if (recipe) {
          const factor = menuRecipe.quantity / recipe.portions;
          this.nutritions.kj += recipe.nutritions.kj * factor;
          this.nutritions.kcal += recipe.nutritions.kcal * factor;
          this.nutritions.protein += recipe.nutritions.protein * factor;
          this.nutritions.carbs += recipe.nutritions.carbs * factor;
          this.nutritions.fat += recipe.nutritions.fat * factor;
        }
      });
    }

    // Calculate nutritions from individual foods
    if (this.foods) {
      this.foods.forEach((menuFood) => {
        const food = foods.find((f) => f.key === menuFood.key);

        if (food) {
          const factor = menuFood.quantity / food.base;
          this.nutritions.kj += food.kj * factor;
          this.nutritions.kcal += food.kcal * factor;
          this.nutritions.protein += food.protein * factor;
          this.nutritions.carbs += food.carbs * factor;
          this.nutritions.fat += food.fat * factor;
        }
      });
    }

    // Round off the values
    this.nutritions.kj = Math.round(this.nutritions.kj * 100) / 100;
    this.nutritions.kcal = Math.round(this.nutritions.kcal * 100) / 100;
    this.nutritions.protein = Math.round(this.nutritions.protein * 100) / 100;
    this.nutritions.carbs = Math.round(this.nutritions.carbs * 100) / 100;
    this.nutritions.fat = Math.round(this.nutritions.fat * 100) / 100;
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
