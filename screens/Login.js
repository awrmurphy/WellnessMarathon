import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { use, useState } from "react";
import appStyles from "../shared/appStyles";

import { useSelector, useDispatch } from "react-redux";
import {login, register } from "../Redux/loginReducer";

export default function Login() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.login.users);
  const nav = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateLogin = () => {
    const foundUser = users.find((u) => u.user === username && u.pass === password);

    if (foundUser) {
      dispatch(login({ user: username, pass: password }));
    } else {
      alert("Invalid credentials");
      setUsername("");
      setPassword("");
    }
  };
  const verifyRegistration = () => {
    const existingUser = users.find((u) => u.user === username);
    if (!existingUser) {
      if (username && password) {
        dispatch(register({ user: username, pass: password }));
        alert("Account Created!");
        const newUser = users.find((u) => u.user === username);
        dispatch(login({ user: username, pass: password }));
      }
    } else if (!username || !password) {
      alert("Please enter both a username and password.");
    } else {
      alert("Username Taken!");
    }
  };

  return (
    <ScrollView
      style={appStyles.login}
      contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
    >
      <View style={{ width: "80%", maxWidth: 400 }}>
        <Text style={appStyles.headerText}>Username: </Text>
        <TextInput
          style={appStyles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Username "
          inputMode="text"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={appStyles.headerText}>Password: </Text>
        <TextInput
          style={appStyles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="password"
          secureTextEntry={true}
          inputMode="text"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={appStyles.buttonHome}>
          <TouchableOpacity style={appStyles.generalButton} onPress={validateLogin}>
            <Text style={appStyles.buttonFont}>Log In </Text>
          </TouchableOpacity>
          <TouchableOpacity style={appStyles.generalButton} onPress={verifyRegistration}>
            <Text style={appStyles.buttonFont}>Register </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
