import { SelectedItem } from "./SelectedItem";

export class Menu {
  date: string;
  foods?: SelectedItem[];
  recipes?: SelectedItem[];

  constructor(
    date: string,
    foods?: SelectedItem[],
    recipes?: SelectedItem[],
  ) {
    this.date = date;
    this.foods = foods ?? [];
    this.recipes = recipes ?? [];
  }
}
