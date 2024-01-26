import {inputAnatomy} from "@chakra-ui/anatomy";
import {createMultiStyleConfigHelpers} from "@chakra-ui/react";

const {definePartsStyle, defineMultiStyleConfig} =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  field: {
    fontFamily: "mono", // change the font family // change the input text color
    _focusVisible: {
      borderColor: "gold",
      boxShadow: "0 0 0 1px gold",
    },
    _dark: {
      borderColor: "gray.600",
      background: "gray.600",
      color: "gray.400",
    },
  },
});

const pill = definePartsStyle({
  field: {
    _focusVisible: {
      borderColor: "gold",
      boxShadow: "0 0 0 1px gold",
    },
  },
  // addon: {
  //   _focusVisible: {
  //     borderColor: "red",
  //     background: "red",
  //   },
  // },
  // element: {
  //   _focusVisible: {
  //     borderColor: "green",
  //   },
  // },
});

export const inputTheme = defineMultiStyleConfig({variants: {baseStyle, pill}});
