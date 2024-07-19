export class Nutritions {
    kj: number;
    kcal: number;
    protein: number;
    carbs: number;
    fat: number;
  
    constructor(params?: Partial<Nutritions>) {
      this.carbs = params?.carbs ?? 0;
      this.fat = params?.fat ?? 0;
      this.kcal = params?.kcal ?? 0;
      this.kj = params?.kj ?? 0;
      this.protein = params?.protein ?? 0;
    }
}
  