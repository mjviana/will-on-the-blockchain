import {useMoralis} from "react-moralis";
import {useEffect} from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  TagLabel,
  TagRightIcon,
} from "@chakra-ui/react";
import {TfiWallet} from "react-icons/tfi";
import {SettingsIcon} from "@chakra-ui/icons";
import {BiExit} from "react-icons/bi";

function ManualConnectWallet() {
  const {
    enableWeb3,
    isWeb3Enabled,
    isWeb3EnableLoading,
    account,
    Moralis,
    deactivateWeb3,
  } = useMoralis();

  useEffect(() => {
    if (isWeb3Enabled) return;
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("connected")) {
        enableWeb3();
      }
    }
  }, [isWeb3Enabled, Moralis, deactivateWeb3, enableWeb3]);
  // no dependecy array: run anytime something re-renders
  // CAREFUL with this!! Because then you can get circular render
  // blank dependency array, run once on load / rerender
  // dependencies in the array, run anytime something in there changes

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log(`Account changed to ${account}`);
      if (account == null) {
        window.localStorage.removeItem("connected");
        deactivateWeb3();
        console.log("Null account found");
      }
    });
  }, [isWeb3Enabled, Moralis, deactivateWeb3]);

  return (
    <>
      {account ? (
        <div>
          <Menu>
            <MenuButton
              borderRadius="full"
              colorScheme="green"
              as={Button}
              leftIcon={<TfiWallet />}
              rightIcon={<SettingsIcon />}
            >
              {account.slice(0, 2)}...
              {account.slice(account.length - 4)}
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<BiExit />}
                onClick={() => {
                  deactivateWeb3();
                  window.localStorage.removeItem("connected");
                }}
              >
                Disconnect Wallet
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      ) : (
        <Button
          leftIcon={<TfiWallet />}
          onClick={async () => {
            // await walletModal.connect()
            const ret = await enableWeb3();
            if (typeof ret !== "undefined") {
              // depends on what button they picked
              if (typeof window !== "undefined") {
                window.localStorage.setItem("connected", "injected");
                // window.localStorage.setItem("connected", "walletconnect")
              }
            }
          }}
          disabled={isWeb3EnableLoading}
          aria-label={"Connect wallet"}
        >
          Connect Wallet
        </Button>
      )}
    </>
  );
}

export default ManualConnectWallet;
