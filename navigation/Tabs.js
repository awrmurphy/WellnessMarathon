import { TouchableOpacity, Platform, View, Text } from "react-native";
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
import appStyles from "../shared/appStyles";

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

function BaseTabs({
  loggedUser,
  setLoggedUser,
  goals,
  setGoals,
  journalEntries,
  setJournalEntries,
}) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: "#5eb326",
          borderColor: "red",
          borderWidth: 1,
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerTitleContainerStyle: {
          left: -115,
          bottom: 0,
        },
        headerTitle: () => (
          <View
            style={{
              marginTop: -85,
              alignItems: "flex-start",
              justifyContent: "flex-end",
              borderColor: "red",
              borderWidth: 1,
              height: "100%",
              flex: 1,
            }}
          >
            <Text style={appStyles.headerText}> Wellness Marathon </Text>
            <Text
              style={{
                fontSize: 18,
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              {" "}
              {route.name}{" "}
            </Text>
          </View>
        ),
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
      <Tab.Screen name="Profile">
        {(props) => (
          <Profile
            {...props}
            loggedUser={loggedUser}
            goals={goals}
            journalEntries={journalEntries}
            setJournalEntries={setJournalEntries}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Goals">
        {(props) => <Goals {...props} goals={goals} setGoals={setGoals} />}
      </Tab.Screen>
      <Tab.Screen name="Progress">
        {(props) => <Progress {...props} goals={goals} />}
      </Tab.Screen>
      <Tab.Screen name="Journal">
        {(props) => (
          <Journal
            {...props}
            journalEntries={journalEntries}
            setJournalEntries={setJournalEntries}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function Tabs() {
  const [users, setUsers] = useState([{ user: "admin", pass: "admin" }]);
  const [loggedUser, setLoggedUser] = useState(null);
  const [goals, setGoals] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
                goals={goals}
                setGoals={setGoals}
                journalEntries={journalEntries}
                setJournalEntries={setJournalEntries}
              />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
