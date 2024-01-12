import {Box, Spinner, Stack} from "@chakra-ui/react";
import React, { ChangeEvent, useState } from 'react'
import { Address } from 'viem';
import { useContractRead } from 'wagmi';
import SearchWill from '../components/SearchWill';
import SearchWillButton from '../components/SearchWillButton';
import { contractAddresses, abi } from '../constants';
import { BlockchainWill } from '../types';

interface contractAddressesInterface {
    [key: string]: string[];
  }
  
const RevokeWillPage = () => {
    const [will, setWill] = useState<BlockchainWill.WillStructOutput | null>();
    const [citizenshipCardId, setCitizenshipCardId] = useState<string>("");
  
    const addresses: contractAddressesInterface = contractAddresses;
    const contractAddress = addresses["11155111"][
      addresses["11155111"].length - 1
    ] as Address; // sepolia chainId is 11155111. We use the last address of the array to make sure that the last deployed contract is used.
  
    function isCitizenshipCardIdCompleted(): boolean {
      return citizenshipCardId.length > 5;
    }
  
    const {isError, refetch, isRefetching} = useContractRead({
      address: contractAddress,
      abi: abi,
      functionName: "getWill",
      onSuccess(data: BlockchainWill.WillStructOutput) {
        console.log("will", data);
        setWill(data);
      },
      args: [citizenshipCardId],
      enabled: false,
    });
  
    console.log("isCitizenshipCardIdCompleted", isCitizenshipCardIdCompleted());
  
    function handleOnCitizenshipIdChange(e: ChangeEvent<HTMLInputElement>): void {
      console.log(e.target.value);
      setCitizenshipCardId(e.target.value);
    }
  
    function handleSearchWillClick(): void {
      refetch();
    }
  
    return (
      <>
        <Box maxW="1536px" mx="auto">
          <Stack p={10} direction={"row"}>
            <SearchWill onCitizenshipIdChange={handleOnCitizenshipIdChange} />
            <SearchWillButton onSearchWillClick={handleSearchWillClick} />
          </Stack>
          {isRefetching && <Spinner size="xl" />}
          {will != null && (
            <>
             will was found!
              
            </>
          )}
          {isError && <p>Something went wrong</p>}
        </Box>
      </>
    );
}

export default RevokeWillPage