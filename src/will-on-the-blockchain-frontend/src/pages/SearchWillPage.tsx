import {abi, contractAddresses} from "../constants";
import {Box, Spinner, Stack} from "@chakra-ui/react";
import SearchWill from "../components/SearchWill";
import {ChangeEvent, useState} from "react";
import SearchWillButton from "../components/SearchWillButton";
import {Address, useContractRead} from "wagmi";
import {BlockchainWill} from "../types";
import WillHeader from "../components/WillHeader";
import {WillDetails} from "../components/WillDetails";
import WillBody from "../components/WillBody";

interface contractAddressesInterface {
  [key: string]: string[];
}

const SearchWillPage = () => {
  const [will, setWill] = useState<BlockchainWill.WillStructOutput>();
  const [citizenshipCardId, setCitizenshipCardId] = useState<string>("");

  const addresses: contractAddressesInterface = contractAddresses;
  const contractAddress = addresses["11155111"][0] as Address; // sepolia chainId is 11155111

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
          <WillDetails>
            <WillHeader will={will} />
            <WillBody will={will} />
          </WillDetails>
        )}
        {isError && <p>Something went wrong</p>}
      </Box>
    </>
  );
};

export default SearchWillPage;
