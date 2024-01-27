import {defineStyle, defineStyleConfig} from "@chakra-ui/react";

const outline = defineStyle({
  _focusVisible: {
    borderColor: "gold.500",
    boxShadow: "0 0 0 2px gold.500",
  },
});

export const textAreaTheme = defineStyleConfig({
  variants: {outline},
  defaultProps: {variant: "outline"},
});
