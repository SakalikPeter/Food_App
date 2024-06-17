const emptyString = "Hodnota nesmie byt prazdna";
const noLetters = "Hodnota musi obsahovat pismeno";
const negativeNumber: string = "Hodnota musi byt kladne cislo";
const notValidFormat = "Separator musi byt . namiesto ,";

const checkStringInput = (value: string): string => {
  if (value === "") {
    return emptyString;
  } else if (!/[a-zA-Z]/.test(value)) {
    return noLetters;
  } else {
    return "";
  }
};

const checkNumberInput = (value: number): string => {
  if (value < 0)
    return negativeNumber
  // if (!/^\d+([\.\,])?(\d+)?$/.test(String(value))) {
  //   return notNumber;
  // } else if (String(value).includes(",")) {
  //   return notValidFormat;
  // } else {
  //   return "";
  // }
};

export { checkStringInput, checkNumberInput };
