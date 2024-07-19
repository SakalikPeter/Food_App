import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242423",
    padding: 16,
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    padding: 8,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 3,
  },
  menuContainerChecked: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    padding: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    elevation: 3,
  },
  checkBox: {
    marginRight: 16,
  },
  foodDetails: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  foodCategory: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  foodQuantity: {
    fontSize: 14,
    color: "#888",
  },
  checkedCount: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#009688",
    backgroundColor: "#e0f2f1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#009688",
    elevation: 2,
  },
});

export default styles;
