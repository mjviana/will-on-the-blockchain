import {
  Button,
  FormControl,
  FormHelperText,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import SecretCode from "./SecretCode";
import {ChangeEvent, useState} from "react";
import {BlockchainWill} from "../types";
import {Link as ReactRouterLink} from "react-router-dom";
import {decrypt} from "../utils/CryptoHelper";

enum SecretModalType {
  "privateWillDetails",
  "revokeWill",
}

interface SecretCodeModalProps {
  will: BlockchainWill.WillStruct;
  onCancel(): void;
  onClose(): void;
  isOpen: boolean;
  modalType: SecretModalType;
  onSecretCodeDecrypted(decryptedValue: string): void;
}
const SecretCodeModal = ({
  will,
  onCancel,
  modalType,
  onSecretCodeDecrypted,
  onClose,
  isOpen,
}: SecretCodeModalProps) => {
  const [secretCode, setSecretCode] = useState<string>("");
  const [isValidSecretCode, setIsValidSecretCode] = useState<boolean>(true);

  function handleConfirmClick(): void {
    if (modalType === SecretModalType.privateWillDetails) {
      const decryptedWill = decrypt(will.will, secretCode);
      console.log("decryptedWill", decryptedWill);
      if (decryptedWill.length === 0) {
        setIsValidSecretCode(false);
      } else {
        setIsValidSecretCode(true);
        onSecretCodeDecrypted(decryptedWill);
      }
    } else {
      const decryptedSecret = decrypt(will.secretCode, secretCode);
      if (decryptedSecret.length === 0) {
        setIsValidSecretCode(false);
      } else {
        setIsValidSecretCode(true);
        onSecretCodeDecrypted(will.secretCode);
      }
    }
  }

  function handleSecretCodeChange(e: ChangeEvent<HTMLInputElement>): void {
    setSecretCode(e.target.value);
  }

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>Secret Code</ModalHeader>
          <ModalBody>
            <FormControl>
              <SecretCode
                onSecretCodeChange={handleSecretCodeChange}
              ></SecretCode>
              <FormHelperText>
                {modalType === SecretModalType.privateWillDetails ? (
                  <>Insert the secret code to see the will.</>
                ) : (
                  <> Insert the secret code to revoke will.</>
                )}
              </FormHelperText>
              {!isValidSecretCode && (
                <FormHelperText color="red.500">
                  Wrong Secret code.
                </FormHelperText>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              marginRight="15px"
              colorScheme="blue"
              onClick={handleConfirmClick}
            >
              Confirm
            </Button>
            <Button as={ReactRouterLink} to={"/search-will"} onClick={onCancel}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export {SecretCodeModal, SecretModalType};
