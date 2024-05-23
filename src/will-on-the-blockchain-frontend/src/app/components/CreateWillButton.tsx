"use client";

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
  isWillCompleted = true,
  onCreateWill,
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
      isDisabled={isWritingOnBlockchain() || !isWillCompleted}
      onClick={onCreateWill}
    >
      Create Will
    </Button>
  );
}
