export class RecipeFood {
  value: string;
  quantity: number;
  unit: string;

  constructor(value: string, quantity: number, unit: string) {
    this.value = value;
    this.quantity = quantity;
    this.unit = unit;
  }
}
