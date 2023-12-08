import {abi, contractAddresses} from "../constants";
import {useEffect, useState} from "react";
import {BlockchainWill} from "../types";
import {Address, useContractRead} from "wagmi";
import {Box, Button} from "@chakra-ui/react";
import {Text} from "@chakra-ui/react";

interface contractAddressesInterface {
  [key: string]: string[];
}

const PublicWillsPage = () => {
  const [wills, setWills] = useState<BlockchainWill.WillStructOutput[]>([]);
  const addresses: contractAddressesInterface = contractAddresses;
  const contractAddress = addresses["11155111"][0] as Address; // sepolia chainId is 11155111

  const readContract = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getPublicWills",
    onSuccess(data: BlockchainWill.WillStructOutput[]) {
      console.log("wills", data);
      updateUI();
    },
  });

  useEffect(() => {
    updateUI();
  }, [readContract.isSuccess]);

  async function updateUI() {
    setWills(readContract.data as BlockchainWill.WillStructOutput[]);
  }

  return (
    <>
      <Button onClick={() => readContract.refetch()}> Get Wills</Button>
      Wills:{" "}
      {wills?.map((w, i) => (
        <Box key={i} m={2} bg="blue.900">
          <h1>
            {w.testator.name} | Citizenship Id: {w.testator.citizenshipCardId} |
          </h1>
          <Text>Will: {w.will}</Text>
        </Box>
      ))}
    </>
  );
};

export default PublicWillsPage;
