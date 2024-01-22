import {contractAddresses} from "../constants";
import {Fragment, useState} from "react";
import {BlockchainWill} from "../types";
import {Address, useContractRead} from "wagmi";
import {
  Box,
  Card,
  CardBody,
  SimpleGrid,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import WillCard from "../components/WillCard";
import WillCardContainer from "../components/WillCardContainer";
import {blockchainWillAbi} from "../constants/blockchainWillAbi";

interface contractAddressesInterface {
  [key: string]: string[];
}

const PublicWillsPage = () => {
  const [wills, setWills] = useState<BlockchainWill.WillStructOutput[]>([]);
  const addresses: contractAddressesInterface = contractAddresses;
  const contractAddress = addresses["11155111"][
    addresses["11155111"].length - 1
  ] as Address; // sepolia chainId is 11155111. We use the last address of the array to make sure that the last deployed contract is used.

  const {isLoading, isFetching} = useContractRead({
    address: contractAddress,
    abi: blockchainWillAbi,
    functionName: "getPublicWills",
    onSuccess(data: BlockchainWill.WillStructOutput[]) {
      console.log("wills", data);
      setWills(data as BlockchainWill.WillStructOutput[]);
    },
  });

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <>
      <Box p={10} maxW="1536px" mx="auto">
        {" "}
        {/* Set your desired max width and center the content */}
        <SimpleGrid columns={{sm: 1, md: 2, lg: 3, xl: 4}} spacing={6}>
          {isLoading ||
            (isFetching &&
              skeletons.map((skeleton) => (
                <Card key={skeleton}>
                  <Skeleton height="200px" />
                  <CardBody>
                    <SkeletonText />
                  </CardBody>
                </Card>
              )))}

          {wills?.map((w, i) => (
            <Fragment key={i}>
              <WillCardContainer>
                <WillCard will={w} />
              </WillCardContainer>
            </Fragment>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default PublicWillsPage;
