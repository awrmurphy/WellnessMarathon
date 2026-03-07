import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList} from "react-native";
import appStyles from "../shared/appStyles";
import { SIZES } from "../shared/constants";

export default function Goals({goals=[], setGoals}) {
  const [goalText, setGoalText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [selectedGoalId, setSelectedGoalId] = useState(null);

  const addGoal = () => {
  if (!goals || !setGoals) return;
  if (goalText.trim()) {
    setGoals([...goals, { id: Date.now().toString(), text: goalText }]);
    setGoalText("");
  }
};
  
  const toggleGoalCompletion = (id) => {
    setGoals(goals.map((goal) => goal.id === id ? { ...goal, completed: !goal.completed } : goal));
  }
  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };
  
  const editGoal = (id) => {
    const goalToEdit = goals.find((goal) => goal.id === id);
    if (goalToEdit) {
      setGoalText(goalToEdit.text);
      setEditingId(id);
    }
  };

  const saveGoal = () => {
    if (goalText.trim() && editingId) {
      setGoals(goals.map((goal) => goal.id === editingId ? { ...goal, text: goalText } : goal));
      setGoalText("");
      setEditingId(null);
    }
  };

  return (
    <View style={appStyles.screen}>
      <TextInput
        value={goalText}
        onChangeText={setGoalText}
        placeholder="Enter your goal"
        style={appStyles.input}
      />
      <TouchableOpacity onPress={editingId ? saveGoal : addGoal} style={appStyles.button}>
        <Text style={appStyles.buttonText}>{editingId ? "Save Goal" : "Add Goal"}</Text>
      </TouchableOpacity>
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[appStyles.goalItem, {width: "100% "}]}>
          <TouchableOpacity
                onPress={() =>
                  setSelectedGoalId(selectedGoalId === item.id ? null : item.id)
                }
              >
              <Text style={[appStyles.goalText, item.completed && appStyles.completedGoal]}>
                {item.text}
              </Text>
              </TouchableOpacity>
              {selectedGoalId === item.id && (
              <View style={appStyles.goalButtons}>
                <TouchableOpacity onPress={() => toggleGoalCompletion(item.id)} style={appStyles.completeButton}>
                  <Text style={appStyles.buttonText}>{item.completed ? "Undo" : "Complete"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => editGoal(item.id)} style={appStyles.editButton}>
                  <Text style={appStyles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteGoal(item.id)} style={appStyles.deleteButton}>
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

