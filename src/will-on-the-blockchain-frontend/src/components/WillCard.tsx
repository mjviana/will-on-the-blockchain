import {
  Card,
  CardBody,
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
    <Card
      onClick={onOpen}
      border="1px"
      borderRadius={15}
      _hover={{cursor: "pointer"}}
    >
      <CardBody>
        <Heading mb={3} size="md">
          Will Details
        </Heading>
        <HStack>
          <Icon as={FaUser} />
          <Text as="b">Testator Name:</Text>
          <Text>{will.testator.name}</Text>
        </HStack>
        <HStack>
          <Icon as={HiIdentification} />
          <Text as="b">Citizenship Id:</Text>
          <Text>{will.testator.citizenshipCardId}</Text>
        </HStack>
        <HStack>
          <Icon as={FaCalendar} />
          <Text as="b">Date of Creation:</Text>
          <Text>
            {convertEpochStringToDate(
              will.createdAt.toString()
            )?.toDateString()}
          </Text>
        </HStack>
        <HStack>
          <Icon as={FaUserFriends} />
          <Text as="b">Witnesses:</Text>
          <Text>
            {will.firstWitness.name}, {will.secondWitness.name}
          </Text>
        </HStack>
      </CardBody>
      {/* <CardFooter>
        <Button onClick={onOpen}>View will</Button>
      </CardFooter> */}

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Will from {will.testator.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <HStack>
              <Icon as={FaUser} />
              <Text as="b">Testator Name:</Text>
              <Text>{will.testator.name}</Text>
            </HStack>
            <HStack>
              <Icon as={HiIdentification} />
              <Text as="b">Citizenship Id:</Text>
              <Text>{will.testator.citizenshipCardId}</Text>
            </HStack>
            <HStack>
              <Icon as={FaCalendar} />
              <Text as="b">Date of Creation:</Text>
              <Text>
                {convertEpochStringToDate(
                  will.createdAt.toString()
                )?.toDateString()}
              </Text>
            </HStack>
            <HStack>
              <Icon as={FaUserFriends} />
              <Text as="b">Witnesses:</Text>
              <Text>
                {will.firstWitness.name}, {will.secondWitness.name}
              </Text>
            </HStack>
            <Divider pb={5} />
            <Text pt={5}>{will.will}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default WillCard;
