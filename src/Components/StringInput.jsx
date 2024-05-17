import React from "react";
import { Input } from "react-native-elements";
import { checkStringInput } from "./Checker";

function StringInput({ label, defaultValue, itemKey, setItem, setValid }) {
  const [errMsg, setErrMsg] = React.useState("");
  const [inputValue, setInputValue] = React.useState(defaultValue);

  React.useEffect(() => {
    handleInputChange(defaultValue);
  }, []);

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
    setErrMsg(checkStringInput(value));
  };

  const handleBlur = () => {
    console.log(inputValue);
    setErrMsg(checkStringInput(inputValue));
  };

  return (
    <Input
      label={label}
      defaultValue={defaultValue}
      onChangeText={(value) => handleInputChange(value)}
      onBlur={handleBlur}
      errorMessage={errMsg}
    />
  );
}

export default StringInput;
