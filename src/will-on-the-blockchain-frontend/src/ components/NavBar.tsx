import {HStack, Link} from "@chakra-ui/react";
import {ConnectButton} from "@web3uikit/web3";
import {Book} from "@web3uikit/icons";

const Navbar = () => {
  return (
    <HStack padding="10px" justifyContent={"space-between"}>
      <Book fontSize="60px" />
      <Link>Public Wills</Link>
      <Link>Create a Will</Link>
      <Link>How to</Link>
      <div className="custom-connect-button-wrapper">
        <ConnectButton moralisAuth={false} />
      </div>
    </HStack>
  );
};

export default Navbar;
