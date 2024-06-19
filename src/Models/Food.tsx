// Food.ts

export interface FoodParams {
  key: number;
  value: string;
  category: string;
  unit: string;
  base: number;
  kj: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

export class Food {
  key: number;
  value: string;
  category: string;
  unit: string;
  base: number;
  kj: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;

  public constructor(params?: FoodParams) {
    this.key = params?.key ?? -1;
    this.value = params?.value ?? "";
    this.category = params?.category ?? "";
    this.unit = params?.unit ?? "";
    this.base = params?.base ?? 0;
    this.kj = params?.kj ?? 0;
    this.kcal = params?.kcal ?? 0;
    this.protein = params?.protein ?? 0;
    this.carbs = params?.carbs ?? 0;
    this.fat = params?.fat ?? 0;
  }

  toParams(): FoodParams {
    return {
      key: this.key,
      value: this.value,
      category: this.category,
      unit: this.unit,
      base: this.base,
      kj: this.kj,
      kcal: this.kcal,
      protein: this.protein,
      carbs: this.carbs,
      fat: this.fat,
    };
  }

  public isValid(): boolean {
    if (this.value == "") return false;
    // else if (this.category == "") return false;
    // else if (this.unit == "") return false;
    else if (this.base < 0) return false;
    else if (this.kj < 0) return false;
    else if (this.kcal < 0) return false;
    else if (this.protein < 0) return false;
    else if (this.carbs < 0) return false;
    else if (this.fat < 0) return false;
    else return true;
  }
}
