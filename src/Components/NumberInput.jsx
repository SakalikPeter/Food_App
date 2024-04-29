import React from "react";
import { Input } from "react-native-elements";
import { checkNumberInput } from "./Checker";

function NumberInput(props) {
  const energy = props.placeholder;
  const [errMsg, setErrMsg] = React.useState("");

  React.useEffect(() => {
    if (!errMsg) {
      props.isValid(true);
    } else {
      props.isValid(false);
    }
  }, [errMsg]);

  const handleInputChange = (value) => {
    props.setValue(value);
    setErrMsg(checkNumberInput(value));
  };

  return (
    <Input
      placeholder={energy}
      defaultValue={props.defaultValue}
      onChangeText={(value) => handleInputChange(value)}
      errorMessage={errMsg}
    />
  );
}

export default NumberInput;
