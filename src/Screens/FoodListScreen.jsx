import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import ValueList from "../Components/ValueList";
import SingleSelector from "../Components/SingleSelector";
import { loadList } from "../Components/DataHandler";

function FoodListScreen() {
  const [items, setItems] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [category, setCategory] = React.useState("");

  React.useEffect(() => {
    loadList("food")
      .then((data) => setItems(data))
      .catch((error) => console.error(error));
  }, []);

  const handleAddFood = () => {};

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View>
        <Text>Food List page</Text>
      </View>
      <View>
        <View>
          <SingleSelector
            value="food"
            setter={setValue}
            lable="Potravina"
            notFoundText="Ziadna potravina sa nenasla"
          />
          <Button title="Zrus" onPress={() => setValue("")} />
        </View>
        <View>
          <SingleSelector
            value="category"
            setter={setCategory}
            lable="Kategoria"
            notFoundText="Ziadna kategoria sa nenasla"
          />
          <Button title="Zrus" onPress={() => setCategory("")} />
        </View>
      </View>
      <View>
        {items.length > 0 && (
          <ValueList
            filename="food"
            items={items.filter((item) => {
              if (value && item.value !== value) return false;
              if (category && item.category !== category) return false;
              return true;
            })}
          />
        )}
      </View>
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
