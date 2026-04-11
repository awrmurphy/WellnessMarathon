import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import appStyles from "../shared/appStyles";

import { useSelector, useDispatch } from "react-redux";
import {
  addGoalToUser,
  deleteGoalFromUser,
  toggleGoalInUser,
  editGoalInUser,
} from "../Redux/goalsReducer";

export default function Goals() {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals.goals);

  const [goalText, setGoalText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [selectedGoalId, setSelectedGoalId] = useState(null);

  const addGoalHandler = async () => {
    if (goalText.trim()) {
      try {
        await dispatch(addGoalToUser(goalText)).unwrap();
        setGoalText("");
      } catch (e) {
        Alert.alert("Error", "Error saving goal to cloud");
      }
    } else {
      Alert.alert("Invalid Input", "Goal cannot be empty.");
    }
  };

  const handleSaveGoal = async () => {
    const goalToEdit = goals.find((g) => g.id === editingId);
    const trimmedText = goalText.trim();

    if (!trimmedText || !editingId) {
      Alert.alert("Invalid Input", "The goal description cannot be empty.");
      return;
    }

    try {
      await dispatch(
        editGoalInUser({
          goalObject: goalToEdit,
          newText: trimmedText,
        }),
      ).unwrap();
      setGoalText("");
      setEditingId(null);
      setSelectedGoalId(null);
    } catch (err) {
      Alert.alert(
        "Update Failed",
        "We couldn't save your changes to the cloud. Please try again.",
      );
    }
  };

  const handleToggleGoalCompletion = async (item) => {
    try {
      await dispatch(toggleGoalInUser(item)).unwrap();
    } catch (err) {
      Alert.alert("Update Failed", "Failed to update goal status.");
    }
  };

  const handleDeleteGoal = async (item) => {
    Alert.alert("Delete Goal", "Are you sure you want to remove this goal?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await dispatch(deleteGoalFromUser(item)).unwrap();
          } catch (err) {
            Alert.alert(
              "Delete Failed",
              "The goal could not be removed from the server.",
            );
          }
        },
      },
    ]);
  };

  const editGoal = (item) => {
    setGoalText(item.text);
    setEditingId(item.id);
  };

  return (
    <View style={appStyles.screen}>
      <TextInput
        value={goalText}
        onChangeText={setGoalText}
        placeholder="Enter your goal"
        style={appStyles.input}
      />
      <TouchableOpacity
        onPress={editingId ? handleSaveGoal : addGoalHandler}
        style={appStyles.button}
      >
        <Text style={appStyles.buttonText}>
          {editingId ? "Update Goal" : "Add Goal"}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[appStyles.goalItem, { width: "100% " }]}>
            <TouchableOpacity
              onPress={() =>
                setSelectedGoalId(selectedGoalId === item.id ? null : item.id)
              }
            >
              <Text
                style={[
                  appStyles.goalText,
                  item.completed && appStyles.completedGoal,
                ]}
              >
                {" "}
                {item.text}{" "}
              </Text>
            </TouchableOpacity>
            {selectedGoalId === item.id && (
              <View style={appStyles.goalButtons}>
                <TouchableOpacity
                  onPress={() => handleToggleGoalCompletion(item)}
                  style={appStyles.completeButton}
                >
                  <Text style={appStyles.buttonText}>
                    {item.completed ? "Undo" : "Complete"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => editGoal(item)}
                  style={appStyles.editButton}
                >
                  <Text style={appStyles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteGoal(item)}
                  style={appStyles.deleteButton}
                >
                  <Text style={appStyles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}
