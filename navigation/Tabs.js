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

const getTabBarIcon = (routeName, focused, color, size) => {
  let iconName;

  const icons = {
    Welcome: focused
      ? { icon: "home", color: "#ce5ffa" }
      : { icon: "home", color: "black" },
    Profile: focused
      ? { icon: "user", color: "#ce5ffa" }
      : { icon: "user", color: "black" },
    Goals: focused
      ? { icon: "flag", color: "#ce5ffa" }
      : { icon: "flag", color: "black" },
    Journal: focused
      ? { icon: "open-book", color: "#ce5ffa" }
      : { icon: "book", color: "black" },
    Progress: focused
      ? { icon: "bar-graph", color: "#ce5ffa" }
      : { icon: "bar-graph", color: "black" },
  };

  iconName = icons[routeName] || "help-circle-outline";

  return <Entypo name={iconName.icon} size={size} color={iconName.color} />;
};

function BaseTabs({ loggedUser, setLoggedUser }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: "#5eb326" },
        headerTintColor: "#fff",
        headerRight: () => (
          <TouchableOpacity
            onPress={() => setLoggedUser(null)}
            title="Log Out"
            color={Platform.OS === "ios" ? "#fff" : "#ee4c4c"}
          >
            <Entypo name="log-out" size={24} color="black" />
          </TouchableOpacity>
        ),
        tabBarIcon: ({ focused, color, size }) =>
          getTabBarIcon(route.name, focused, color, size),

        tabBarActiveTintColor: "#5eb326",
        tabBarInactiveTintColor: "gray",
      })}
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
