import { Theme } from "react-native-elements";

type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };

declare module "react-native-elements" {
  export interface FontSize {
    h1: number;
    h2: number;
    h3: number;
    p: number;
    formHelperText: number;
  }
  export interface Layout {
    borderRadius: { default: number; large: number; small: number };
    padding: { screen: number };
    space: { small: number; med: number; large: number };
  }
  export interface Colors {
    box: string;
    text: string;
  }

  export interface FullTheme {
    colors: RecursivePartial<Colors>;
    layout: Partial<Layout>;
    fontSize: Partial<FontSize>;
  }
}

const mainTheme: Theme = {
  colors: { primary: "#ffbf00", box: "black", text: "black" },
  layout: {
    borderRadius: { default: 10, large: 15, small: 5 },
    padding: { screen: 10 },
    space: {
      small: 6,
      med: 10,
      large: 20,
    },
  },
  fontSize: {
    h1: 20,
    h2: 17,
    h3: 12,
    p: 10,
    formHelperText: 10,
  },
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

const replaceColorsFromTheme = (themeToAddColorsFrom: Theme): Theme => ({
  ...mainTheme,
  colors: { ...mainTheme.colors, ...themeToAddColorsFrom.colors },
});

export const theme: Themes = {
  dark: replaceColorsFromTheme(darkThemeColors),
  light: replaceColorsFromTheme(lightThemeColors),
};
