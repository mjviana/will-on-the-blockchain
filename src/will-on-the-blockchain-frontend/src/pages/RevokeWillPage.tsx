import {Box, Spinner, Stack, useDisclosure, Text} from "@chakra-ui/react";
import {ChangeEvent, useEffect, useState} from "react";
import {Address} from "viem";
import {useAccount, useContractRead} from "wagmi";
import SearchWill from "../components/SearchWill";
import SearchWillButton from "../components/SearchWillButton";
import {contractAddresses, abi} from "../constants";
import {BlockchainWill} from "../types";
import {SecretCodeModal, SecretModalType} from "../components/SecretCodeModal";
import {useRevokeWill} from "../hooks/useRevokeWill";
import FeedbackToast from "../components/FeedbackToast";

interface contractAddressesInterface {
  [key: string]: string[];
}

const RevokeWillPage = () => {
  const {isConnected} = useAccount();

  const {isOpen, onOpen, onClose} = useDisclosure();
  const [will, setWill] = useState<BlockchainWill.WillStruct | null>();
  const [citizenshipCardId, setCitizenshipCardId] = useState<string>("");

  const addresses: contractAddressesInterface = contractAddresses;
  const contractAddress = addresses["11155111"][
    addresses["11155111"].length - 1
  ] as Address; // sepolia chainId is 11155111. We use the last address of the array to make sure that the last deployed contract is used.

  const {
    refetchPrepareRevokeWill,
    writeRevokeWill,
    writeRevokeWillData,
    isTransactionRevokeSuccess,
    isTransactionRevokeWillError,
    transactionRevokeWillError,
    isTransactionRevokeWillLoading,
    isWriteRevokeWillLoading,
  } = useRevokeWill(contractAddress, citizenshipCardId, will?.isPublic);

  useEffect(() => {
    if (will) {
      onOpen();
    }
  }, [will, onOpen]);

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

  function handleOnCitizenshipIdChange(e: ChangeEvent<HTMLInputElement>): void {
    console.log(e.target.value);
    setCitizenshipCardId(e.target.value);
  }

  function handleSearchWillClick(): void {
    refetch();
  }

  function handleOnCancel(): void {
    onClose();
    setCitizenshipCardId("");
    setWill(null);
  }

  function handleOnValidSecretCode(secretCode: string): void {
    console.log(`Secret code: ${secretCode} is valid. Revoking will...`);
    refetchPrepareRevokeWill?.();
    if (will?.isPublic) {
      console.log("Revoking public will...");
      writeRevokeWill?.();
    } else if (!will?.isPublic) {
      console.log("Revoking private will...");
      writeRevokeWill?.();
    }
  }

  useEffect(() => {
    if (isTransactionRevokeSuccess || isTransactionRevokeWillError) onClose();

    return () => {};
  }, [onClose, isTransactionRevokeSuccess, isTransactionRevokeWillError]);

  if (!isConnected) {
    return <Text>Connect your wallet to continue</Text>;
  } else
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
          {isRefetching && <Spinner size="xl" />}
          {will && (
            <SecretCodeModal
              modalType={SecretModalType.revokeWill}
              will={will}
              onCancel={handleOnCancel}
              onClose={handleOnCancel}
              onSecretCodeDecrypted={(secretCode) => {
                handleOnValidSecretCode(secretCode);
              }}
              isOpen={isOpen}
              isWriteRevokeWillLoading={isWriteRevokeWillLoading}
              isTransactionRevokeWillLoading={isTransactionRevokeWillLoading}
            ></SecretCodeModal>
          )}

          {isTransactionRevokeSuccess && (
            <FeedbackToast
              toastState={{
                title: "Revoke will",
                description: "Will successfully revoked",
                status: "success",
                link: `https://sepolia.etherscan.io/tx/${writeRevokeWillData?.hash}`,
              }}
            ></FeedbackToast>
          )}

          {isTransactionRevokeWillError && (
            <FeedbackToast
              toastState={{
                title: "Revoke will",
                description:
                  "Will was not revoked. Here are some details: " +
                  transactionRevokeWillError?.message,
                position: "top",
                status: "error",
              }}
            ></FeedbackToast>
          )}

          {isError && <p>Something went wrong</p>}
        </Box>
      </>
    );
};

export default RevokeWillPage;
