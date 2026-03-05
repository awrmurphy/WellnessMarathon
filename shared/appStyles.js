import { StyleSheet } from "react-native";
import { COLORS } from "./constants";
//needed styles: button, alert, input,
/**
 * button style creates soft rounded button appearance with secondary colour
 *
 */
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
  login: {
    maxWidth: "50%",
    maxHeight: "50%",
    flex: 1,
    flexDirection: "COLOUMN",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default appStyles;
