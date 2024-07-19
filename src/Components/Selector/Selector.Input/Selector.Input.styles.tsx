import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // global
  containerFood: {
    backgroundColor: "#FF9A00",
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 4,
    paddingHorizontal: 16,
    paddingTop: 0,
  },
  containerRecipe: {
    backgroundColor: "#D10363",
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 4,
    paddingHorizontal: 16,
    paddingTop: 0,
  },
  // global -> header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 2,
  },
  // global -> title
  title: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "serif",
    color: "#333333",
  },
  // global -> icon
  iconContainer: {
    marginLeft: "auto",
    // paddingRight: 10,
  },
  icon: {
    fontSize: 24,
    // paddingRight: 10,
  },
  // global -> content wrapper
  selectorWrapper: {
    marginTop: 4,
  },
  // global -> divider
  divider: {
    marginVertical: 0,
    backgroundColor: "#242423",
  },
  // list
  list: {
    maxHeight: 225,
    marginTop: 0,
  },
  // list - item wrapper
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkboxContainer: {
    flex: 0.1
  },
  itemValue: {
    fontWeight: "bold",
    fontFamily: "serif",
    color: "#333333",
    flex: 0.7,
  },
  inputContainer: {
    flex: 0.25,
  },
  input: {
    paddingTop: 12,
    color: "#242423"
  },
  unitText: {
    fontWeight: "bold",
    fontFamily: "serif",
    color: "#333333",
  },
});

export default styles;
