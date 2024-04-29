import React from "react";
import { View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { loadList } from "../Components/DataHandler";

const SingleSelector = (props) => {
  const [items, setItems] = React.useState([]);
  const [defValue, setDefValue] = React.useState({});

  React.useEffect(() => {
    loadList(props.value)
      .then((data) => {
        setItems(data);
        if ("defValue" in props) {
          setDefValue(data.filter((item) => item.value === props.defValue)[0]);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <View>
      <SelectList
        setSelected={(val) => props.setter(val)}
        defaultOption={defValue}
        data={items}
        save="value"
        label={props.label}
        placeholder={props.label}
        searchPlaceholder={props.label}
        notFoundText={props.notFoundText}
      />
    </View>
  );
};

export default SingleSelector;
