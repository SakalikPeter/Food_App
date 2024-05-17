import React from "react";
import { Text, View, Modal, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import ValueList from "../Components/ValueList";
import SingleSelector from "../Components/SingleSelector";
import { useSelector, useDispatch } from "react-redux";
import { removeFood } from "../../store/redux/food";

function FoodListScreen({ navigation }) {
  const items = useSelector((state) => state.food.items);
  const dispatch = useDispatch();

  const [value, setValue] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [filters, setFilters] = React.useState(false);

  const updateItem = (item) => {
    navigation.navigate("Potravina", { item: item });
  };
  const removeItem = (value) => {
    dispatch(removeFood(value));
    // TODO: remove Alert
  };
  const handleFilters = () => {
    setFilters(!filters);
  };
  const handleAddFood = () => {
    navigation.navigate("Potravina", {
      item: {
        key: null,
        value: "",
        category: "",
        unit: "",
        base: 0,
        kj: 0,
        kcal: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      },
    });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Modal visible={filters} animationType="slide">
        <View>
          <View>
            <SingleSelector
              value="food"
              setter={setValue}
              label="Potravina"
              notFoundText="Ziadna potravina sa nenasla"
            />
            <Button title="Zrus" onPress={() => setValue("")} />
          </View>
          <View>
            <SingleSelector
              value="category"
              setter={setCategory}
              label="Kategoria"
              notFoundText="Ziadna kategoria sa nenasla"
            />
            <Button title="Zrus" onPress={() => setCategory("")} />
          </View>
        </View>
        <View>
          <Button title="Filtre Zavriet" onPress={handleFilters} />
        </View>
      </Modal>
      <View>
        <Button title="Filtre" onPress={handleFilters} />
      </View>
      <View>
        <Text>Food List page</Text>
      </View>
      {items.length > 0 && (
        <ValueList
          updateItem={updateItem}
          removeItem={removeItem}
          items={items.filter((item) => {
            if (value && item.value !== value) return false;
            if (category && item.category !== category) return false;
            return true;
          })}
        />
      )}
      <View>
        <Button
          title="Pridat"
          onPress={handleAddFood}
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

export default FoodListScreen;
