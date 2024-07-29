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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "serif",
    color: "#333333",
    textAlign: "center",
  },
  titleContainer: {
    marginBottom: 20,
  },
  modalText: {
    marginBottom: 5,
    textAlign: "center",
    fontFamily: "serif",
    color: "#333333",
  },
  buttonBottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonBottomItem: {
    paddingRight: 80,
  },
  buttonTopClose: {
    position: 'absolute',
    top: 0,
    left: 50,
    backgroundColor: '#ccc',
    borderRadius: 15,
    padding: 5,
    // zIndex: 1, // Ensure the button is on top
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
