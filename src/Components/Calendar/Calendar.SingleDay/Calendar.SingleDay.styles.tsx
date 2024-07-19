import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFBF00",
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    fontFamily: "serif",
  },
  iconContainer: {
    marginLeft: "auto",
    paddingRight: 10,
  },
  icon: {
    fontSize: 24,
    paddingRight: 10,
  },
  calendarWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  divider: {
    marginVertical: 0,
    backgroundColor: "#242423",
  },
  dateInfo: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  dateText: {
    marginTop: 4,
    fontSize: 16,
    color: "#333333",
    fontWeight: "500",
    fontFamily: "serif",
  },
});

export default styles;
