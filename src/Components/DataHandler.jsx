// import RNFS from "react-native-fs";

const loadJsonData = async (filename) => {
  try {
    const response = await fetch(`../data/${filename}.json`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading or extracting data:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

const loadList = async (filename) => {
  try {
    const data = await loadJsonData(filename);
    return data[filename];
  } catch (error) {
    console.error("Error loading unique values:", error);
    return []; // or handle error according to your requirement
  }
};

const loadUniqueValues = async (filename) => {
  try {
    let data = await loadJsonData(filename);
    data = data[filename].map((item) => ({
      key: item["key"],
      value: item["value"],
    }));
    // const uniqueValues = Array.from(new Set(values)); // Filter out duplicates
    return data;
  } catch (error) {
    console.error("Error loading unique values:", error);
    return []; // or handle error according to your requirement
  }
};

const deleteItemByValue = async (filename, value) => {
  try {
    const data = await loadList(filename);
    const indexToDelete = data.findIndex((item) => item.value === value);

    if (indexToDelete === -1) {
      throw new Error(`Item with name '${value}' not found`);
    }

    // Remove the item from the array
    data.splice(indexToDelete, 1);

    // Save modified data back to file
    await saveJsonData(filename, { [filename]: data });

    console.log(`Item with name '${value}' deleted successfully`);
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};

// import localStorage from "@react-native-async-storage/async-storage";

// const saveJsonData = async (filename, data) => {
//   console.log(filename);
//   console.log(data);
//   try {
//     await localStorage.setItem(
//       `../data/${filename}.json`,
//       JSON.stringify(data)
//     );
//     console.log(`Data saved to ${filename} successfully`);
//   } catch (error) {
//     console.error("Error saving data:", error);
//     throw error;
//   }
// };

export {
  loadJsonData,
  loadUniqueValues,
  // saveJsonData,
  loadList,
  deleteItemByValue,
};
