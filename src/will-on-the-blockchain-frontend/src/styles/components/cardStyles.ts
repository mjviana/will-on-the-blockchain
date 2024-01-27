import {cardAnatomy} from "@chakra-ui/anatomy";
import {createMultiStyleConfigHelpers} from "@chakra-ui/react";

const {definePartsStyle, defineMultiStyleConfig} =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    bg: "gold.500",
    borderRadius: "15px",
    _dark: {
      bg: "gold.700",
    },
    _hover: {
      cursor: "pointer",
    },
  },
  header: {},
  body: {},
  footer: {},
});

export const cardTheme = defineMultiStyleConfig({baseStyle});
