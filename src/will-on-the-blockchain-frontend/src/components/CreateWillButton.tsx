import {Button} from "@chakra-ui/react";

interface CreateWillButtonProps {
  isWriteCreateWillLoading: boolean;
  isTransactionCreateWillLoading: boolean;
  isWillCompleted: boolean;
  onCreateWill: () => void;
}

export function CreateWillButton({
  isWriteCreateWillLoading,
  isTransactionCreateWillLoading,
  isWillCompleted,
  onCreateWill,
}: CreateWillButtonProps) {
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
        isWriteCreateWillLoading ||
        isTransactionCreateWillLoading ||
        !isWillCompleted
      }
      onClick={onCreateWill}
    >
      Create Will
    </Button>
  );
}
