import {
  TouchableOpacity,
  Platform,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
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
import { COLORS } from "../shared/constants";
import { logout } from "../Redux/loginReducer";

import { useSelector, useDispatch } from "react-redux";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName, focused, color, size) => {
  let iconName;

  const icons = {
    Welcome: focused
      ? { icon: "home", color: COLORS.ACTIVE }
      : { icon: "home", color: COLORS.INACTIVE },
    Profile: focused
      ? { icon: "user", color: COLORS.ACTIVE }
      : { icon: "user", color: COLORS.INACTIVE },
    Goals: focused
      ? { icon: "flag", color: COLORS.ACTIVE }
      : { icon: "flag", color: COLORS.INACTIVE },
    Journal: focused
      ? { icon: "open-book", color: COLORS.ACTIVE }
      : { icon: "book", color: COLORS.INACTIVE },
    Progress: focused
      ? { icon: "bar-graph", color: COLORS.ACTIVE }
      : { icon: "bar-graph", color: COLORS.INACTIVE },
  };

  iconName = icons[routeName] || "help-circle-outline";

  return <Entypo name={iconName.icon} size={size} color={iconName.color} />;
};

function BaseTabs() {
  const dispatch = useDispatch();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: COLORS.NAV,
        },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
        headerTitleContainerStyle: {},
        headerTitle: () => (
          <View
            style={{
              marginTop: "-25%",
              height: "100%",
            }}
          >
            <Text style={appStyles.headerText}> Wellness Marathon </Text>
            <Text style={appStyles.subHead}> {route.name} </Text>
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() => dispatch(logout())}
            title="Log Out"
            color={Platform.OS === "ios" ? "#fff" : "#ee4c4c"}
          >
            <Entypo name="log-out" size={24} color="#fff" />
          </TouchableOpacity>
        ),
        tabBarIcon: ({ focused, color, size }) =>
          getTabBarIcon(route.name, focused, color, size),

        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: COLORS.INACTIVE,
        tabBarStyle: { backgroundColor: COLORS.NAV, paddingTop: "3%" },
      })}
    >
      <Tab.Screen name="Welcome" component={Welcome} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Goals" component={Goals} />
      <Tab.Screen name="Progress" component={Progress} />
      <Tab.Screen name="Journal" component={Journal} />
    </Tab.Navigator>
  );
}

export default function Tabs() {
  const loggedUser = useSelector((state) => state.login.currentUser);
  const isLoading = useSelector((state) => state.login.isLoading);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.ACTIVE} />
        <Text style={{ marginTop: 10, color: COLORS.ACTIVE }}>
          Loading your profile...{" "}
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loggedUser == null ? (
          <Stack.Screen
            name="Log In"
            component={Login}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Main"
            component={BaseTabs}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
