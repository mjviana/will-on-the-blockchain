import {Flex, HStack, Link, Spacer} from "@chakra-ui/react";
import {ConnectButton} from "@web3uikit/web3";
import {Book} from "@web3uikit/icons";
import ColorModeSwitch from "./ColorModeSwitch";

const Navbar = () => {
  return (
    <>
      <Flex display="flex" alignItems="center">
        <Book fontSize="60px" />
        <Spacer />
        <Link>Public Wills</Link>
        <Spacer />
        <Link>Create a Will</Link>
        <Spacer />
        <Link>How to</Link>
        <Spacer />
        <HStack justifyContent={"flex-end"}>
          <div className="custom-connect-button-wrapper">
            <ConnectButton moralisAuth={false} />
          </div>
          <ColorModeSwitch />
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
