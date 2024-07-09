import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
    marginTop: 16,
  },
  divider: {
    marginVertical: 16,
    backgroundColor: "#e0e0e0",
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
  },
});

export default styles;
