import React from "react";
import { Input } from "react-native-elements";
import { checkStringInput } from "./Checker";

function StringInput(props) {
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
    setErrMsg(checkStringInput(value));
  };

  return (
    <Input
      placeholder={energy}
      onChangeText={(value) => handleInputChange(value)}
      errorMessage={errMsg}
    />
  );
}

export default StringInput;
