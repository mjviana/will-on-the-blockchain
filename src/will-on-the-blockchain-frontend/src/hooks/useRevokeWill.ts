import {
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import {blockchainWillAbi} from "../constants/blockchainWillAbi";
import {Address} from "viem";

export const useRevokeWill = (
  contractAddress: Address,
  citizenshipCardId: string,
  isPublicWill: boolean | undefined
) => {
  /// usePrepareContractWrite hook is used to prepare a contract write transaction, it fetches the required parameters for the transaction.
  const {
    data: prepareRevokePublicWillData,
    refetch: refetchPrepareRevokeWill,
    error: prepareRevokeWillError,
    isError: isPrepareRevokeWillError,
  } = useSimulateContract({
    address: contractAddress,
    abi: blockchainWillAbi,
    functionName: isPublicWill ? "revokePublicWill" : "revokePrivateWill",
    // enabled: false,
    args: [citizenshipCardId],
  });

  // useContractWrite hook performs the actual contract write transaction.
  const {
    data: writeRevokeWillData,
    isPending: isWriteRevokeWillLoading,
    writeContract: writeRevokeWill,
    reset: resetWriteRevokeWill,
    error: writeRevokeWillError,
    // isSuccess: isWriteRevokeWillSuccess,
    // isError: isWriteRevokeWillError,
  } = useWriteContract();

  // useWaitForTransaction hook is used to wait for a transaction to be mined, provides the ability to show feedback on the status of the transaction to the user.
  const {
    isLoading: isTransactionRevokeWillLoading,
    isSuccess: isTransactionRevokeSuccess,
    isError: isTransactionRevokeWillError,
    data: transactionRevokeWillData,
    error: transactionRevokeWillError,
  } = useWaitForTransactionReceipt({
    hash: writeRevokeWillData,
  });

  return {
    prepareRevokePublicWillData,
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
