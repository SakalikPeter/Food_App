export interface RecipeNutritionsParams {
  kj: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

export class RecipeNutritions {
  kj: number;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;

  constructor(params?: Partial<RecipeNutritions>) {
    this.carbs = params?.carbs ?? 0;
    this.fat = params?.fat ?? 0;
    this.kcal = params?.kcal ?? 0;
    this.kj = params?.kj ?? 0;
    this.protein = params?.protein ?? 0;
  }

  toPlainObject() {
    return {
      carbs: this.carbs,
      fat: this.fat,
      kcal: this.kcal,
      kj: this.kj,
      protein: this.protein,
    };
  }

  public clearValues(): void {
    this.kj = 0;
    this.kcal = 0;
    this.protein = 0;
    this.carbs = 0;
    this.fat = 0;
  }
}
