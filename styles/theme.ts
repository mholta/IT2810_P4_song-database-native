import { Theme } from "react-native-elements";

declare module "react-native-elements" {
  export interface Colors {
    box: string;
    text: string;
  }
}

const mainTheme: Theme = {
  colors: { primary: "#ffbf00", box: "black", text: "black" },
};

const lightThemeColors: Theme = {
  colors: {
    grey0: "#000",
    grey1: "#222",
    grey2: "#888",
    grey3: "#ddd",
    grey4: "#eee",
    grey5: "#fff",
    black: "#000",
    box: "#ddd",
    text: "#060606",
  },
};

const darkThemeColors: Theme = {
  colors: {
    grey0: "#121212",
    grey1: "#181818",
    grey2: "#282828",
    grey3: "#404040",
    grey4: "#b3b3b3",
    grey5: "#aeaeae",
    black: "#fff",
    box: "#222",
    text: "#aeaeae",
  },
};

interface Themes {
  dark: Theme;
  light: Theme;
}

const addThemeColors = (colorsToAdd: Theme): Theme => ({
  ...mainTheme,
  colors: { ...mainTheme.colors, ...colorsToAdd.colors },
});

export const theme: Themes = {
  dark: addThemeColors(darkThemeColors),
  light: addThemeColors(lightThemeColors),
};
