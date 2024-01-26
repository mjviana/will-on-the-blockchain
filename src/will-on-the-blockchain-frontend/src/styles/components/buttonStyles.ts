import {defineStyle, defineStyleConfig} from "@chakra-ui/react";
import {mode} from "@chakra-ui/theme-tools";

const outline = defineStyle({
  border: "2px dashed", // change the appearance of the border
  borderRadius: 0, // remove the border radius
  fontWeight: "semibold", // change the font weight
});

const colorModeSelector = defineStyle((props) => ({
  bg: mode("gold.200", "gold.700")(props),
}));

export const buttonTheme = defineStyleConfig({
  defaultProps: {
    colorScheme: "gold",
  },
  variants: {outline, colorModeSelector},
});
