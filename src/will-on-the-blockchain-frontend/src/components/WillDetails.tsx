import {BlockchainWill} from "../types";
import WillAuthorInformation from "./WillAuthorInformation";
import WillContent from "./WillContent";
import {WillWitnessInformation} from "./WillWitnessInformation";
import SecretCodeModal from "./SecretCodeModal";

interface WillDetailsProps {
  will: BlockchainWill.WillStructOutput;
  onCancel: () => void;
}

export const WillDetails = ({will, onCancel}: WillDetailsProps) => {
  return (
    <>
      {will && (
        <>
          <SecretCodeModal will={will} onCancel={onCancel}></SecretCodeModal>

          <WillAuthorInformation will={will} />
          <WillWitnessInformation will={will} />
          <WillContent will={will} />
        </>
      )}
    </>
  );
};
