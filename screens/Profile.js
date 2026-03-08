import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import appStyles from "../shared/appStyles";

export default function Profile({
  loggedUser,
  goals = [],
  journalEntries = [],
}) {
  const user = loggedUser || {};
  const preferences = user.preferences || {
    notifications: false,
    theme: "Light",
  };
  const username = user.user || " Guest ";
  const email = user.email || " Not logged in ";
  const initials = username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  const avatarColor = `hsl(${(username.length * 42) % 360}, 70%, 50%)`;
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
      <Text style={appStyles.username}>{username}</Text>
      <Text style={appStyles.email}>{email}</Text>

      {/* Add preferences back when edit profile/profile customization is fleshed out <View style={appStyles.preferences}>
        <Text style={appStyles.preferenceTitle}>Preferences:</Text>
        <Text>Theme: {preferences.theme}</Text>
        <Text>Notifications: {preferences.notifications ? "On" : "Off"}</Text>
      </View> */}

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
        {/* <TouchableOpacity style={appStyles.button}>
          <Text style={appStyles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={appStyles.button}>
          <Text style={appStyles.buttonText}>Logout</Text>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  );
}
