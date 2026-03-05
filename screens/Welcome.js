import { View, Text } from "react-native";
import appStyles from "../shared/appStyles";
import { SIZES } from "../shared/constants";

export default function Welcome({ loggedUser }) {
  return (
    <View style={appStyles.screen}>
      <Text>Weclome {loggedUser.user} </Text>
    </View>
  );
}
