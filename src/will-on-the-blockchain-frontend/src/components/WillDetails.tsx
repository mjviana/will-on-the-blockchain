import {BlockchainWill} from "../types";
import WillAuthorInformation from "./WillAuthorInformation";
import WillContent from "./WillContent";
import {WillWitnessInformation} from "./WillWitnessInformation";
import SecretCodeModal from "./SecretCodeModal";

interface WillDetailsProps {
  will: BlockchainWill.WillStructOutput;
  onCancel: () => void;
  onDecryptedWill(decryptedWill: string): void;
  isToClose: boolean;
}

export const WillDetails = ({
  will,
  onCancel,
  onDecryptedWill,
  isToClose,
}: WillDetailsProps) => {
  return (
    <>
      {will && (
        <>
          <SecretCodeModal
            will={will}
            onCancel={onCancel}
            onDecryptedWill={onDecryptedWill}
            isToClose={isToClose}
          ></SecretCodeModal>

          <WillAuthorInformation will={will} />
          <WillWitnessInformation will={will} />
          <WillContent will={will} />
        </>
      )}
    </>
  );
};
