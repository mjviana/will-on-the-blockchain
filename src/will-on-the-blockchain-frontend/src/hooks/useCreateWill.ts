import {
  Address,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import {BlockchainWill} from "../types";
import {blockchainWillAbi} from "../constants/blockchainWillAbi";

export const useCreateWill = (
  address: Address,
  debouncedWill: BlockchainWill.WillCreationStruct,
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
    abi: blockchainWillAbi,
    // enabled: isWillCompleted, // Enable the hook only when the debouncedWill is not null and all the fields are filled.
    functionName: "createWill",
    args: [
      {
        will: debouncedWill.will,
        isPublic: debouncedWill.isPublic,
        firstWitness: {
          name: debouncedWill.firstWitness.name,
          birthdate: debouncedWill.firstWitness.birthdate as bigint,
          citizenshipCardId: debouncedWill.firstWitness.citizenshipCardId,
        },
        secondWitness: {
          name: debouncedWill.secondWitness.name,
          birthdate: debouncedWill.secondWitness.birthdate as bigint,
          citizenshipCardId: debouncedWill.secondWitness.citizenshipCardId,
        },
        testator: {
          name: debouncedWill.testator.name,
          birthdate: debouncedWill.testator.birthdate as bigint,
          citizenshipCardId: debouncedWill.testator.citizenshipCardId,
        },
        secretCode: debouncedWill.secretCode,
      },
    ],
    // gas: 3100000n,
    onError(error) {
      console.log(
        "%c useCreateWill usePrepareContractWrite onError",
        "color: red"
      );
      console.log("%c error:", "color: red", error);
      console.log(`%c current params ${debouncedWill}`, "color:red");
    },
  });

  // useContractWrite hook is used to send a contract write transaction.
  const {
    data: writeCreateWillData,
    isLoading: isWriteCreateWillLoading,
    isSuccess: isWriteCreateWillSuccess,
    isError: isWriteCreateWillError,
    write: writeCreateWill,
    reset: resetWriteCreateWill,
    error: writeCreateWillError,
  } = useContractWrite(prepareCreateWillConfig);

  // useWaitForTransaction hook is used to wait for a transaction to be mined, provides the ability to show feedback on the status of the transaction to the user.
  const {
    isLoading: isTransactionCreateWillLoading,
    isSuccess: isTransactionCreateWillSuccess,
    isError: isTransactionCreateWillError,
    error: transactionCreateWillError,
  } = useWaitForTransaction({
    hash: writeCreateWillData?.hash,
  });

  return {
    prepareCreateWillError,
    isPrepareCreateWillError,
    isWriteCreateWillLoading,
    writeCreateWillError,
    writeCreateWillData,
    refetchPrepareCreateWill,
    writeCreateWill,
    resetWriteCreateWill,
    isTransactionCreateWillLoading,
    isTransactionCreateWillSuccess,
    isTransactionCreateWillError,
    transactionCreateWillError,
  };
};
