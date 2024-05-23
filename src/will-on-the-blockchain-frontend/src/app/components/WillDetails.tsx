"use client";

import {BlockchainWill} from "../../types";
import WillAuthorInformation from "./WillAuthorInformation";
import WillContent from "./WillContent";
import {WillWitnessInformation} from "./WillWitnessInformation";
import {SecretCodeModal, SecretModalType} from "./SecretCodeModal";
import {useDisclosure} from "@chakra-ui/react";
import {useEffect, useState} from "react";
interface WillDetailsProps {
  will: BlockchainWill.WillStructOutput;
  onReset: () => void;
}

export const WillDetails = ({will, onReset}: WillDetailsProps) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [visibleWill, setVisibleWill] =
    useState<BlockchainWill.WillStructOutput>(will);

  useEffect(() => {
    if (!will.isPublic) {
      onOpen();
    }
  }, [will, onOpen]);

  useEffect(() => {
    setVisibleWill(will);
  }, [will]);

  function handleOnCancel(): void {
    onClose();
    onReset();
  }

  return (
    <>
      {will && (
        <>
          <SecretCodeModal
            will={visibleWill}
            onCancel={handleOnCancel}
            onClose={handleOnCancel}
            modalType={SecretModalType.privateWillDetails}
            onSecretCodeDecrypted={(decryptedWill) => {
              setVisibleWill({...will, will: decryptedWill});
              onClose();
            }}
            isOpen={isOpen}
          ></SecretCodeModal>

          <WillAuthorInformation will={visibleWill} />
          <WillWitnessInformation will={visibleWill} />
          <WillContent will={visibleWill} />
        </>
      )}
    </>
  );
};
