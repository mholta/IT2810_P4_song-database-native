import { Theme } from "react-native-elements";
import { theme } from "../styles/theme";
import useColorScheme from "./useColorScheme";

export const useChooseTheme = (colorScheme: "light" | "dark"): Theme =>
  colorScheme === "dark" ? theme.dark : theme.light;
