import {BlockchainWill} from "../types";
import {Card, Text} from "@chakra-ui/react";

interface WillBodyProps {
  will: BlockchainWill.WillStructOutput;
}

const WillContent = ({will}: WillBodyProps) => {
  return (
    <Card mb={5} mx={10} p={10}>
      <Text as="b" pb={10} fontSize="2xl">
        Will Content
      </Text>
      {will.will}
    </Card>
  );
};

export default WillContent;
