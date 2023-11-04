import {IconButton, useColorMode} from "@chakra-ui/react";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";

const ColorModeSwitch = () => {
  const {toggleColorMode, colorMode} = useColorMode();
  return (
    // <Switch
    //   src="../assets/react.svg"
    //   display="flex"
    //   alignItems="center"
    //   colorScheme="purple"
    //   id="color-mode"
    //   onChange={toggleColorMode}
    // >
    //   {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    // </Switch>

    <IconButton
      display="flex"
      alignItems="center"
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      aria-label={"Color mode switch"}
    ></IconButton>

    // <div style={{display: "flex", alignItems: "center"}}>
    //   <Switch colorScheme="purple" id="color-mode" onChange={toggleColorMode} />
    //   <span style={{marginLeft: "8px"}}>
    //     {colorMode === "light" ? <SunIcon /> : <MoonIcon />}
    //   </span>
    // </div>
  );
};

export default ColorModeSwitch;
