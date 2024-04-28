import React from "react";
import { View } from "react-native";
import ValueList from "../Components/ValueList";
import SingleSelector from "../Components/SingleSelector";
import MultiSelector from "../Components/MultiSelector";
import { loadList } from "../Components/DataHandler";
import { Button } from "react-native-elements";

function RecipeListScreen() {
  const [value, setValue] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [foods, setFoods] = React.useState([]);
  const [recipes, setRecipes] = React.useState([]);

  React.useEffect(() => {
    loadList("recipe")
      .then((data) => setRecipes(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View>
        <View>
          <SingleSelector
            value="recipe"
            setter={setValue}
            lable="Recept"
            notFoundText="Ziadny recept sa nenasiel"
          />
          <Button title="Zrus" onPress={() => setValue("")} />
        </View>
        <View>
          <MultiSelector
            value="tag"
            setter={setTags}
            label="Tagy"
            notFoundText="Ziadny tag sa nenasiel"
          />
          <Button title="Zrus" onPress={() => setTags([])} />
        </View>
        <View>
          <MultiSelector
            value="food"
            setter={setFoods}
            label="Potraviny"
            notFoundText="Ziadna potravina sa nenasla"
          />
          <Button title="Zrus" onPress={() => setFoods([])} />
        </View>
      </View>
      <View>
        {recipes.length > 0 && (
          <ValueList
            filename="recipe"
            items={recipes.filter((item) => {
              if (value && item.value !== value) return false;
              if (
                tags.length > 0 &&
                !tags.every((tag) => item.tags.includes(tag))
              ) {
                return false;
              }
              const recipeFoods = item.food.map((food) => food.value);
              const selectedFoods = foods.map((food) => food.value);
              if (
                foods.length > 0 &&
                !selectedFoods.every((food) => recipeFoods.includes(food))
              ) {
                return false;
              }

              return true;
            })}
          />
        )}
      </View>
      <View>
        <Button title="Pridat" />
      </View>
    </View>
  );
}

export default RecipeListScreen;
