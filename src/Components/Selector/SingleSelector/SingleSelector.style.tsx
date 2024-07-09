import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // global
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
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
    color: "#333333",
  },
  // global -> icon
  iconContainer: {
    marginLeft: "auto",
    paddingRight: 10,
  },
  icon: {
    fontSize: 24,
    paddingRight: 10,
  },
  // global -> content wrapper
  selectorWrapper: {
    marginTop: 16,
  },
  // global -> divider
  divider: {
    marginVertical: 16,
    backgroundColor: "#e0e0e0",
  },
  // list
  list: {
    maxHeight: 250,
    marginTop: 16,
  },
  // list - item wrapper
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    // padding: 1,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  checkboxContainer: {
    marginRight: 10,
    flex: 0.2,
  },
  itemValue: {
    color: "#555",
    flex: 0.8,
  },
  inputContainer: {
    flex: 0.25,
  },
  input: {
    // flex: 1,
  },
  unitText: {
    color: "#555",
    flex: 0.2,
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
