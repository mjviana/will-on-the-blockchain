import {Flex, HStack, Link, Spacer} from "@chakra-ui/react";
import {BiBookHeart} from "react-icons/bi";
import ColorModeSwitch from "./ColorModeSwitch";
import {ConnectButton} from "@rainbow-me/rainbowkit";

const Navbar = () => {
  return (
    <>
      <Flex paddingLeft={5} paddingRight={5} display="flex" alignItems="center">
        <BiBookHeart fontSize="60px" />
        <Spacer />
        <Link>Public Wills</Link>
        <Spacer />
        <Link>Create a Will</Link>
        <Spacer />
        <Link>How to</Link>
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
