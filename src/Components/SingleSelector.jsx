import React from "react";
import { View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { loadList } from "../Components/DataHandler";

const SingleSelector = (props) => {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    loadList(props.value)
      .then((data) => setItems(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View>
      <SelectList
        setSelected={(val) => props.setter(val)}
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
