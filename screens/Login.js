import { View, Text, TouchableOpacity, TextInput } from "react-native";
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
    <View style={appStyles.login}>
      <Text>Username: </Text>
      <TextInput
        value={user}
        onChangeText={setUser}
        placeholder="Username "
        inputMode="text"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text>Password: </Text>
      <TextInput
        value={pass}
        onChangeText={setPass}
        placeholder="password"
        secureTextEntry={true}
        inputMode="text"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity onPress={val}>
        <Text>Log In </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ver}>
        <Text>Register </Text>
      </TouchableOpacity>
    </View>
  );
}
