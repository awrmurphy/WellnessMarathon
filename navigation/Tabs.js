import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Welcome from "../screens/Welcome";
import Goals from "../screens/Goals";
import Journal from "../screens/Journal";
import Profile from "../screens/Profile";
import Progress from "../screens/Progress";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BaseTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerStyle: { backgroundColor: "#5eb326" } }}
    >
      <Tab.Screen name="Welcome" component={Welcome} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Goals" component={Goals} />
      <Tab.Screen name="Journal" component={Journal} />
      <Tab.Screen name="Progress" component={Progress} />
    </Tab.Navigator>
  );
}

export default function Tabs() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BaseTabs}
          options={{
            title: "Wellness Marathon",
            headerStyle: { backgroundColor: "#ee4c4c" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
