import { StatusBar } from "expo-status-bar";
import Root from "./navigation/Root";
import appStyles from "./shared/appStyles";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={appStyles.container}>
        <Root />
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
