const calculator = (recipeFoods, foods) => {
  let units = [];
  let totalKJ = 0;
  let totalKcal = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;

  recipeFoods.forEach((item) => {
    // find food from catalog
    const food = foods.find((food) => food.key === item.key);
    if (food) {
      const { kj, kcal, protein, carbs, fat } = food;
      // find food's unit
      const unit = units.find((unit) => unit.value === food.unit);
      totalKJ += (kj / food.base) * item.amount;
      totalKcal += (kcal / food.base) * item.amount;
      totalProtein += (protein / food.base) * item.amount;
      totalCarbs += (carbs / food.base) * item.amount;
      totalFat += (fat / food.base) * item.amount;
    }
  });
  return { totalKJ, totalKcal, totalProtein, totalCarbs, totalFat };
};

export { calculator };
