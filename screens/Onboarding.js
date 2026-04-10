import { db } from "../config/firebase.config";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { doc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RadioButton, Switch } from "react-native-paper";
import { COLORS } from "../shared/constants";
import appStyles from "../shared/appStyles";
import { onBoard } from "../Redux/loginReducer";
import { setGoals } from "../Redux/goalsReducer";

const Onboarding = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState("Light");
  const [notifications, setNotifications] = useState(false);
  const [initialGoal, setInitialGoal] = useState("");
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.login.currentUser);

  const handlePress = async () => {
    if (!name || !email) {
      Alert.alert(
        "Error",
        "Please enter at least your name and email address to continue",
      );
      return;
    }
    try {
      const userRef = doc(db, "users", loggedUser.username);
      const newGoal = initialGoal
        ? { id: Date.now().toString(), text: initialGoal, completed: false }
        : null;
      await updateDoc(userRef, {
        name: name,
        email: email,
        preferences: { theme, notifications },
        goals: newGoal ? [newGoal] : [],
      });

      dispatch(
        onBoard({
          name: name,
          email: email,
          preferences: { theme, notifications },
        }),
      );

      if (newGoal) {
        dispatch(setGoals([newGoal]));
      }
    } catch (e) {
      console.error("Error updating profile: ", e);
    }
  };

  return (
    <ScrollView>
      <Text style={appStyles.headerText}>Let's set up your profile</Text>
      <Text> Full Name: </Text>
      <TextInput style={appStyles.input} value={name} onChangeText={setName} />
      <Text> Email Address: </Text>
      <TextInput
        style={appStyles.input}
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
      <Text> First Goal (Optional): </Text>
      <TextInput
        style={appStyles.input}
        value={initialGoal}
        onChangeText={setInitialGoal}
        placeholder="e.g. Drink more water"
      />
      <TouchableOpacity onPress={handlePress} style={appStyles.button}>
        <Text style={appStyles.buttonFont}> Finish Setup </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Onboarding;
