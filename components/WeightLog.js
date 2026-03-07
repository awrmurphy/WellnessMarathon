import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import appStyles from "../shared/appStyles";

export default function WeightLogForm({ onLog }) {
  const [weight, setWeight] = useState("");

  return (
    <View style={appStyles.widgetBox}>
      <Text style={appStyles.plainText}>
        Welcome! Let's start your Marathon!{" "}
      </Text>
      <Text style={appStyles.plainText}>
        Enter your starting weight to begin tracking.{" "}
      </Text>
      <TextInput
        style={appStyles.plainText}
        placeholder="00.0 kg"
        keyboardType="numeric"
        onChangeText={setWeight}
      />
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={[appStyles.generalButton, { width: "60%" }]}
          onPress={() => onLog(weight)}
        >
          <Text>Submit </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
