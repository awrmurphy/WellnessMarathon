import { StyleSheet } from "react-native";
import { COLORS } from "./constants";
//needed styles: button, alert, input,
/**
 * button style creates soft rounded button appearance with secondary colour
 *
 */
const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.NAV,
    justifyContent: "center",
    borderRadius: 8,
    boxShadow: "2px 2px 5px #536b6ace",
  },
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: COLORS.SCREEN,
    justifyContent: "center",
  },
  widgetHome: {
    marginBottom: 10,
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "auto",
    backgroundColor: COLORS.BACK,
    justifyContent: "center",
    borderRadius: 8,
    boxShadow: "2px 2px 5px #536b6ace",
  },
  widgetBox: {
    flexDirection: "column",
    width: "100%",
    padding: 5,
  },
  login: {
    flex: 1,
    width: "100%",
    flexDirection: "COLUMN",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.SCREEN,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subHead: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  plainText: {
    textAlign: "center",
  },
  buttonHome: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    padding: 2,
  },
  generalButton: {
    flex: 1,
    alignItems: "center",
    borderColor: "#0e0d0d",
    borderWidth: 2,
    margin: 2,
    padding: 2,
    borderRadius: 8,
    boxShadow: "2px 2px 5px #538582e3",
    backgroundColor: "#cde2e6",
    width: "100%",
  },

  // goals styles
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    margin: 10,
    marginLeft: 0,
    backgroundColor: "#fff",
    fontSize: 16,
    width: "100%",
  },

  goalItem: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    maxWidth: "100%",
  },

  goalText: {
    fontSize: 16,
    marginBottom: 6,
    color: "#333",
  },

  completedGoal: {
    textDecorationLine: "line-through",
    color: "#999",
  },

  goalButtons: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    marginTop: 6,
  },

  completeButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },

  editButton: {
    backgroundColor: "#FF9800",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },

  deleteButton: {
    backgroundColor: "#F44336",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },

  progressText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  incompleteGoal: {
    color: "#333",
    fontSize: 16,
  },
  // journal styles
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    minHeight: 80,
    textAlignVertical: "top",
    marginBottom: 15,
    width: "90%",
  },
  label: { fontSize: 16, marginBottom: 10 },
  moodScroll: { marginBottom: 15 },
  moodContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  moodButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#eee",
    marginRight: 10,
  },
  moodButtonSelected: { backgroundColor: "#75e7c5" },
  moodButtonText: { fontSize: 14 },
  addButton: {
    backgroundColor: "#4a90e2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  entryItem: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  entryDate: { fontSize: 12, color: "#666", marginBottom: 5 },
  entryMood: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#4a90e2",
  },
  entryText: { fontSize: 14 },
  journalHeader: {
    alignItems: "center",
    width: "100%",
    paddingBottom: 20,
    backgroundColor: "#fff",
  },

  // profile styles
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },

  email: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
  },

  preferences: {
    width: "100%",
    padding: 15,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginBottom: 20,
  },

  preferenceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  stats: {
    width: "100%",
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 20,
  },

  statTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#53bfd0",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  //progress styles

  //text
  progressText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },

  //progress bar
  progressBarContainer: {
    width: "100%",
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#5eb326",
    borderRadius: 10,
  },
});

export default appStyles;
