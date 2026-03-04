import { StyleSheet } from "react-native";
import { COLORS } from "./constants";

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACK,
    justifyContent: "center",
    textAlign: "center",
  },
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.SCREEN,
  },
});

export default appStyles;
