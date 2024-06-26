"use client";

import {contractAddresses} from "../constants";
import React, {Fragment, useEffect, useState} from "react";
import {BlockchainWill} from "../types";
import {useReadContract} from "wagmi";
import {
  Box,
  Card,
  CardBody,
  SimpleGrid,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import WillCard from "./components/WillCard";
import WillCardContainer from "./components/WillCardContainer";
import {blockchainWillAbi} from "../constants/blockchainWillAbi";
import {Address} from "viem";

interface contractAddressesInterface {
  [key: string]: string[];
}

const PublicWillsPage = () => {
  const [wills, setWills] = useState<BlockchainWill.WillStructOutput[]>([]);
  const addresses: contractAddressesInterface = contractAddresses;
  const contractAddress = addresses["11155111"][
    addresses["11155111"].length - 1
  ] as Address; // sepolia chainId is 11155111. We use the last address of the array to make sure that the last deployed contract is used.

  const {isLoading, isFetching, data} = useReadContract({
    address: contractAddress,
    abi: blockchainWillAbi,
    functionName: "getPublicWills",
  });

  useEffect(() => {
    if (data) {
      console.log("wills", data);
      setWills(data as BlockchainWill.WillStructOutput[]);
    }
  }, [data]);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <>
      <Box p={10} maxW="1536px" mx="auto">
        {" "}
        {/* Set your desired max width and center the content */}
        <SimpleGrid columns={{sm: 1, md: 2, xl: 3}} spacing={6}>
          {isLoading ||
            (isFetching &&
              skeletons.map((skeleton) => (
                <Card w="350px" key={skeleton}>
                  <Skeleton borderRadius="15px" h="90px" />
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
