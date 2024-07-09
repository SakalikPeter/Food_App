import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    padding: 16,
  },
  row: {
    flexDirection: "row",
  },
  foodContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 3,
    margin: 8, // Add margin for spacing between columns
  },
  foodDetails: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  foodCategory: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
    textAlign: "center",
  },
  foodQuantity: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
});
export default styles;
