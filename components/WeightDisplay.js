import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import appStyles from "../shared/appStyles";

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
    <View style={appStyles.widgetBox}>
      <Text style={[appStyles.plainText, { textDecorationLine: "underline" }]}>
        Current Weight:
      </Text>
      <Text style={appStyles.plainText}> {currentWeight?.weight} kg </Text>
      {currentWeight ? (
        <Text style={appStyles.buttonFont}> Last Recorded: {date} </Text>
      ) : null}

      <View>
        <TextInput
          style={appStyles.plainText}
          placeholder="New weight..."
          keyboardType="numeric"
          value={newWeight}
          onChangeText={setNewWeight}
        />
        <View style={appStyles.buttonHome}>
          <TouchableOpacity
            style={appStyles.generalButton}
            onPress={() => {
              onUpdate(newWeight);
              setNewWeight("");
            }}
          >
            <Text style={appStyles.buttonFont}> Update </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={appStyles.generalButton}
            onPress={clearHistory}
          >
            <Text style={appStyles.buttonFont}> Clear All History </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
