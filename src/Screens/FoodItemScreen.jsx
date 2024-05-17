import React from "react";
import { View, Button, ScrollView } from "react-native";
import NumberInput from "../Components/NumberInput";
import StringInput from "../Components/StringInput";
import SingleSelector from "../Components/SingleSelector";
import { useSelector, useDispatch } from "react-redux";
import { addFood, selectMaxKey } from "../../store/redux/food";

function FoodItemScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const item = {
    key: route.params.item.key,
    value: route.params.item.value,
    category: route.params.item.category,
    unit: route.params.item.unit,
    base: route.params.item.base,
    kj: route.params.item.kj,
    kcal: route.params.item.kcal,
    protein: route.params.item.protein,
    carbs: route.params.item.carbs,
    fat: route.params.item.fat,
  };
  const valid = {
    value: item.value ? true : false,
    category: item.category ? true : false,
    unit: item.unit ? true : false,
    base: true,
    kj: true,
    kcal: true,
    protein: true,
    carbs: true,
    fat: true,
  };

  const setItem = (key, newValue) => {
    item[key] = newValue;
  };
  const setValid = (key, newValue) => {
    valid[key] = newValue;
  };

  const handleSubmit = () => {
    console.log(valid);
    console.log(Object.values(valid).every((value) => value === true));

    if (Object.values(valid).every((value) => value === true)) {
      console.log("som tu");
      if (item.key) {
      } else {
        // TODO check if exist
        const maxKey = useSelector(selectMaxKey);
        setItem("key", maxKey);
        dispatch(addFood(item));
      }
      navigation.goBack();
    }
    // if (itemExists) {
    //   dispatch(removeFood(food));
    //   dispatch(addFood(food));
    //   // TODO: update alert
    // } else {
    //   // TODO: add key
    //   dispatch(addFood(food));
    //   // TODO: add alert
    // }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <View>
          <StringInput
            label="Nazov"
            defaultValue={item.value}
            itemKey="value"
            setItem={setItem}
            setValid={setValid}
          />
        </View>
        <View>
          <SingleSelector
            itemKey="category"
            defValue={item.category}
            setItem={setItem}
            setValid={setValid}
            label="Kategoria"
            notFoundText="Ziadna kategoria sa nenasla"
          />
          <SingleSelector
            itemKey="unit"
            defValue={item.unit}
            setItem={setItem}
            setValid={setValid}
            label="Jednotka"
            notFoundText="Ziadna jednotka sa nenasla"
          />
          <NumberInput
            label="Mnozstvo"
            defaultValue={item.base}
            itemKey="base"
            setItem={setItem}
            setValid={setValid}
          />
        </View>
        <View>
          <NumberInput
            label="Energia"
            defaultValue={item.kj}
            itemKey="kj"
            setItem={setItem}
            setValid={setValid}
          />
        </View>
        <View>
          <NumberInput
            label="Kalorie"
            defaultValue={item.kcal}
            itemKey="kcal"
            setItem={setItem}
            setValid={setValid}
          />
        </View>
        <View>
          <NumberInput
            label="Bielkoviny"
            defaultValue={item.protein}
            itemKey="protein"
            setItem={setItem}
            setValid={setValid}
          />
        </View>
        <View>
          <NumberInput
            label="Sacharidy"
            defaultValue={item.carbs}
            itemKey="carbs"
            setItem={setItem}
            setValid={setValid}
          />
        </View>
        <View>
          <NumberInput
            label="Tuky"
            defaultValue={item.fat}
            itemKey="fat"
            setItem={setItem}
            setValid={setValid}
          />
        </View>
        <View>
          <Button
            title={item.key !== null ? "Upravit" : "Pridat"}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default FoodItemScreen;
