import { RecipeNutritions } from "./RecipeNutritions";
import { SelectedItem } from "./SelectedItem";

export class Menu {
  date: string;
  foods?: SelectedItem[];
  recipes?: SelectedItem[];
  nutritions: RecipeNutritions;

  constructor(
    date: string,
    foods?: SelectedItem[],
    recipes?: SelectedItem[],
    nutritions?: RecipeNutritions
  ) {
    this.date = date;
    this.foods = foods ?? [];
    this.recipes = recipes ?? [];
    this.nutritions = nutritions ?? new RecipeNutritions();
  }
}
