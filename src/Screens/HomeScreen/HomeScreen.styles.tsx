import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242423",
    padding: 16,
    justifyContent: "space-between",
  },
  textContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // elevation: 5,
  },
  textColumn: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: "#77E4C8",
    fontSize: 20,
    fontFamily: "serif",
    marginBottom: 10,

    textAlign: 'center',
  },

  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9ef01a',
    // borderRadius: 5,
  },
});

export default styles;
