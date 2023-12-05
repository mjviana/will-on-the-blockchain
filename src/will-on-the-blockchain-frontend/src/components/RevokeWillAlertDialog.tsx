import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Text,
  Button,
} from "@chakra-ui/react";

interface RevokeWillAlertDialogProps {
  isRevokeWillAlertOpen: boolean;
  onClose: () => void;
  cancelRef: React.RefObject<HTMLButtonElement>;
  isWriteRevokeWillLoading: boolean;
  isTransactionRevokeWillLoading: boolean;
  onActivateRevokeWillMode: () => void;
  onDeactivateRevokeWillMode: () => void;
}

export function RevokeWillAlertDialog({
  isRevokeWillAlertOpen,
  onClose,
  cancelRef,
  isWriteRevokeWillLoading,
  isTransactionRevokeWillLoading,
  onActivateRevokeWillMode,
  onDeactivateRevokeWillMode,
}: RevokeWillAlertDialogProps) {
  return (
    <AlertDialog
      closeOnOverlayClick={false}
      isOpen={isRevokeWillAlertOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Revoke Will?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <Text>
            You've previously created a will. Would you like to revoke it and
            designate this as your new will? Click 'Yes' to proceed, and then
            press the 'Create Will' button to generate your will.
          </Text>
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button
            isLoading={
              isWriteRevokeWillLoading || isTransactionRevokeWillLoading
            }
            isDisabled={
              isWriteRevokeWillLoading || isTransactionRevokeWillLoading
            }
            loadingText={
              isWriteRevokeWillLoading
                ? "Waiting for confirmation..."
                : isTransactionRevokeWillLoading
                ? "Revoking Will..."
                : "Yes"
            }
            colorScheme="blue"
            mr={3}
            onClick={onActivateRevokeWillMode}
          >
            Yes
          </Button>
          <Button onClick={onDeactivateRevokeWillMode}>Cancel</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
