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
    padding: { screen: number; modal: number; med: number };
    space: { small: number; med: number; large: number };
  }
  export interface Colors {
    box: string;
    text: string;
    textFaded: string;
    background: string;
    backdrop: string;
    dropdown: string;
    barTransparent: string;
    barSolid: string;
  }

  export interface FullTheme {
    colors: RecursivePartial<Colors>;
    layout: Partial<Layout>;
    fontSize: Partial<FontSize>;
  }
}

const mainTheme: Theme = {
  colors: {
    primary: "#d8a200",
    box: "black",
    text: "black",
    textFaded: "#333",
    background: "#fff",
    backdrop: "rgba(0,0,0,0.4)",
    barTransparent: "rgba(20,20,20,0.9)",
    barSolid: "rgba(20,20,20,1)",
    dropdown: "#333",
  },
  layout: {
    borderRadius: { default: 10, large: 15, small: 5 },
    padding: { screen: 10, modal: 30, med: 10 },
    space: {
      small: 6,
      med: 10,
      large: 20,
    },
  },
  fontSize: {
    h1: 26,
    h2: 20,
    h3: 20,
    p: 15,
    formHelperText: 10,
  },
};

const lightThemeColors: Theme = {
  colors: {
    grey0: "#bbb",
    grey1: "#222",
    grey2: "#888",
    grey3: "#ddd",
    grey4: "#eee",
    grey5: "#fff",
    black: "#000",
    box: "#ddd",
    text: "#060606",
    textFaded: "#333",
    background: "#fff",
    dropdown: "#bbb",
    barTransparent: "rgba(240,240,240,0.98)",
    barSolid: "rgba(240,240,240,1)",
  },
};

const darkThemeColors: Theme = {
  colors: {
    grey0: "#121212",
    grey1: "#181818",
    grey2: "#282828",
    grey3: "#333",
    grey4: "#b3b3b3",
    grey5: "#aeaeae",
    black: "#fff",
    box: "#222",
    text: "#eaeaea",
    textFaded: "#aaa",
    background: "#040404",
    dropdown: "#1a1a1a",
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
