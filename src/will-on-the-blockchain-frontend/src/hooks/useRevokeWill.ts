import {
  Address,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import {willSmartContractAbi} from "../constants";
import {useEffect} from "react";

export const useRevokeWill = (
  address: Address,
  debouncedWill: string[] | null,
  revokeMode: boolean
) => {
  /// usePrepareContractWrite hook is used to prepare a contract write transaction, it fetches the required parameters for the transaction.
  const {
    config: prepareRevokePublicWillConfig,
    refetch: refetchPrepareRevokeWill,
  } = usePrepareContractWrite({
    address: address,
    abi: willSmartContractAbi,
    functionName: "revokePublicWill",
    enabled: Boolean(revokeMode), // Enable the hook only when the debouncedWill is not null and revokeMode is true.
    args: debouncedWill
      ? debouncedWill[2] != ""
        ? [debouncedWill[2]]
        : []
      : [], // The element at index 2 is the testatorCitizenshipCardId
  });

  // useContractWrite hook performs the actual contract write transaction.
  const {
    data: writeRevokeWillData,
    write: revokeWrite,
    reset: resetWriteRevokeWill,
  } = useContractWrite(prepareRevokePublicWillConfig);

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

  useEffect(() => {
    refetchPrepareRevokeWill();
    resetWriteRevokeWill();
  }, [revokeWrite, isTransactionRevokeSuccess, isTransactionRevokeWillError]);

  return {
    revokeWrite,
    isTransactionRevokeWillLoading,
    isTransactionRevokeSuccess,
    isTransactionRevokeWillError,
    transactionRevokeWillData,
    transactionRevokeWillError,
  };
};
