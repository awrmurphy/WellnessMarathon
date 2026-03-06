import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function WeightDisplay({
  currentWeight,
  onUpdate,
  clearHistory,
}) {
  const [newWeight, setNewWeight] = useState("");
  const date = currentWeight?.date
    ? currentWeight.date.split("T")[0]
    : "No Date";

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "red",
        flex: 1,
        flexDirection: "column",
        width: "100%",
        padding: 5,
      }}
    >
      <Text>Current Weight:</Text>
      <Text>{currentWeight?.weight} kg</Text>
      {currentWeight ? <Text>Last Recorded: {date} </Text> : null}

      <View>
        <TextInput
          placeholder="New weight..."
          keyboardType="numeric"
          value={newWeight}
          onChangeText={setNewWeight}
        />
        <TouchableOpacity
          onPress={() => {
            onUpdate(newWeight);
            setNewWeight("");
          }}
        >
          <Text>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={clearHistory}>
          <Text>Clear All History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
