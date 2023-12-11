import {Flex, HStack, Spacer, Link} from "@chakra-ui/react";
import {BiBookHeart} from "react-icons/bi";
import ColorModeSwitch from "./ColorModeSwitch";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {Link as ReactRouterLink} from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Flex paddingLeft={5} paddingRight={5} display="flex" alignItems="center">
        <Link as={ReactRouterLink} to={"/"}>
          <BiBookHeart fontSize="60px" />
        </Link>
        <Spacer />
        <Link as={ReactRouterLink} to={"/public-wills"}>
          Public Wills
        </Link>
        <Spacer />
        <Link as={ReactRouterLink} to={"/create-will"}>
          Create a Will
        </Link>
        <Spacer />
        <Link as={ReactRouterLink} to={"/how-to-create-will"}>
          How to
        </Link>
        <Spacer />
        <HStack justifyContent={"flex-end"}>
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
