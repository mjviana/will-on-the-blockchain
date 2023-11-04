import {Flex, HStack, Link, Spacer} from "@chakra-ui/react";
import {BiBookHeart} from "react-icons/bi";
import ColorModeSwitch from "./ColorModeSwitch";
import ManualConnectWallet from "./ManualConnecTWallet";

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
          <ManualConnectWallet />
        </HStack>
      </Flex>

      {/* <HStack justifyContent={"space-between"}>
        <HStack padding="10px" justifyContent={"flex-start"}>
          <Book fontSize="60px" />
          <Link>Public Wills</Link>
          <Link>Create a Will</Link>
          <Link>How to</Link>
        </HStack>
        <HStack justifyContent={"flex-end"}>
          <div className="custom-connect-button-wrapper">
            <ConnectButton moralisAuth={false} />
          </div>
          <ColorModeSwitch />
        </HStack>
      </HStack> */}
    </>
  );
};

export default Navbar;
