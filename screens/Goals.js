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
import { addGoal, toggleGoalCompletion, deleteGoal, editGoal } from "../Redux/goalsReducer";

export default function Goals() {

     const dispatch = useDispatch();
     const goals = useSelector((state) => state.goals.goals);

     const [goalText, setGoalText] = useState("");
     const [editingId, setEditingId] = useState(null);
     const [selectedGoalId, setSelectedGoalId] = useState(null);
    //  dispatch(addGoal({ id: Date.now().toString(), text: "New Goal", completed: false }));
    //  dispatch(deleteGoal(goalId));
    //  dispatch(editGoal({ id: goalId, title: "Updated Goal", description: "Updated Description" }));
    //  dispatch(toggleGoalCompletion(goalId));


  const addGoalHandler = () => {
    if (goalText.trim()) {
      dispatch(addGoal({ id: Date.now().toString(), text: goalText, completed: false }));
      setGoalText("");
    }
  };
  const handleSaveGoal = () => {
    if (goalText.trim() ||  !editingId) return;
    dispatch(editGoal({ id: editingId, text: goalText }));
      setGoalText("");
      setEditingId(null);
  };

  const handleToggleGoalCompletion = (id) => {
    dispatch(toggleGoalCompletion(id));
  };
  const handleDeleteGoal = (id) => {
    dispatch(deleteGoal(id));
  };

  const editGoal = (id) => {
    const goal = goals.find(g => g.id === id);
    if (goal) {
      setGoalText(goal.text);
      setEditingId(id);
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
      <TouchableOpacity
        onPress={editingId ? handleSaveGoal : addGoalHandler}
        style={appStyles.button}
      >
        <Text style={appStyles.buttonText}>
          {editingId ? "Save Goal" : "Add Goal"}
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
                  onPress={() => handleToggleGoalCompletion(item.id)}
                  style={appStyles.completeButton}
                >
                  <Text style={appStyles.buttonText}>
                    {item.completed ? "Undo" : "Complete"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => editGoal(item.id)}
                  style={appStyles.editButton}
                >
                  <Text style={appStyles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteGoal(item.id)}
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
