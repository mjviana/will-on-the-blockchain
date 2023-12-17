import {Button} from "@chakra-ui/react";

interface CreateWillButtonProps {
  isWriteCreateWillLoading: boolean;
  isTransactionCreateWillLoading: boolean;
  isWillCompleted: boolean;
  onCreateWill: () => void;
  isPublicWill: boolean;
  isWillEncrypted: boolean;
}

export function CreateWillButton({
  isWriteCreateWillLoading,
  isTransactionCreateWillLoading,
  isWillCompleted,
  onCreateWill,
  isPublicWill,
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
        !isPublicWill
          ? !isWillEncrypted || isWritingOnBlockchain() || !isWillCompleted
          : isWritingOnBlockchain() || !isWillCompleted
      }
      onClick={onCreateWill}
    >
      Create Will
    </Button>
  );
}
