import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import appStyles from "../shared/appStyles";

export default function Login({ users, setUsers, setLoggedUser }) {
  const nav = useNavigation();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const val = () => {
    const foundUser = users.find((u) => u.user === user && u.pass === pass);

    if (foundUser) {
      setLoggedUser(foundUser);
    } else {
      alert("Invalid credentials");
      setUser("");
      setPass("");
    }
  };
  const ver = () => {
    const foundUser = users.find((u) => u.user === user);
    if (!foundUser) {
      if (user && pass) {
        setUsers([...users, { user, pass }]);
        alert("Account Created!");
        const newUser = users.find((u) => u.user === user);
        setLoggedUser(newUser);
      }
    } else if (!user || !pass) {
      alert("Please enter both a username and password.");
    } else {
      alert("Username Taken!");
    }
  };

  return (
    <ScrollView style={appStyles.login}
      contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
      <View style={{ width: "80%", maxWidth: 400 }}>
        <Text style={appStyles.headerText}>Username: </Text>
        <TextInput
          style={appStyles.input}
            value={user}
          onChangeText={setUser}
          placeholder="Username "
          inputMode="text"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={appStyles.headerText}>Password: </Text>
        <TextInput
          style={appStyles.input}
          value={pass}
          onChangeText={setPass}
          placeholder="password"
          secureTextEntry={true}
          inputMode="text"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={appStyles.buttonHome}>
          <TouchableOpacity style={appStyles.generalButton} onPress={val}>
            <Text>Log In </Text>
          </TouchableOpacity>
          <TouchableOpacity style={appStyles.generalButton} onPress={ver}>
            <Text>Register </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
