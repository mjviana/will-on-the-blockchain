import {Flex, HStack, Spacer, Link} from "@chakra-ui/react";
import {BiBookHeart} from "react-icons/bi";
import ColorModeSwitch from "./ColorModeSwitch";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {Link as ReactRouterLink} from "react-router-dom";
import WillsMenu from "./WillsMenu";

const Navbar = () => {
  return (
    <>
      <Flex
        bg={"blackAlpha.900"}
        paddingLeft={5}
        paddingRight={5}
        display="flex"
        alignItems="center"
      >
        <Link as={ReactRouterLink} to={"/"}>
          <BiBookHeart fontSize="60px" />
        </Link>

        <Spacer />
        <HStack justifyContent={"flex-end"}>
          <WillsMenu />
          <ColorModeSwitch />
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
