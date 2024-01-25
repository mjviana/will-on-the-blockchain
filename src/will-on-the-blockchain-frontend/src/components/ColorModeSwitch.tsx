import {IconButton, useColorMode} from "@chakra-ui/react";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";

const ColorModeSwitch = () => {
  const {toggleColorMode, colorMode} = useColorMode();
  return (
    <IconButton
      display="flex"
      alignItems="center"
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      aria-label={"Color mode switch"}
    ></IconButton>
  );
};

export default ColorModeSwitch;
