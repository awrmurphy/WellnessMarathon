import { View, Text } from "react-native";
import appStyles from "../shared/appStyles";
import { SIZES } from "../shared/constants";

export default function Welcome() {
  return (
    <View style={appStyles.screen}>
      <Text>Weclome User </Text>
    </View>
  );
}
