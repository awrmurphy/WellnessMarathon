import { View, Text, FlatList, StyleSheet } from "react-native";
import appStyles from "../shared/appStyles";

export default function Progress({ goals = [] }) {
  const totalGoals = goals.length;
  const completedGoals = goals.filter((goal) => goal.completed).length;
  const progressPercentage =
    totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;
  return (
    <View style={appStyles.screen}>
      <Text style={appStyles.headerText}>Your Progress</Text>
      <View style={appStyles.progressBarContainer}>
        <View
          style={[appStyles.progressBar, { width: `${progressPercentage}%` }]}
        />
      </View>
      <Text
        style={appStyles.progressText}
      >{`You have completed ${completedGoals} out of ${totalGoals} goals (${progressPercentage.toFixed(2)}%)`}</Text>
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={appStyles.goalItem}>
            <Text
              style={
                item.completed
                  ? [appStyles.completedGoal, { color: "green" }]
                  : [appStyles.incompleteGoal, { color: "red" }]
              }
            >
              {" "}
              {item.text}{" "}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
