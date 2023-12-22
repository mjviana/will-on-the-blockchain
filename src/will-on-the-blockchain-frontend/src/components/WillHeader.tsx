import {HStack, Icon, Text} from "@chakra-ui/react";
import {FaUser, FaCalendar, FaUserFriends} from "react-icons/fa";
import {HiIdentification} from "react-icons/hi";
import {BlockchainWill} from "../types";

interface WillHeaderProps {
  will: BlockchainWill.WillStructOutput;
}

const WillHeader = ({will}: WillHeaderProps) => {
  return (
    <>
      <HStack>
        <Icon as={FaUser} />
        <Text>Testator Name</Text>
      </HStack>
      <Text>{will.testator?.name}</Text>
      <HStack>
        <Icon as={HiIdentification} />
        <Text>Citizenship Id</Text>
      </HStack>
      <Text>{will.testator?.citizenshipCardId}</Text>
      <HStack>
        <Icon as={FaCalendar} />
        <Text>Date of Creation</Text>
      </HStack>
      <Text>18/08/2023</Text>
      <HStack>
        <Icon as={FaUserFriends} />
        <Text>Witnesses</Text>
      </HStack>
      <Text>
        {will.firstWitness?.name}, {will.secondWitness?.name}
      </Text>
    </>
  );
};

export default WillHeader;
