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

  constructor(date: string, foods?, recipes?) {
    this.date = date;
    this.foods = foods ?? [];
    this.recipes = recipes ?? [];
  }

  public getFoodKeys(): number[] {
    console.log(this.foods)
    if (this.foods == undefined) return []
    return this.foods.map((f) => f.key)
  }

  calculatRecipeNutritions(): void {
    this.recipes.forEach((r) => {
      
    })
  }
}
