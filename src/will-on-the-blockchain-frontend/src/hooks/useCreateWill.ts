import {
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import {BlockchainWill} from "../types";
import {blockchainWillAbi} from "../constants/blockchainWillAbi";
import {Address} from "viem";

export const useCreateWill = (
  address: Address,
  debouncedWill: BlockchainWill.WillCreationStruct
) => {
  // usePrepareContractWrite hook is used to prepare a contract write transaction, it fetches the required parameters for the transaction.
  const {
    data: useSimulateContractData,
    error: prepareCreateWillError,
    isError: isPrepareCreateWillError,
    refetch: refetchPrepareCreateWill,
  } = useSimulateContract({
    address: address,
    abi: blockchainWillAbi,
    // enabled: isWillCompleted, // Enable the hook only when the debouncedWill is not null and all the fields are filled.
    functionName: "createWill",
    args: [
      {
        will: debouncedWill.will,
        isPublic: debouncedWill.isPublic,
        firstWitness: {
          name: debouncedWill.firstWitness.name,
          citizenshipCardId: debouncedWill.firstWitness.citizenshipCardId,
          birthdate: debouncedWill.firstWitness.birthdate as bigint,
        },
        secondWitness: {
          name: debouncedWill.secondWitness.name,
          citizenshipCardId: debouncedWill.secondWitness.citizenshipCardId,
          birthdate: debouncedWill.secondWitness.birthdate as bigint,
        },
        testator: {
          name: debouncedWill.testator.name,
          citizenshipCardId: debouncedWill.testator.citizenshipCardId,
          birthdate: debouncedWill.testator.birthdate as bigint,
        },
        secretCode: debouncedWill.secretCode,
      },
    ],
    // gas: 3100000n,
  });

  // useContractWrite hook is used to send a contract write transaction.
  const {
    data: writeCreateWillData,
    isPending: isWriteCreateWillLoading,
    isSuccess: isWriteCreateWillSuccess,
    isError: isWriteCreateWillError,
    writeContract: writeCreateWill,
    writeContractAsync: writeCreateWillAsync,
    reset: resetWriteCreateWill,
    error: writeCreateWillError,
  } = useWriteContract();

  // useWaitForTransaction hook is used to wait for a transaction to be mined, provides the ability to show feedback on the status of the transaction to the user.
  const {
    isLoading: isTransactionCreateWillLoading,
    isSuccess: isTransactionCreateWillSuccess,
    isError: isTransactionCreateWillError,
    error: transactionCreateWillError,
  } = useWaitForTransactionReceipt({
    hash: writeCreateWillData,
  });

  return {
    useSimulateContractData,
    prepareCreateWillError,
    isPrepareCreateWillError,
    isWriteCreateWillLoading,
    writeCreateWillError,
    writeCreateWillData,
    refetchPrepareCreateWill,
    writeCreateWill,
    writeCreateWillAsync,
    resetWriteCreateWill,
    isWriteCreateWillSuccess,
    isWriteCreateWillError,
    isTransactionCreateWillLoading,
    isTransactionCreateWillSuccess,
    isTransactionCreateWillError,
    transactionCreateWillError,
  };
};
