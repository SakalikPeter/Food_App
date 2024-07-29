import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242423",
    padding: 0,
  },
  recipeContainer: {
    alignItems: "center",
    backgroundColor: "#999655",
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 4,
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  recipeName: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "serif",
    color: "#333333",
    paddingVertical: 6,
  },

  divider: {
    width: "80%", 
    height: 1,
    backgroundColor: "#242423",
  },
});

export default styles;
