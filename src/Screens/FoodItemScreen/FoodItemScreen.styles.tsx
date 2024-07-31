import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242423",
    padding: 16,
    justifyContent: "space-between",
  },
  
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    left: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginTop: 0,
  },
  button: {
    borderRadius: 25,
    padding: 10,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9ef01a',
  },
});

export default styles;
