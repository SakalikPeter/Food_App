import React from "react";
import { View, Modal } from "react-native";
import ValueList from "../Components/ValueList";
import SingleSelector from "../Components/SingleSelector";
import MultiSelector from "../Components/MultiSelector";
import { Button } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { removeRecipe } from "../../store/redux/recipe";

function RecipeListScreen({ navigation }) {
  const [value, setValue] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [foods, setFoods] = React.useState([]);
  const [filters, setFilters] = React.useState(false);
  const items = useSelector((state) => state.recipe.items);
  const dispatch = useDispatch();

  const updateItem = (item) => {
    navigation.navigate("Recept", { item: item });
  };
  const removeItem = (value) => {
    dispatch(removeRecipe(value));
    // TODO: remove Alert
  };
  const handleAddRecipe = () => {
    navigation.navigate("Recept", {
      item: {
        value: "",
        portions: "",
        instructions: "",
        food: [],
        tags: [],
      },
    });
  };
  const handleFilters = () => {
    setFilters(!filters);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* <Modal visible={filters} animationType="slide">
        <View>
          <View>
            <SingleSelector
              value="recipe"
              setter={setValue}
              label="Recept"
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
          <Button title="Filtre Zavriet" onPress={handleFilters} />
        </View>
      </Modal> */}
      <View>
        <Button title="Filtre" onPress={handleFilters} />
      </View>
      <View>
        {items.length > 0 && (
          <ValueList
            updateItem={updateItem}
            removeItem={removeItem}
            items={items.filter((item) => {
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
        <Button
          title="Pridat"
          onPress={handleAddRecipe}
          loading={false}
          loadingProps={{ size: "small", color: "white" }}
          buttonStyle={{
            backgroundColor: "rgba(111, 202, 186, 1)",
            borderRadius: 5,
          }}
          titleStyle={{ fontWeight: "bold", fontSize: 23 }}
          containerStyle={{
            marginHorizontal: 50,
            height: 50,
            width: 200,
            marginVertical: 10,
          }}
        />
      </View>
    </View>
  );
}

export default RecipeListScreen;
