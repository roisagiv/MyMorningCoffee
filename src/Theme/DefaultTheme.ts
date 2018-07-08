import { DefaultTheme as Theme } from "react-native-paper";
import { Font } from "./Fonts";

export const DefaultTheme = {
  ...Theme,
  colors: {
    ...Theme.colors,
    accent: "#81d4fa",
    primary: "#ffffff"
  },
  fonts: {
    light: Font.ComfortaaLight,
    medium: Font.ComfortaaBold,
    regular: Font.Comfortaa,
    thin: Font.ComfortaaLight
  },
  roundness: 4
};
