import {IconButton, useColorMode} from "@chakra-ui/react";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";

interface ColorModeSwitchProps
{
  onClick(): void;
}

const ColorModeSwitch = ({onClick}: ColorModeSwitchProps) => {
  const {toggleColorMode, colorMode} = useColorMode();

function handleOnClick(): void{  
  toggleColorMode();
  onClick();
}

  return (
    <IconButton
      display="flex"
      alignItems="center"
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      onClick={handleOnClick}
      aria-label={"Color mode switch"}
    ></IconButton>
  );
};

export default ColorModeSwitch;
