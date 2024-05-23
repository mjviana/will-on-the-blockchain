"use client";

import {Box, Spinner, Stack, useDisclosure, Text} from "@chakra-ui/react";
import React, {ChangeEvent, useEffect, useState} from "react";
import {Address} from "viem";
import {useAccount, useReadContract} from "wagmi";
import SearchWill from "../components/SearchWill";
import SearchWillButton from "../components/SearchWillButton";
import {contractAddresses} from "../../constants";
import {BlockchainWill} from "../../types";
import {SecretCodeModal, SecretModalType} from "../components/SecretCodeModal";
import {useRevokeWill} from "../../hooks/useRevokeWill";
import FeedbackToast from "../components/FeedbackToast";
import {blockchainWillAbi} from "../../constants/blockchainWillAbi";

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
    prepareRevokePublicWillData,
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
      console.log("will details", will);

      onOpen();
    }
  }, [will, onOpen]);

  const {isError, refetch, isRefetching, data} = useReadContract({
    address: contractAddress,
    abi: blockchainWillAbi,
    functionName: "getWill",
    args: [citizenshipCardId],
    query: {
      enabled: false,
    },
  });

  useEffect(() => {
    if (data) {
      setWill(data as BlockchainWill.WillStructOutput);
    }
  }, [data]);

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
      writeRevokeWill?.(prepareRevokePublicWillData!.request);
    } else if (!will?.isPublic) {
      console.log("Revoking private will...");
      writeRevokeWill?.(prepareRevokePublicWillData!.request);
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
                link: `https://sepolia.etherscan.io/tx/${writeRevokeWillData}`,
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
