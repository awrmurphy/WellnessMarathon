import { View, Text, ActivityIndicator, Alert } from "react-native";
import { useState, useEffect } from "react";
import appStyles from "../shared/appStyles";
import WeightDisplay from "../components/WeightDisplay";
import WeightLogForm from "../components/WeightLog";
import Converter from "../components/Converter";
import { COLORS } from "../shared/constants";

export default function Welcome({ loggedUser }) {
  const [weight, setWeight] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_TOKEN = "f08b45fe576e04fbc3e5e0ad797a6b33a699dce3";

  const fetchLatestWeight = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://wger.de/api/v2/weightentry/", {
        headers: { Authorization: `Token ${API_TOKEN}` },
      });
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setWeight(data.results[data.results.length - 1]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestWeight();
  }, []);

  const handleWeight = async (value) => {
    if (!value) {
      Alert.alert("Error", "Please enter a weight value");
      return;
    }

    try {
      const rs = await fetch("https://wger.de/api/v2/weightentry/", {
        method: "POST",
        headers: {
          Authorization: `Token ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          weight: value,
          date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
        }),
      });

      const newweight = await rs.json();

      if (rs.ok) {
        Alert.alert("Success", "Weight logged successfully!");
        setWeight(newweight);
      }
    } catch (e) {
      Alert.alert("Connection Error", "Could not reach wger servers.");
    }
  };

  const historyPrompt = () => {
    Alert.alert(
      "WARNING",
      "Do you want to delete all previous weight records?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete Everything",
          onPress: clearHistory,
          style: "destructive",
        },
      ],
    );
  };

  const clearHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://wger.de/api/v2/weightentry/", {
        headers: { Authorization: `Token ${API_TOKEN}` },
      });
      const data = await res.json();

      const deletePromises = data.results.map((entry) =>
        fetch(`https://wger.de/api/v2/weightentry/${entry.id}/`, {
          method: "DELETE",
          headers: { Authorization: `Token ${API_TOKEN}` },
        }),
      );

      await Promise.all(deletePromises);

      setWeight(null);
      Alert.alert("Success", "History cleared.");
    } catch (e) {
      Alert.alert("Error", "Could not clear history.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <ActivityIndicator color={"#39d5e0"} style={{ flex: 1 }} size="large" />
    );

  return (
    <View style={appStyles.screen}>
      <Text style={appStyles.headerText}>Welcome {loggedUser?.user}! </Text>
      <View style={appStyles.widgetHome}>
        <Text style={appStyles.plainText}>Latest Weight Entry </Text>
        {weight ? (
          <WeightDisplay
            currentWeight={weight}
            onUpdate={handleWeight}
            clearHistory={historyPrompt}
          />
        ) : (
          <WeightLogForm onLog={handleWeight} />
        )}
      </View>
      <View style={appStyles.widgetHome}>
        <Converter />
      </View>
    </View>
  );
}
