import React from "react";
import { Input } from "react-native-elements";
import { checkNumberInput } from "./Checker";

function NumberInput({ label, defaultValue, itemKey, setItem, setValid }) {
  const [errMsg, setErrMsg] = React.useState("");
  const [inputValue, setInputValue] = React.useState(defaultValue);

  React.useEffect(() => {
    if (errMsg === "") {
      setValid(itemKey, true);
    } else {
      setValid(itemKey, false);
    }
  }, [errMsg]);

  const handleInputChange = (value) => {
    setItem(itemKey, value);
    setInputValue(value);
    setErrMsg(checkNumberInput(value));
  };

  const handleBlur = () => {
    setErrMsg(checkNumberInput(inputValue));
  };

  return (
    <Input
      label={label}
      defaultValue={defaultValue.toString()}
      onChangeText={(value) => handleInputChange(value)}
      onBlur={handleBlur}
      errorMessage={errMsg}
      keyboardType="decimal-pad"
    />
  );
}

export default NumberInput;
