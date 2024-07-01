import { Food } from "./Food";

export interface RecipeFilterParams {
  category: string;
  unit: string;
}

export class RecipeFilterCls {
  value: string;
  category: string;
  unit: string;

  constructor() {
    this.value = "";
    this.category = "";
    this.unit = "";
  }

  setValue(value: string) {
    this.value = value.toLowerCase();
  }

  setCategory(category: string) {
    this.category = category.toLowerCase();
  }
}
