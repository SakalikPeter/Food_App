import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242423",
    padding: 0,
  },
  row: {
    flexDirection: "row",
  },
  foodContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 4,
    flexDirection: "column",
    alignItems: "center",
    padding: 8, 
    margin: 2,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "serif",
    color: "#333333",
    textAlign: "center",
  },
  foodCategory: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
    fontFamily: "serif",
    textAlign: "center",
  },
  foodQuantity: {
    fontSize: 14,
    color: "#888",
    fontFamily: "serif",
    textAlign: "center",
  },
});
export default styles;
