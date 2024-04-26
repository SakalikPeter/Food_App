import React from "react";
import { View } from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { loadList } from "../Components/DataHandler";

const MultiSelector = (props) => {
  const [items, setItems] = React.useState([]);
  const [filters, setFilters] = React.useState([]);

  React.useEffect(() => {
    loadList(props.value)
      .then((data) => setItems(data))
      .catch((error) => console.error(error));
  }, []);

  React.useEffect(() => {
    const filteredItems = items.filter((item) => filters.includes(item.key));
    props.setter(filteredItems);
  }, [filters]);

  return (
    <View>
      <MultipleSelectList
        setSelected={(val) => setFilters(val)}
        data={items}
        save="key"
        label={props.label}
        notFoundText={props.notFoundText}
      />
    </View>
  );
};

export default MultiSelector;
