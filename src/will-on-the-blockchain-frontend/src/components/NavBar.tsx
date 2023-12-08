import {Flex, HStack, Spacer} from "@chakra-ui/react";
import {BiBookHeart} from "react-icons/bi";
import ColorModeSwitch from "./ColorModeSwitch";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Flex paddingLeft={5} paddingRight={5} display="flex" alignItems="center">
        <Link to={"/"}>
          <BiBookHeart fontSize="60px" />
        </Link>
        <Spacer />
        <Link to={"/public-wills"}>Public Wills</Link>
        <Spacer />
        <Link to={"/create-will"}>Create a Will</Link>
        <Spacer />
        <Link to={"/how-to-create-will"}>How to</Link>
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
