import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function WeightLogForm({ onLog }) {
  const [weight, setWeight] = useState("");

  return (
    <View>
      <Text>Welcome! Let's start your Marathon! </Text>
      <Text>Enter your starting weight to begin tracking. </Text>
      <TextInput
        placeholder="00.0 kg"
        keyboardType="numeric"
        onChangeText={setWeight}
      />
      <TouchableOpacity onPress={() => onLog(weight)}>
        <Text>Submit </Text>
      </TouchableOpacity>
    </View>
  );
}
