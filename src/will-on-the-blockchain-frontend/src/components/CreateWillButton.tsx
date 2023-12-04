import {Button} from "@chakra-ui/react";

interface CreateWillButtonProps {
  isWriteCreateWillLoading: boolean;
  isTransactionCreateWillLoading: boolean;
  isWillCompleted: () => boolean;
  prepareCreateWillError: Error | null;
  isPrepareCreateWillError: boolean;
  openRevokeWillAlertDialog: () => void;
  writeCreateWill: (() => void) | undefined;
}

export function CreateWillButton({
  isWriteCreateWillLoading,
  isTransactionCreateWillLoading,
  isWillCompleted,
  prepareCreateWillError,
  writeCreateWill,
  isPrepareCreateWillError,
  openRevokeWillAlertDialog,
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
        !isWillCompleted()
      }
      onClick={() => {
        if (!prepareCreateWillError) {
          writeCreateWill?.();
        } else if (
          isPrepareCreateWillError &&
          prepareCreateWillError?.message.includes("HasCreatedWill")
        ) {
          openRevokeWillAlertDialog();
        }
      }}
    >
      Create Will
    </Button>
  );
}
