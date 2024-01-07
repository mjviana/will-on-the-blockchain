import {Card, HStack, Icon, Text} from "@chakra-ui/react";
import {FaUser, FaCalendar} from "react-icons/fa";
import {HiIdentification} from "react-icons/hi";
import {BlockchainWill} from "../types";
import {convertEpochStringToDate} from "../utils/EpockConverter";

interface WillTestatorInformationProps {
  will: BlockchainWill.WillStructOutput;
}

const WillAuthorInformation = ({will}: WillTestatorInformationProps) => {
  return (
    <>
      <Card mb={5} mx={10} p={10}>
        <Text as="b" pb={10} fontSize="2xl">
          Author Information
        </Text>
        <HStack>
          <Icon as={FaUser} />
          <Text as="b">Testator Name:</Text>
          <Text>{will.testator?.name}</Text>
        </HStack>
        <HStack>
          <Icon as={HiIdentification} />
          <Text as="b">Citizenship Id:</Text>
          <Text>{will.testator?.citizenshipCardId}</Text>
        </HStack>
        <HStack>
          <Icon as={FaCalendar} />
          <Text as="b">Date of Creation:</Text>
          <Text>
            {" "}
            {convertEpochStringToDate(
              will.createdAt.toString()
            )?.toDateString()}
          </Text>
        </HStack>
      </Card>
    </>
  );
};

export default WillAuthorInformation;
