const emptyString = "Hodnota nesmie byt prazdna.";
const notString = "Hodnota musi byt text.";
const notNumber = "Hodnota musi byt cislo.";

const checkStringInput = (value) => {
  if (value === "") {
    return { value: false, msg: emptyString };
  } else if (typeof value !== "string") {
    return { value: false, msg: notString };
  } else {
    return { value: true, msg: "" };
  }
};

const checkNumberInput = (value) => {
  if (value === "") {
    return { value: false, msg: emptyString };
  } else if (typeof value !== "number") {
    return { value: false, msg: notNumber };
  } else {
    return { value: true, msg: "" };
  }
};

export { checkStringInput, checkNumberInput };
