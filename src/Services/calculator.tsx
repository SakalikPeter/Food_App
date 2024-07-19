import { Food } from "../Models/Food";
import { Recipe } from "../Models/Recipe";
import { Nutritions } from "../Models/Nutritions";
import { SelectedItem } from "../Models/SelectedItem";

const calculateFoodsNutritions = (
  foods: Food[],
  selFoods: SelectedItem[]
): Nutritions => {
  let rn = new Nutritions();

  if (selFoods.length == 0) {
    return rn;
  }

  selFoods.forEach((selFood) => {
    const foodItem = foods.find((food) => food.key === selFood.key);
    if (foodItem) {
      rn.kj += (foodItem.kj / foodItem.base) * selFood.quantity;
      rn.kcal += (foodItem.kcal / foodItem.base) * selFood.quantity;
      rn.protein += (foodItem.protein / foodItem.base) * selFood.quantity;
      rn.carbs += (foodItem.carbs / foodItem.base) * selFood.quantity;
      rn.fat += (foodItem.fat / foodItem.base) * selFood.quantity;
    }
    console.log("recipe: ", rn)
  });
  

  return rn;
};

const calculateRecipesNutritions = (
    foods: Food[],
    selFoods: SelectedItem[],
    recipes: Recipe[],
    selRecipes: SelectedItem[]
  ): Nutritions => {
    let rns: Nutritions[] = []
    let finalRn = new Nutritions()

    if (selFoods.length > 0) {
        const rn = calculateFoodsNutritions(foods, selFoods);
        rns.push(rn)
    }

    if (selRecipes.length > 0) {
        selRecipes.forEach((selRecipe) => {
            const recipeItem = recipes.find((recipe) => recipe.key === selRecipe.key);
            const rn = calculateFoodsNutritions(foods, recipeItem.foods)
            rn.kj = rn.kj / recipeItem.portions * selRecipe.quantity
            rn.kcal = rn.kcal / recipeItem.portions * selRecipe.quantity
            rn.protein = rn.protein / recipeItem.portions * selRecipe.quantity
            rn.carbs = rn.carbs / recipeItem.portions * selRecipe.quantity
            rn.fat = rn.fat / recipeItem.portions * selRecipe.quantity
            rns.push(rn)
        })
    }

    console.log(rns)

    if (rns) {
        rns.forEach((rn) => {
            finalRn.kj += rn.kj;
            finalRn.kcal += rn.kcal;
            finalRn.protein += rn.protein;
            finalRn.carbs += rn.carbs;
            finalRn.fat += rn.fat;
        })
    }

    finalRn.kj = Math.round(finalRn.kj * 100) / 100;
    finalRn.kcal = Math.round(finalRn.kcal * 100) / 100;
    finalRn.protein = Math.round(finalRn.protein * 100) / 100;
    finalRn.carbs = Math.round(finalRn.carbs * 100) / 100;
    finalRn.fat = Math.round(finalRn.fat * 100) / 100;

    return finalRn
}

export default calculateRecipesNutritions