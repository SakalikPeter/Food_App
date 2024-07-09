import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  listContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonContainer: {
    alignItems: "center",
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonAdd: {
    backgroundColor: "#2196F3",
  },
});

export default styles;
