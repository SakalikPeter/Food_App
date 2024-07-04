import { Food } from "./Food";
import { Recipe } from "./Recipe";
import { RecipeNutritions } from "./RecipeNutritions";
import { SelectedItem } from "./SelectedItem";

export class Menu {
  date: string;
  foods?: SelectedItem[];
  recipes?: SelectedItem[];
  nutritions: RecipeNutritions;

  constructor(date: string, foods?: SelectedItem[], recipes?: SelectedItem[]) {
    this.date = date;
    this.foods = foods ?? [];
    this.recipes = recipes ?? [];
    this.nutritions = new RecipeNutritions();
  }

  public getFoodKeys(): number[] {
    console.log(this.foods);
    if (this.foods == undefined) return [];
    return this.foods.map((f) => f.key);
  }

  calculateRecipeNutritions(recipes: Recipe[], foods: Food[]): void {
    this.nutritions.clearValues();

    // recipes
    this.recipes.forEach((menuRecipe) => {
      const recipe = recipes.find((recipe) => recipe.key == menuRecipe.key);

      if (recipe) {
        this.nutritions.kj += (recipe.nutritions.kj / recipe.portions) * menuRecipe.quantity;
        this.nutritions.kcal += (recipe.nutritions.kcal / recipe.portions) * menuRecipe.quantity;
        this.nutritions.protein += (recipe.nutritions.protein / recipe.portions) * menuRecipe.quantity;
        this.nutritions.carbs += (recipe.nutritions.carbs / recipe.portions) * menuRecipe.quantity;
        this.nutritions.fat += (recipe.nutritions.fat / recipe.portions) * menuRecipe.quantity;
      }
    });

    // foods
    this.foods.forEach((menuFood) => {
      const food = foods.find((food) => food.key == menuFood.key);

      if (food) {
        this.nutritions.kj += (food.kj / food.base) * menuFood.quantity;
        this.nutritions.kcal += (food.kcal / food.base) * menuFood.quantity;
        this.nutritions.protein += (food.protein / food.base) * menuFood.quantity;
        this.nutritions.carbs += (food.carbs / food.base) * menuFood.quantity;
        this.nutritions.fat += (food.fat / food.base) * menuFood.quantity;
      }
    });

    this.nutritions.kj = Math.round(this.nutritions.kj * 100) / 100;
    this.nutritions.kcal = Math.round(this.nutritions.kcal * 100) / 100;
    this.nutritions.protein = Math.round(this.nutritions.protein * 100) / 100;
    this.nutritions.carbs = Math.round(this.nutritions.carbs * 100) / 100;
    this.nutritions.fat = Math.round(this.nutritions.fat * 100) / 100;
  }

  public getFoodsQuantity(foods: Food[], recipes: Recipe[]): SelectedItem[] {
    const foodMap = new Map<number, any>();

    // Process foods in the menu
    this.foods.forEach((menuFood) => {
      const foodItem = foods.find((food) => food.key === menuFood.key);
      if (foodItem) {
        if (foodMap.has(menuFood.key)) {
          foodMap.get(menuFood.key).quantity += menuFood.quantity;
        } else {
          foodMap.set(menuFood.key, {quantity: menuFood.quantity, foodItem});
        }
      }
    });

    // Process foods in the recipes
    this.recipes.forEach((menuRecipe) => {
      const recipeItem = recipes.find((recipe) => recipe.key === menuRecipe.key);
      if (recipeItem) {
        recipeItem.foods.forEach((recipeFood) => {
          const foodItem = foods.find((food) => food.key === recipeFood.key);
          if (foodItem) {
            if (foodMap.has(recipeFood.key)) {
              foodMap.get(recipeFood.key).quantity += recipeFood.quantity;
            } else {
              foodMap.set(recipeFood.key, {quantity: recipeFood.quantity, foodItem});
            }
          }
        });
      }
    });

    // Convert the map back to a list of SelectedItem
    return Array.from(foodMap.values());
  }
}
