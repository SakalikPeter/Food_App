import { Food } from "./Food";

export class FoodFilterCls {
  value: string;
  category: string;

  constructor() {
    this.value = "";
    this.category = "";
  }

  setValue(value: string) {
    this.value = value.toLowerCase();
  }

  setCategory(category: string) {
    this.category = category
  }

  filterFoods(foods: Food[]): Food[] {
    return foods.filter((food) => {
      const foodCategory = food.category;
      const filterValue = food.value.toLowerCase();

      // Filter conditions
      const matchesCategory = !this.category || foodCategory === this.category;
      const matchesValue = !this.value || filterValue.includes(this.value);

      return matchesCategory && matchesValue;
    });
  }
}
