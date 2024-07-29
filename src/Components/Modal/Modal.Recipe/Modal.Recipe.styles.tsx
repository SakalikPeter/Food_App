import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  closeButtonView: {
    paddingBottom: 35,
  },  
  buttonTopClose: {
    position: 'absolute',
    top: 0,
    left: 50,
    backgroundColor: '#ccc',
    borderRadius: 15,
    padding: 5,
  },

  titleContainer: {
    marginBottom: 20,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "serif",
    color: "#333333",
    textAlign: "center",
  },
  recipeInfo: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
    fontFamily: "serif",
    textAlign: "center",
  },

  modalText: {
    marginBottom: 0,
    textAlign: "center",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  tag: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    padding: 5,
    margin: 5,
    textAlign: "center",
  },
  foodsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  food: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    padding: 5,
    margin: 5,
    textAlign: "center",
  },

  buttonBottomContainer: {
    flexDirection: 'row',
  },
  buttonBottomItem: {
    paddingRight: 80,
  },

  buttonBottomUpdate: {
    backgroundColor: "#9ef01a",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonBottomDelete: {
    backgroundColor: "#f01a1a",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
});

export default styles;
