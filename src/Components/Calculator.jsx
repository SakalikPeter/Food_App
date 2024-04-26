import { loadList } from "../Components/DataHandler";

const calculator = async (recipeFoods) => {
  let foods = [];
  let units = [];
  let totalKcal = 0;
  let totalProtein = 0;
  let totalCarbs = 0;

  try {
    foods = await loadList("food");
    units = await loadList("unit");
  } catch (error) {
    console.error(error);
  }

  recipeFoods.forEach((item) => {
    // find food from catalog
    const food = foods.find((food) => food.key === item.key);
    if (food) {
      const { kcal, protein, carbs } = food;
      // find food's unit
      const unit = units.find((unit) => unit.value === food.unit);

      totalKcal += (kcal / unit.base) * item.amount;
      console.log(protein, unit.base, item.amount);
      totalProtein += (protein / unit.base) * item.amount;
      totalCarbs += (carbs / unit.base) * item.amount;
    }
  });
  return { totalKcal, totalProtein, totalCarbs };
};

export { calculator };
