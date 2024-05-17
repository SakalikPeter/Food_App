import React from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const Selector = (props) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(props.values);

  return (
    <View>
      <DropDownPicker
        open={open}
        value={value}
        items={props.items}
        setOpen={setOpen}
        setValue={setValue}
        multiple={props.multiple}
        onChangeValue={(value) => {
          console.log(value);
        }}
      />
    </View>
  );
};

export default Selector;
