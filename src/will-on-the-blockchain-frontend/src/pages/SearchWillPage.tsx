import {contractAddresses} from "../constants";
import {Box, Stack} from "@chakra-ui/react";
import SearchWill from "../components/SearchWill";
import {ChangeEvent, useEffect, useState} from "react";
import SearchWillButton from "../components/SearchWillButton";
import {Address, useContractRead} from "wagmi";
import {BlockchainWill} from "../types";
import {WillDetails} from "../components/WillDetails";
import SearchWillSkeleton from "../components/SearchWillSkeleton";
import {blockchainWillAbi} from "../constants/blockchainWillAbi";
interface contractAddressesInterface {
  [key: string]: string[];
}

const SearchWillPage = () => {
  const [will, setWill] = useState<BlockchainWill.WillStructOutput | null>();
  const [citizenshipCardId, setCitizenshipCardId] = useState<string>("");
  const [error, setError] = useState<string>("");

  const addresses: contractAddressesInterface = contractAddresses;
  const contractAddress = addresses["11155111"][
    addresses["11155111"].length - 1
  ] as Address; // sepolia chainId is 11155111. We use the last address of the array to make sure that the last deployed contract is used.

  function isCitizenshipCardIdCompleted(): boolean {
    return citizenshipCardId.length > 5;
  }

  const {isError, refetch, isRefetching, isFetching} = useContractRead({
    address: contractAddress,
    abi: blockchainWillAbi,
    functionName: "getWill",
    onSuccess(data: BlockchainWill.WillStructOutput) {
      console.log("will", data);
      setWill(data);
    },
    onError(error) {
      console.log("error", error);
      console.log("Current isError flag:", isError);
      setError(error.message);

      setWill(null);
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

  useEffect(() => {
    setCitizenshipCardId("");
  }, [will]);

  if (isRefetching || isFetching)
    return (
      <Box maxW="1536px" mx="auto">
        <Stack p={10} direction={"row"}>
          <SearchWill
            value={citizenshipCardId}
            onCitizenshipIdChange={handleOnCitizenshipIdChange}
          />
          <SearchWillButton onSearchWillClick={handleSearchWillClick} />
        </Stack>
        <SearchWillSkeleton />
      </Box>
    );

  return (
    <>
      <Box maxW="1536px" mx="auto">
        <Stack p={10} direction={"row"}>
          <SearchWill
            value={citizenshipCardId}
            onCitizenshipIdChange={handleOnCitizenshipIdChange}
          />
          <SearchWillButton onSearchWillClick={handleSearchWillClick} />
        </Stack>
        {will && (
          <>
            <WillDetails
              will={will}
              onReset={() => {
                console.log("will details canceled...");
                setWill(null);
              }}
            />
          </>
        )}
        {error && <p>Something went wrong: {error}</p>}
      </Box>
    </>
  );
};

export default SearchWillPage;
