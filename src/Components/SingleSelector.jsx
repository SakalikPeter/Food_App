import React from "react";
import { TextInput, View } from "react-native";
import { SelectList } from "@pncodebreaker/react-native-dropdown-select-list";
import { useSelector } from "react-redux";

const SingleSelector = ({
  itemKey,
  defValue,
  setItem,
  label,
  notFoundText,
}) => {
  const [borderColor, setBorderColor] = React.useState(null);
  let items = [];
  let defaultOption;
  if (itemKey === "unit") {
    items = useSelector((state) => state.unit.items);
  } else if (itemKey === "category") {
    items = useSelector((state) => state.category.items);
  }
  if (defValue)
    defaultOption = items.filter((item) => item.value === defValue)[0];
  else defaultOption = null;

  const handleInputChange = (value) => {
    // Check if the value is a string and does not contain only numbers
    // init selectlist return key of default
    if (!/^\d+$/.test(String(value))) {
      setItem(itemKey, value);
    }
    setBorderColor(null);
  };

  console.log(defValue);
  return (
    <View>
      <SelectList
        setSelected={(val) => handleInputChange(val)}
        defaultOption={defaultOption}
        data={items}
        save="value"
        label={label}
        placeholder={label}
        searchPlaceholder={label}
        notFoundText={notFoundText}
        boxStyles={{ borderColor: borderColor }}
      />
      {borderColor && (
        <TextInput style={{ color: borderColor }}>*Vyberte hodnotu</TextInput>
      )}
    </View>
  );
};

export default SingleSelector;
