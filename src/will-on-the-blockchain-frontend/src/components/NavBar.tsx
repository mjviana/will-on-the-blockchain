import {Flex, HStack, Spacer, Show, IconButton, Text} from "@chakra-ui/react";
import {BiBookHeart} from "react-icons/bi";
import ColorModeSwitch from "./ColorModeSwitch";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {Link as ReactRouterLink} from "react-router-dom";
import WillsMenu from "./WillsMenu";

interface NavbarProps {
  onColorModeSwtchClicked(): void;
}

const Navbar = ({onColorModeSwtchClicked}: NavbarProps) => {
  return (
    <>
      <Flex px={15} display="flex" alignItems="center">
        <IconButton
          variant="link"
          aria-label="Home page"
          as={ReactRouterLink}
          to={"/"}
        >
          <BiBookHeart fontSize="60px" />
        </IconButton>
        <Show above="lg">
          <Text as={ReactRouterLink} to={"/"} px={5} variant="header">
            Will on the Blockchain
          </Text>
        </Show>

        <Spacer />
        <HStack justifyContent={"flex-end"}>
          <Show below="lg">
            <WillsMenu />
          </Show>
          <ColorModeSwitch onClick={onColorModeSwtchClicked} />
          {/* <div className="custom-connect-button-wrapper">
            <ConnectButton moralisAuth={false} />
          </div> */}
          {/* <ManualConnectWallet /> */}
          <ConnectButton />;
        </HStack>
      </Flex>
    </>
  );
};

export default Navbar;
