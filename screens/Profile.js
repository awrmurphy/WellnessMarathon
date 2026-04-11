import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import appStyles from "../shared/appStyles";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const loggedUser = useSelector((state) => state.login.currentUser);
  const goals = useSelector((state) => state.goals.goals);
  const journalEntries = useSelector((state) => state.journal.entries);
  const navigation = useNavigation();

  const user = loggedUser || {};
  const preferences = user.preferences || {
    notifications: false,
    theme: "Light",
  };
  const name = loggedUser?.name || loggedUser?.username || "Guest";
  const email = loggedUser?.email || "No Email Provided";
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  const avatarColor = `hsl(${(name.length * 42) % 360}, 70%, 50%)`;
  const avatar = `https://ui-avatars.com/api/?name=${initials}&background=${avatarColor.replace("hsl", "").replace(/\s/g, "")}&color=fff&size=128`;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: appStyles.screen.backgroundColor }}
      contentContainerStyle={{
        alignItems: "center",
        padding: appStyles.screen.padding,
      }}
    >
      <View style={[appStyles.avatar, { backgroundColor: avatarColor }]}>
        <Text style={{ color: "white", fontSize: 36, fontWeight: "bold" }}>
          {initials}
        </Text>
      </View>

      <View style={appStyles.stats}>
      <Text style={appStyles.statTitle}>Profile Info:</Text>

      <Text>Name: {name}</Text>
      <Text>Email: {email}</Text>
      <Text>Theme: {preferences.theme}</Text>
      <Text>
        Notifications: {preferences.notifications ? "Enabled" : "Disabled"}
      </Text>
    </View>



      <View style={appStyles.stats}>
        <Text style={appStyles.statTitle}>Stats:</Text>
        <Text>Workouts Completed: 0</Text>
        <Text>Goals set: {goals.length}</Text>
        <Text>
          Goals achieved: {goals.filter((goal) => goal.completed).length}
        </Text>
        <Text>Journal Entries: {journalEntries.length}</Text>
      </View>

      <View>
<TouchableOpacity
  style={appStyles.button}
  onPress={() => navigation.navigate("EditProfile")}
>
  <Text style={appStyles.buttonText}>Edit Profile</Text>
</TouchableOpacity>
      </View>
    </ScrollView>
  );
}
