import { Food } from "./Food";

export interface FoodFilterParams {
  category: string;
  unit: string;
}

export class FoodFilterCls {
  value: string;
  category: string;
  unit: string;

  constructor() {
    this.value = "";
    this.category = "";
    this.unit = "";
  }

  setValue(value: string) {
    this.value = value.toLowerCase(); // Update instance property directly
  }

  setCategory(category: string) {
    this.category = category.toLowerCase();
  }

  setUnit(unit: string) {
    this.unit = unit.toLowerCase();
  }

  filterFoods(foods: Food[]): Food[] {
    return foods.filter((food) => {
      const foodCategory = food.category.toLowerCase();
      const foodUnit = food.unit.toLowerCase();
      const filterValue = this.value.toLowerCase();

      // Filter conditions
      const matchesCategory = !this.category || foodCategory === this.category;
      const matchesUnit = !this.unit || foodUnit === this.unit;
      const matchesValue = !this.value || food.value.toLowerCase().includes(filterValue);

      return matchesCategory && matchesUnit && matchesValue;
    });
  }
}
