import {BlockchainWill} from "../types";
import {Text} from "@chakra-ui/react";

interface WillBodyProps {
  will: BlockchainWill.WillStructOutput;
}

const WillBody = ({will}: WillBodyProps) => {
  return <Text>{will.will}</Text>;
};

export default WillBody;
