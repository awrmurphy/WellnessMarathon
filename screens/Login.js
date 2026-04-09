import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useState } from "react";
import appStyles from "../shared/appStyles";

import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../Redux/loginReducer";

export default function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (username && password) {
      try {
        await dispatch(loginUser({ username, password })).unwrap();
      } catch (err) {
        Alert.alert("Login Failed", err);
      }
    } else {
      Alert.alert("Error", "Please fill in all fields.");
    }
  };
  const handleRegister = async () => {
    if (username && password) {
      try {
        await dispatch(registerUser({ username, password })).unwrap();
        Alert.alert("Success", "Account Created!");
      } catch (err) {
        Alert.alert("Registration Failed", err);
      }
    } else {
      Alert.alert("Error", "Please fill in all fields.");
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
          <TouchableOpacity
            style={appStyles.generalButton}
            onPress={handleLogin}
          >
            <Text style={appStyles.buttonFont}>Log In </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={appStyles.generalButton}
            onPress={handleRegister}
          >
            <Text style={appStyles.buttonFont}>Register </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
