import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { MultipleSelectList } from "@pncodebreaker/react-native-dropdown-select-list";

const MultiSelector = ({
  items,
  defValue,
  setItem,
  label,
  notFoundText,
}) => {
  const [selectedItems, setSelectedItems] = React.useState(defValue)

  React.useEffect(() => {
    setItem(selectedItems)
  }, [selectedItems])

  return (
    <View>
      <MultipleSelectList
        setSelected={(val) => setSelectedItems(val)}
        data={items}
        save="value"
        label={label}
        placeholder={label}
        searchPlaceholder={label}
        notFoundText={notFoundText}
        defaultOption={defValue}
      />
    </View>
  );
};

export default MultiSelector;
