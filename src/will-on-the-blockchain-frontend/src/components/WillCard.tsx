import {
  Button,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Heading,
  Text,
  Icon,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Divider,
} from "@chakra-ui/react";
import {FaUser, FaCalendar, FaUserFriends} from "react-icons/fa";
import {HiIdentification} from "react-icons/hi";
import {BlockchainWill} from "../types/BlockchainWill";
import {convertEpochStringToDate} from "../utils/EpockConverter";

interface WillCardProps {
  will: BlockchainWill.WillStructOutput;
}

const WillCard = ({will}: WillCardProps) => {
  console.log("will", will);

  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <Card>
      <CardBody>
        <Heading mb={3} size="md">
          Will Details
        </Heading>
        <HStack>
          <Icon as={FaUser} />
          <Text>Testator Name</Text>
        </HStack>
        <Text>{will.testator.name}</Text>
        <HStack>
          <Icon as={HiIdentification} />
          <Text>Citizenship Id</Text>
        </HStack>
        <Text>{will.testator.citizenshipCardId}</Text>
        <HStack>
          <Icon as={FaCalendar} />
          <Text>Date of Creation</Text>
        </HStack>
        <Text>
          {convertEpochStringToDate(will.createdAt.toString())?.toDateString()}
        </Text>
        <HStack>
          <Icon as={FaUserFriends} />
          <Text>Witnesses</Text>
        </HStack>
        <Text>
          {will.firstWitness.name}, {will.secondWitness.name}
        </Text>
      </CardBody>
      <CardFooter>
        <Button onClick={onOpen}>View will</Button>
      </CardFooter>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Will from {will.testator.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <HStack>
              <Icon as={FaUser} />
              <Text>Testator Name</Text>
            </HStack>
            <Text>{will.testator.name}</Text>
            <HStack>
              <Icon as={HiIdentification} />
              <Text>Citizenship Id</Text>
            </HStack>
            <Text>{will.testator.citizenshipCardId}</Text>
            <HStack>
              <Icon as={FaCalendar} />
              <Text>Date of Creation</Text>
            </HStack>
            <Text>
              {" "}
              {convertEpochStringToDate(
                will.createdAt.toString()
              )?.toDateString()}
            </Text>
            <HStack>
              <Icon as={FaUserFriends} />
              <Text>Witnesses</Text>
            </HStack>
            <Text>
              {will.firstWitness.name}, {will.secondWitness.name}
            </Text>
            <Divider pb={5} />
            <Text pt={5}>{will.will}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default WillCard;
