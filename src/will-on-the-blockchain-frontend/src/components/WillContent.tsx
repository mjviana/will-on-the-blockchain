import {BlockchainWill} from "../types";
import {Card, Text} from "@chakra-ui/react";

interface WillBodyProps {
  will: BlockchainWill.WillStructOutput;
}

const WillContent = ({will}: WillBodyProps) => {
  const isPrivateWill = !will.isPublic;
  return (
    <Card
      mb={5}
      mx={10}
      p={10}
      style={{
        filter: isPrivateWill ? "blur(8px)" : "none",
        backdropFilter: isPrivateWill ? "blur(8px)" : "none",
      }}
    >
      <Text as="b" pb={10} fontSize="2xl" style={{userSelect: "none"}}>
        Will Content
      </Text>
      <Text style={{userSelect: "none"}}>{will.will}</Text>
    </Card>
  );
};

export default WillContent;
