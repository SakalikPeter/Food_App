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

const saveItem = async (filename, item) => {
  console.log("Ukladam");
  console.log(item);
};

// const deleteItemByName = async (filename, nameToDelete) => {
//   try {
//     const data = await loadJsonData(filename);
//     const indexToDelete = data[filename].findIndex(
//       (item) => item.name === nameToDelete
//     );

//     if (indexToDelete === -1) {
//       throw new Error(`Item with name '${nameToDelete}' not found`);
//     }

//     // Remove the item from the array
//     data[filename].splice(indexToDelete, 1);

//     // Save modified data back to file
//     saveJsonData(filename, data);

//     console.log(`Item with name '${nameToDelete}' deleted successfully`);
//   } catch (error) {
//     console.error("Error deleting item:", error);
//     throw error;
//   }
// };

// const saveJsonData = (filename, data) => {
//   const jsonData = JSON.stringify(data, null, 2);

//   RNFS.writeFile(`../data/food.json`, jsonData, "utf-8")
//     .then((success) => {
//       console.log("FILE WRITTEN");
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// };

export { loadJsonData, loadUniqueValues, saveItem, loadList };
