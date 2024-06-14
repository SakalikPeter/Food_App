import React from "react";
import { TextInput, View } from "react-native";
import { SelectList } from "@pncodebreaker/react-native-dropdown-select-list";
import { useSelector } from "react-redux";

const SingleSelector = ({
  itemKey,
  defValue,
  setItem,
  setValid,
  label,
  notFoundText,
}) => {
  const [defaultOption, setDefaultOption] = React.useState(null);
  const [borderColor, setBorderColor] = React.useState(null);
  let items = [];
  if (itemKey === "unit") {
    items = useSelector((state) => state.unit.items);
  } else if (itemKey === "category") {
    items = useSelector((state) => state.category.items);
  }

  React.useEffect(() => {
    // handleInputChange(defValue);
    if (defValue !== "") {
      setDefaultOption(items.filter((item) => item.value === defValue)[0]);
      if (setValid) {
        setValid(itemKey, true);
      }
    } else {
      if (setValid) {
        setValid(itemKey, false);
        setBorderColor("red");
      }
    }
  }, []);

  const handleInputChange = (value) => {
    setItem(itemKey, value);
    if (setValid) {
      setValid(itemKey, true);
    }
    setBorderColor(null);
    // setErrMsg(checkStringInput(value));
  };

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
