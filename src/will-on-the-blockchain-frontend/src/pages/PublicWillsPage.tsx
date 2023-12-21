import {abi, contractAddresses} from "../constants";
import {useEffect, useState} from "react";
import {BlockchainWill} from "../types";
import {Address, useContractRead} from "wagmi";
import {Box, SimpleGrid} from "@chakra-ui/react";
import WillCard from "../components/WillCard";
import WillCardContainer from "../components/WillCardContainer";

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
    <Box maxW="1536px" mx="auto">
      {" "}
      {/* Set your desired max width and center the content */}
      <SimpleGrid
        columns={{sm: 1, md: 2, lg: 3, xl: 4}}
        spacing={6}
        padding="10px"
      >
        {wills?.map((w, i) => (
          <>
            <WillCardContainer key={i}>
              <WillCard will={w} />
            </WillCardContainer>
          </>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default PublicWillsPage;
