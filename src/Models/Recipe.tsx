import { RecipeNutritions } from "./RecipeNutritions";
import { Food } from "./Food";
import { SelectedItem } from "./SelectedItem";

export interface RecipeParams {
  key: number;
  value: string;
  portions: number;
  instruction: string;
  foods: Partial<SelectedItem[]>;
  tags: string[];
  nutritions: Partial<RecipeNutritions>;
}

export class Recipe {
  key: number;
  value: string;
  portions: number;
  instruction: string;
  foods: SelectedItem[];
  tags: string[];
  nutritions: RecipeNutritions;

  constructor(params?: Partial<RecipeParams>) {
    this.key = params?.key ?? -1;
    this.value = params?.value ?? "";
    this.portions = params?.portions ?? 0;
    this.instruction = params?.instruction ?? "";
    this.foods = params?.foods ?? [];
    this.tags = params?.tags ?? [];
    this.nutritions = new RecipeNutritions(params?.nutritions);
  }

  toParams(): RecipeParams {
    return {
      key: this.key,
      value: this.value,
      portions: this.portions,
      instruction: this.instruction,
      foods: this.foods,
      tags: this.tags,
      nutritions: this.nutritions.toPlainObject(),
    };
  }

  public isValid(): boolean {
    if (this.value == "") return false;
    if (this.portions < 0) return false;
    if (this.foods.some((food) => food.quantity < 0)) return false;
    return true;
  }

  public calculateNutritions(foods: Food[]): void {
    this.nutritions.clearValues();

    if (this.foods.length == 0) {
      this.nutritions.kj = 0
      this.nutritions.kcal = 0
      this.nutritions.protein = 0
      this.nutritions.carbs = 0
      this.nutritions.fat = 0
    }

    this.foods.forEach((recipeFood) => {
      const foodItem = foods.find(
        (food) => food.key === recipeFood.key
      );
      if (foodItem) {
        this.nutritions.kj += (foodItem.kj / foodItem.base) * recipeFood.quantity;
        this.nutritions.kcal +=
          (foodItem.kcal / foodItem.base) * recipeFood.quantity;
        this.nutritions.protein +=
          (foodItem.protein / foodItem.base) * recipeFood.quantity;
        this.nutritions.carbs +=
          (foodItem.carbs / foodItem.base) * recipeFood.quantity;
        this.nutritions.fat +=
          (foodItem.fat / foodItem.base) * recipeFood.quantity;
      }
    });
  }
}
