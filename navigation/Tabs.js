import { TouchableOpacity, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import Welcome from "../screens/Welcome";
import Goals from "../screens/Goals";
import Journal from "../screens/Journal";
import Profile from "../screens/Profile";
import Progress from "../screens/Progress";
import Login from "../screens/Login";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BaseTabs({ loggedUser, setLoggedUser }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#5eb326" },
        headerRight: () => (
          <TouchableOpacity
            onPress={() => setLoggedUser(null)}
            title="Log Out"
            color={Platform.OS === "ios" ? "#fff" : "#ee4c4c"}
          >
            <Entypo name="log-out" size={24} color="black" />
          </TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen name="Welcome">
        {(props) => <Welcome {...props} loggedUser={loggedUser} />}
      </Tab.Screen>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Goals" component={Goals} />
      <Tab.Screen name="Journal" component={Journal} />
      <Tab.Screen name="Progress" component={Progress} />
    </Tab.Navigator>
  );
}

export default function Tabs() {
  const [users, setUsers] = useState([{ user: "admin", pass: "admin" }]);
  const [loggedUser, setLoggedUser] = useState(null);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          title: "Wellness Marathon",
        }}
      >
        {loggedUser == null ? (
          <Stack.Screen name="Log In">
            {(props) => (
              <Login
                {...props}
                users={users}
                setUsers={setUsers}
                setLoggedUser={setLoggedUser}
              />
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen
            name="Main"
            options={{
              headerShown: false,
            }}
          >
            {(props) => (
              <BaseTabs
                {...props}
                loggedUser={loggedUser}
                setLoggedUser={setLoggedUser}
              />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
