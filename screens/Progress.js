import { View, Text, FlatList, StyleSheet} from "react-native";
import appStyles from "../shared/appStyles";
import { SIZES } from "../shared/constants";

export default function Progress({goals=[]}) {

    const totalGoals = goals.length;
    const completedGoals = goals.filter(goal => goal.completed).length;
    const progressPercentage = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;
    return (
        <View style={appStyles.screen}>
      <Text style={styles.header}>Your Progress</Text>
        <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
      </View>
      <Text style={styles.progressText}>{`You have completed ${completedGoals} out of ${totalGoals} goals (${progressPercentage.toFixed(2)}%)`}</Text>
     <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.goalItem}>
            <Text style={item.completed ? styles.completedGoal : styles.incompleteGoal}>{item.text}</Text>
          </View>
        )}
      />
    
    
    </View>
    );

}

const styles = StyleSheet.create({

  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  
  progressBarContainer: {
    width: "100%",
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },


  progressBar: {
    height: "100%",
    backgroundColor: "#5eb326",
    borderRadius: 10,
  },

  progressText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },

  goalItem: {
    padding: 15,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 10,
  },

  completedGoal: {
    textDecorationLine: "line-through",
    color: "green",
    fontSize: 16,
  },


  incompleteGoal: {
    color: "#333",
    fontSize: 16,
  },
});


