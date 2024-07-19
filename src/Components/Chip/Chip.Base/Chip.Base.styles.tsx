import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
    marginTop: 4,
  },
  chip: {
    marginVertical: 3,
    marginRight: 2,
  },  
  chipButton: {
    backgroundColor: "#ffffff",
    padding: 3
  },
  chipTitle: {
    color: "#333333",
  }
})

export default styles;