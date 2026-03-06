import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import appStyles from "../shared/appStyles";

export default function Converter() {
  const [lbs, setLbs] = useState("");

  const kg = lbs ? (parseFloat(lbs) / 2.20462).toFixed(2) : "0.00";

  return (
    <View style={appStyles.screen}>
      <Text>Lbs to Kg Helper</Text>
      <View>
        <TextInput
          placeholder="Weight in lbs"
          keyboardType="numeric"
          value={lbs}
          onChangeText={setLbs}
        />
        <Text> → </Text>
        <Text>{kg} kg</Text>
      </View>
    </View>
  );
}
