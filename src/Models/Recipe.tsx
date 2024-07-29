import { SelectedItem } from "./SelectedItem";

export interface RecipeParams {
  key: number;
  value: string;
  portions: number;
  instruction: string;
  foods: SelectedItem[];
  tags: string[];
}

export class Recipe {
  key: number;
  value: string;
  portions: number;
  instruction: string;
  foods: SelectedItem[];
  tags: string[];

  constructor(params?: Partial<RecipeParams>) {
    this.key = params?.key ?? -1;
    this.value = params?.value ?? "";
    this.portions = params?.portions ?? 0;
    this.instruction = params?.instruction ?? "";
    this.foods = params?.foods ?? [];
    this.tags = params?.tags ?? [];
  }


  public toPlainObject() {
    return {
      key: this.key,
      value: this.value,
      portions: this.portions,
      instruction: this.instruction,
      foods: this.foods.map(food => Object.assign(new SelectedItem(food.key, food.quantity), food).toPlainObject()),
      tags: this.tags,
    };
  }

  public isValid(): boolean {
    if (this.value == "") return false;
    if (this.portions < 0) return false;
    // if (this.foods.some((food) => food.quantity < 0)) return false;
    return true;
  }
}
