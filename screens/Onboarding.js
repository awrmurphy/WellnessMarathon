import { db } from "../config/firebase.config";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RadioButton, Switch } from "react-native-paper";
import { COLORS } from "../shared/constants";
import appStyles from "../shared/appStyles";
import { onBoard } from "../Redux/loginReducer";
import { setGoals } from "../Redux/goalsReducer";
import { useRoute } from "@react-navigation/native";

const Onboarding = () => {
  const loggedUser = useSelector((state) => state.login.currentUser);
  const route = useRoute();
  const isEditMode = route.name === "EditProfile" || loggedUser?.name;


  const [name, setName] = useState(loggedUser?.name || "");
  const [email, setEmail] = useState(loggedUser?.email || "");
  const [theme, setTheme] = useState(
    loggedUser?.preferences?.theme || "Light"
  );
  const [notifications, setNotifications] = useState(
    loggedUser?.preferences?.notifications || false
  );
  const [initialGoal, setInitialGoal] = useState("");
  const dispatch = useDispatch();




  const handlePress = async () => {
    if (!name || !email) {
      Alert.alert("Error", "Please enter name and email");
      return;
    }

    try {
      if (!loggedUser?.username) return;
      const userRef = doc(db, "users", loggedUser.username);

      const newGoal =
        initialGoal && !isEditMode
          ? { id: Date.now().toString(), text: initialGoal, completed: false }
          : null;

      await updateDoc(userRef, {
        name,
        email,
        preferences: { theme, notifications },
        ...(newGoal ? { goals: [newGoal] } : {}),
      });

      dispatch(
        onBoard({
          name,
          email,
          preferences: { theme, notifications },
        })
      );

      if (newGoal) {
        dispatch(setGoals([newGoal]));
      }

      Alert.alert(
        "Success",
        isEditMode ? "Profile updated!" : "Setup complete!"
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
<KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
  <ScrollView style={{ flex: 1, backgroundColor: appStyles.screen.backgroundColor }} contentContainerStyle={{ padding: appStyles.screen.padding }}>
      <Text style={appStyles.headerText}>
  {isEditMode ? "Edit Profile" : "Let's set up your profile"}</Text>


      <Text> Full Name: </Text>
      <TextInput style={[appStyles.input, { width: "90%" }]} value={name} onChangeText={setName} />
      <Text> Email Address: </Text>
      <TextInput
        style={[appStyles.input, { width: "90%" }]}
        value={email}
        onChangeText={setEmail}
      />
      <Text> Theme Preference: </Text>
      <View style={{ flexDirection: "row" }}>
        <RadioButton
          value="Light"
          status={theme === "Light" ? "checked" : "unchecked"}
          onPress={() => setTheme("Light")}
          color={theme === "Light" ? COLORS.ACTIVE : COLORS.INACTIVE}
        />
        <Text> Light </Text>
        <RadioButton
          value="Dark"
          status={theme === "Dark" ? "checked" : "unchecked"}
          onPress={() => setTheme("Dark")}
          color={theme === "Dark" ? COLORS.ACTIVE : COLORS.INACTIVE}
        />
        <Text> Dark </Text>
      </View>
      <Text> Notifications: </Text>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            width: "auto",
          }}
        >
          {" "}
          {notifications ? " Enabled " : " Disabled "}{" "}
        </Text>
        <Switch
          style={{ width: "auto" }}
          value={notifications}
          onValueChange={(value) => setNotifications(value)}
          color={COLORS.ACTIVE}
        />
      </View>
      {!isEditMode && (
        <>
          <Text> First Goal (Optional): </Text>
          <TextInput
            style={[appStyles.input, { width: "100%" }]}
            value={initialGoal}
            onChangeText={setInitialGoal}
            placeholder="e.g. Drink more water"
          />
        </>
      )}
      <TouchableOpacity
        onPress={handlePress}
            style={[appStyles.button, { width: "70%", alignSelf: "center" }]}
          >
        <Text style={appStyles.buttonFont}>
          {isEditMode ? "Save Changes" : "Finish Setup"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Onboarding;
