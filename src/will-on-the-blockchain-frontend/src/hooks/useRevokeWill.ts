import {
  Address,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import {blockchainWillAbi} from "../constants/blockchainWillAbi";

export const useRevokeWill = (
  contractAddress: Address,
  citizenshipCardId: string,
  isPublicWill: boolean | undefined
) => {
  /// usePrepareContractWrite hook is used to prepare a contract write transaction, it fetches the required parameters for the transaction.
  const {
    config: prepareRevokePublicWillConfig,
    refetch: refetchPrepareRevokeWill,
    error: prepareRevokeWillError,
    isError: isPrepareRevokeWillError,
  } = usePrepareContractWrite({
    address: contractAddress,
    abi: blockchainWillAbi,
    functionName: isPublicWill ? "revokePublicWill" : "revokePrivateWill",
    // enabled: false,
    args: [citizenshipCardId],
  });

  // useContractWrite hook performs the actual contract write transaction.
  const {
    data: writeRevokeWillData,
    isLoading: isWriteRevokeWillLoading,
    write: writeRevokeWill,
    reset: resetWriteRevokeWill,
    error: writeRevokeWillError,
    // isSuccess: isWriteRevokeWillSuccess,
    // isError: isWriteRevokeWillError,
  } = useContractWrite({
    ...prepareRevokePublicWillConfig,
    onSettled: onSettledCallback,
  });

  // useWaitForTransaction hook is used to wait for a transaction to be mined, provides the ability to show feedback on the status of the transaction to the user.
  const {
    isLoading: isTransactionRevokeWillLoading,
    isSuccess: isTransactionRevokeSuccess,
    isError: isTransactionRevokeWillError,
    data: transactionRevokeWillData,
    error: transactionRevokeWillError,
  } = useWaitForTransaction({
    hash: writeRevokeWillData?.hash,
  });

  function onSettledCallback(
    data: import("@wagmi/core").WriteContractResult | undefined,
    error: Error | null
  ) {
    console.log("useRevokeWill onSettled");
    console.log("useRevokeWill onSettled data", data);
    console.log("useRevokeWill onSettled error", error);
  }

  return {
    prepareRevokeWillError,
    isPrepareRevokeWillError,
    isWriteRevokeWillLoading,
    writeRevokeWillError,
    refetchPrepareRevokeWill,
    writeRevokeWill,
    resetWriteRevokeWill,
    isTransactionRevokeWillLoading,
    isTransactionRevokeSuccess,
    isTransactionRevokeWillError,
    transactionRevokeWillData,
    transactionRevokeWillError,
    writeRevokeWillData,
  };
};
