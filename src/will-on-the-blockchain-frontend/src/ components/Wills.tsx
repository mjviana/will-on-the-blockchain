import {useMoralis, useWeb3Contract} from "react-moralis";
import {abi, contractAddresses} from "../constants";
import {useEffect, useState} from "react";
import {BlockchainWill} from "../types";

interface contractAddressesInterface {
  [key: string]: string[];
}

const Wills = () => {
  const {chainId: chainIdHex, isWeb3Enabled} = useMoralis();
  const [wills, setWills] = useState<BlockchainWill.WillStructOutput[]>([]);

  const addresses: contractAddressesInterface = contractAddresses;
  const chainId: string = parseInt(chainIdHex!).toString();

  console.log("chainId", chainId);
  console.log("Addresses", addresses);

  const blockchainWillAddress =
    chainId in addresses ? addresses[chainId][0] : null;

  console.log("blockchainWillAddress", blockchainWillAddress);

  const {runContractFunction: getPublicWills} = useWeb3Contract({
    abi,
    contractAddress: blockchainWillAddress!,
    functionName: "getPublicWills",
  });

  useEffect(() => {
    updateUI();
  }, [isWeb3Enabled]);

  async function updateUI() {
    const wills = (await getPublicWills()) as BlockchainWill.WillStructOutput[];
    setWills(wills);
  }

  return (
    <div>
      {isWeb3Enabled ? (
        <>
          Wills:
          {wills?.map((w, i) => (
            <h1 key={i}>{w.will}</h1>
          ))}
        </>
      ) : (
        <p>Web3 is not enabled. Please enable it to view the wills.</p>
      )}
    </div>
  );
};

export default Wills;
