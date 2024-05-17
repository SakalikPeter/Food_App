const emptyString = "Hodnota nesmie byt prazdna";
const noLetters = "Hodnota musi obsahovat pismeno";
const notNumber = "Hodnota musi byt kladne cislo";
const notValidFormat = "Separator musi byt . namiesto ,";

const checkStringInput = (value) => {
  if (value === "") {
    return emptyString;
  } else if (!/[a-zA-Z]/.test(value)) {
    return noLetters;
  } else {
    return "";
  }
};

const checkNumberInput = (value) => {
  if (value === "" || value === undefined) {
    return emptyString;
  } else if (!/^\d+([\.\,])?(\d+)?$/.test(value)) {
    return notNumber;
  } else if (value.includes(",")) {
    return notValidFormat;
  } else {
    return "";
  }
};

export { checkStringInput, checkNumberInput };
