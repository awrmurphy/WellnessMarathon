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
    backgroundColor: COLORS.BACK,
    justifyContent: "center",
    textAlign: "center",
  },
  screen: {
    flex: 1,
    alignItems: "flex-start",
    padding: 10,
    backgroundColor: COLORS.SCREEN,
  },
  login: {
    maxWidth: "50%",
    maxHeight: "50%",
    flex: 1,
    flexDirection: "COLUMN",
    justifyContent: "center",
    alignItems: "center",
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
  entryMood: { fontSize: 14, fontWeight: "bold", marginBottom: 5, color: "#4a90e2" },
  entryText: { fontSize: 14 },

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
});

export default appStyles;
