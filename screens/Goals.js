import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
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

  const addGoalHandler = () => {
    if (goalText.trim()) {
      dispatch(addGoalToUser(goalText));
      setGoalText("");
    }
  };
  const handleSaveGoal = () => {
    const goalToEdit = goals.find((g) => g.id === editingId);
    if (goalText.trim() && editingId) {
      dispatch(editGoalInUser({ goalObject: goalToEdit, newText: goalText }));
      setGoalText("");
      setEditingId(null);
    }
  };

  const handleToggleGoalCompletion = (item) => {
    dispatch(toggleGoalInUser(item));
  };

  const handleDeleteGoal = (item) => {
    dispatch(deleteGoalFromUser(item));
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
