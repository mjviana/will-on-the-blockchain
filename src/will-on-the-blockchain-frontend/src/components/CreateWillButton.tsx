import {Button} from "@chakra-ui/react";

interface CreateWillButtonProps {
  isWriteCreateWillLoading: boolean;
  isTransactionCreateWillLoading: boolean;
  isWillCompleted: boolean;
  onCreateWill: () => void;
  isWillEncrypted: boolean;
}

export function CreateWillButton({
  isWriteCreateWillLoading,
  isTransactionCreateWillLoading,
  isWillCompleted,
  onCreateWill,
  isWillEncrypted,
}: CreateWillButtonProps) {
  function isWritingOnBlockchain(): boolean {
    return isWriteCreateWillLoading || isTransactionCreateWillLoading;
  }

  return (
    <Button
      w="fit-content"
      isLoading={isWriteCreateWillLoading || isTransactionCreateWillLoading}
      loadingText={
        isWriteCreateWillLoading
          ? "Waiting for confirmation..."
          : isTransactionCreateWillLoading
            ? "Creating Will..."
            : "Create"
      }
      isDisabled={
        !isWillEncrypted || isWritingOnBlockchain() || !isWillCompleted
      }
      onClick={onCreateWill}
    >
      Create Will
    </Button>
  );
}
