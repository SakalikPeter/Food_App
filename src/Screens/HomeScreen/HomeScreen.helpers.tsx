import { SelectedItem } from "../../Models/SelectedItem";

export const itemSelectorFood = (item) => ({
  key: item.key,
  value: item.value + " (" + item.category + ")",
  unit: item.unit,
});

export const itemSelectorRecipe = (item) => ({
  key: item.key,
  value: item.value,
  unit: "porcie",
});

export const toggleItemInArray = (array: SelectedItem[], key: string) => {
  let updatedArray = array;
  const itemIndex = array.findIndex((item) => item.key === Number(key));
  if (itemIndex !== -1) {
    updatedArray = array.filter((item) => item.key !== Number(key));
  } else {
    updatedArray = [...array, new SelectedItem(Number(key), 0)];
  }
  return updatedArray;
};

export const updateItemQuantity = (array: SelectedItem[], item: SelectedItem) => {
  return array.map((existingItem) => {
    if (existingItem.key === item.key) {
      return new SelectedItem(existingItem.key, item.quantity);
    }
    return existingItem;
  });
};
