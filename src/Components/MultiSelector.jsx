import React from "react";
import { View } from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { useSelector, useDispatch } from "react-redux";
import { removeRecipe } from "../../store/redux/recipe";

const MultiSelector = (props) => {
  const [filters, setFilters] = React.useState([]);

  React.useEffect(() => {
    const filteredItems = props.items.filter((item) =>
      filters.includes(item.key)
    );
    props.setter(filteredItems);
  }, [filters]);

  return (
    <View>
      <MultipleSelectList
        setSelected={(val) => setFilters(val)}
        data={props.items}
        save="key"
        label={props.label}
        placeholder={props.label}
        searchPlaceholder={props.label}
        notFoundText={props.notFoundText}
      />
    </View>
  );
};

export default MultiSelector;
