const emptyString = "Hodnota nesmie byt prazdna.";
const notString = "Hodnota musi byt text.";
const notNumber = "Hodnota musi byt cislo.";

const checkStringInput = (value) => {
  if (value === "") {
    return emptyString;
  } else {
    return "";
  }
};

const checkNumberInput = (value) => {
  if (value === "") {
    return emptyString;
  } else if (!parseInt(value)) {
    return notNumber;
  } else {
    return "";
  }
};

export { checkStringInput, checkNumberInput };
