import {extendTheme, type ThemeConfig, ColorHues} from "@chakra-ui/react";
import {buttonTheme} from "./styles/components/buttonStyles";
import {inputTheme} from "./styles/components/inputStyles";
import {textAreaTheme} from "./styles/components/textAreaStyles";
import {radioTheme} from "./styles/components/radioStyles";
import {cardTheme} from "./styles/components/cardStyles";
import {textTheme} from "./styles/components/textStyle";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  config,
  colors: {
    gray: {
      50: "#f5f5f5",
      100: "#e9e9e9",
      200: "#d9d9d9",
      300: "#c4c4c4",
      400: "#9d9d9d",
      500: "#7b7b7b",
      600: "#555555",
      700: "#434343",
      800: "#262626",
      900: "#000000",
    },
    gold: {
      50: "#fcf6e0",
      100: "#eee5bf",
      200: "#e2d39a",
      300: "#d5c275",
      400: "#c9b14f",
      500: "#b09736",
      600: "#897528",
      700: "#62541b",
      800: "#3c320d",
      900: "#171100",
    },
  },
  components: {
    Button: buttonTheme,
    Input: inputTheme,
    Textarea: textAreaTheme,
    Radio: radioTheme,
    Card: cardTheme,
    Text: textTheme,
  },
});

export default theme;
