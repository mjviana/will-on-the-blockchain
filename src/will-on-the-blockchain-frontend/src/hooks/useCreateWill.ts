import {
  Address,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import {willSmartContractAbi} from "../constants";

export const useCreateWill = (
  address: Address,
  debouncedWill: string[] | null,
  isWillCompleted: boolean
) => {
  // usePrepareContractWrite hook is used to prepare a contract write transaction, it fetches the required parameters for the transaction.
  const {
    config: prepareCreateWillConfig,
    error: prepareCreateWillError,
    isError: isPrepareCreateWillError,
    refetch: refetchPrepareCreateWill,
  } = usePrepareContractWrite({
    address: address,
    abi: willSmartContractAbi,
    functionName: "createWill",
    enabled: isWillCompleted, // Enable the hook only when the debouncedWill is not null and all the fields are filled.
    args: debouncedWill ? debouncedWill : [],
    gas: 3100000n,
  });

  // useContractWrite hook is used to send a contract write transaction.
  const {
    data: writeCreateWillData,
    write: writeCreateWill,
    reset: resetWriteCreateWill,
  } = useContractWrite(prepareCreateWillConfig);

  // useWaitForTransaction hook is used to wait for a transaction to be mined, provides the ability to show feedback on the status of the transaction to the user.
  const {
    isLoading: isTransactionCreateWillLoading,
    isSuccess: isTransanctionCreateWillSuccess,
    isError: isTransactionCreateWillError,
    error: transactionCreateWillError,
  } = useWaitForTransaction({
    hash: writeCreateWillData?.hash,
  });

  return {
    prepareCreateWillError,
    isPrepareCreateWillError,
    refetchPrepareCreateWill,
    writeCreateWillData,
    writeCreateWill,
    resetWriteCreateWill,
    isTransactionCreateWillLoading,
    isTransanctionCreateWillSuccess,
    isTransactionCreateWillError,
    transactionCreateWillError,
  };
};
