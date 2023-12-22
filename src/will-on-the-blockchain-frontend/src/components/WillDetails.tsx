import {BlockchainWill} from "../types";
import WillAuthorInformation from "./WillAuthorInformation";
import WillContent from "./WillContent";
import {WillWitnessInformation} from "./WillWitnessInformation";

interface WillDetailsProps {
  will: BlockchainWill.WillStructOutput;
}

export const WillDetails = ({will}: WillDetailsProps) => {
  return (
    <>
      <WillAuthorInformation will={will} />
      <WillWitnessInformation will={will} />
      <WillContent will={will} />
    </>
  );
};
