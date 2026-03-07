import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import appStyles from "../shared/appStyles";

export default function Converter() {
  const [lbs, setLbs] = useState("");

  const kg = lbs ? (parseFloat(lbs) / 2.20462).toFixed(2) : "0.00";

  return (
    <View style={appStyles.widgetBox}>
      <Text style={appStyles.headerText}>Lbs to Kg Converter</Text>
      <View>
        <TextInput
          style={appStyles.plainText}
          placeholder="Weight in lbs"
          keyboardType="numeric"
          value={lbs}
          onChangeText={setLbs}
        />
        <Text style={appStyles.plainText}> → </Text>
        <Text style={appStyles.plainText}>{kg} kg</Text>
      </View>
    </View>
  );
}
