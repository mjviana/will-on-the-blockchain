import {defineStyleConfig} from "@chakra-ui/react";

export const textTheme = defineStyleConfig({
  // Styles for the base style
  baseStyle: {},
  // Styles for the size variations
  sizes: {},
  // Styles for the visual style variations
  variants: {
    header: {
      fontFamily: "mono",
      fontSize: "3xl",
      fontWeight: "bold",

      color: "gold.500",

      _dark: {
        color: "gold.200",
      },
    },
  },
  // The default `size` or `variant` values
  defaultProps: {},
});
