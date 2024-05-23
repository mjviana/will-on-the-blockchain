"use client";

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
import {BlockchainWill} from "../../types";
import SecretCode from "./SecretCode";
import {ChangeEvent, useState} from "react";
import {decrypt} from "../../utils/CryptoHelper";
import Link from "next/link";

interface RevokeWillModalProps {
  will: BlockchainWill.WillStructOutput;
  onCancel(): void;
  isOpen: boolean;
  onValidSecretCode(): void;
}

const RevokeWillModal = ({
  will,
  onCancel,
  isOpen,
  onValidSecretCode,
}: RevokeWillModalProps) => {
  const [secretCode, setSecretCode] = useState("");
  const [isValidSecretCode, setIsValidSecretCode] = useState(true);

  function handleSecretCodeChange(e: ChangeEvent<HTMLInputElement>): void {
    setSecretCode(e.target.value);
  }

  function handleConfirmClick(): void {
    const decryptedSecret = decrypt(will.secretCode, secretCode);
    if (decryptedSecret.length === 0) {
      setIsValidSecretCode(false);
    } else {
      setIsValidSecretCode(true);
      onValidSecretCode;
    }
  }

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isCentered
        isOpen={isOpen}
        onClose={onCancel}
      >
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>Insert secret code</ModalHeader>
          <ModalBody>
            <FormControl>
              <SecretCode
                onSecretCodeChange={handleSecretCodeChange}
                isDisabled={false}
              ></SecretCode>
              <FormHelperText>
                Please insert the secret code to revoke will.
              </FormHelperText>
              {!isValidSecretCode && (
                <FormHelperText color="red.500">
                  Wrong Secret code.
                </FormHelperText>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleConfirmClick}>Confirm</Button>
            <Button
              variant="outline"
              as={Link}
              href={"/revoke-will"}
              onClick={onCancel}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RevokeWillModal;
