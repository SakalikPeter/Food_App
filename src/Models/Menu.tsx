import { Food } from "./Food";
import { Recipe } from "./Recipe";
import { RecipeNutritions } from "./RecipeNutritions";

export class SelectedItems {
  key: number;
  quantity: number

  constructor(key: number, quantity: number) {
    this.key = key;
    this.quantity = quantity
  }
}

export class Menu {
  date: string;
  foods?: SelectedItems[];
  recipes?: SelectedItems[];
  nutritions: RecipeNutritions;

  constructor(date: string, foods?, recipes?) {
    this.date = date;
    this.foods = foods ?? [];
    this.recipes = recipes ?? [];
    this.nutritions = new RecipeNutritions();
  }

  public getFoodKeys(): number[] {
    console.log(this.foods)
    if (this.foods == undefined) return []
    return this.foods.map((f) => f.key)
  }

  calculatRecipeNutritions(recipes: Recipe[], foods: Food[]): void {
    this.nutritions.clearValues();

    // recipes
    this.recipes.forEach((menuRecipe) => {
      
      const recipe = recipes.find((recipe) => recipe.key == menuRecipe.key)

      if (recipe) {
        this.nutritions.kj += recipe.nutritions.kj / recipe.portions * menuRecipe.quantity
        this.nutritions.kcal += recipe.nutritions.kcal / recipe.portions * menuRecipe.quantity
        this.nutritions.protein += recipe.nutritions.protein / recipe.portions * menuRecipe.quantity
        this.nutritions.carbs += recipe.nutritions.carbs / recipe.portions * menuRecipe.quantity
        this.nutritions.fat += recipe.nutritions.fat / recipe.portions * menuRecipe.quantity
      }

    })

    // foods
    this.foods.forEach((menuFood) =>{

      const food = foods.find((food) => food.key == menuFood.key)

      if(food) {
        this.nutritions.kj += food.kj / food.base * menuFood.quantity
        this.nutritions.kcal += food.kcal / food.base * menuFood.quantity
        this.nutritions.protein += food.protein / food.base * menuFood.quantity
        this.nutritions.carbs += food.carbs / food.base * menuFood.quantity
        this.nutritions.fat += food.fat / food.base * menuFood.quantity
      }
    })

    this.nutritions.kj = Math.round(this.nutritions.kj * 100) /100
    this.nutritions.kcal = Math.round(this.nutritions.kcal * 100) /100
    this.nutritions.protein = Math.round(this.nutritions.protein * 100) /100
    this.nutritions.carbs = Math.round(this.nutritions.carbs * 100) /100
    this.nutritions.fat = Math.round(this.nutritions.fat * 100) /100
  }
}
