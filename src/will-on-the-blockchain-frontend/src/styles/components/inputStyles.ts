import {inputAnatomy} from "@chakra-ui/anatomy";
import {createMultiStyleConfigHelpers} from "@chakra-ui/react";

const {definePartsStyle, defineMultiStyleConfig} =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const variantOutline = definePartsStyle({
  // define the part you're going to style
  field: {
    _focusVisible: {
      borderColor: "gold.500",
      boxShadow: "0 0 0 2px gold.500",
    },
  },
  addon: {},
  element: {},
});

const variants = {
  outline: variantOutline,
};

export const inputTheme = defineMultiStyleConfig({
  variants,
  defaultProps: {variant: "outline"},
});
