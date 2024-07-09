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
  // global -> divider
  divider: {
    marginVertical: 8, // Increase margin for better spacing
    width: "80%", // Make it span across the width of the container
    height: 1, // Increase the height to make it more visible
    backgroundColor: "#ccc", // Set a color to ensure visibility
  },
  // chips
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  chip: {
    marginVertical: 5,
    marginRight: 5,
  },
});

export default styles;
