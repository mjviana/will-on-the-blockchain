import {Card, Grid, GridItem, HStack, Icon, Text} from "@chakra-ui/react";
import {BlockchainWill} from "../types";
import {FaUser} from "react-icons/fa";
import {HiIdentification} from "react-icons/hi";

interface WillWitnessInformationProps {
  will: BlockchainWill.WillStructOutput;
}

export const WillWitnessInformation = ({will}: WillWitnessInformationProps) => {
  return (
    <Card mb={5} mx={10} p={10}>
      <Text as="b" pb={10} fontSize="2xl">
        Witnesses Information
      </Text>
      <Grid
        templateColumns={{base: "repeat(1, 1fr)", md: "repeat(2, 1fr)"}}
        gap={5}
      >
        <GridItem>
          <Text as="b">First Witness:</Text>
          <HStack pt={3}>
            <Icon as={FaUser} />
            <Text as="b">Name:</Text>
            <Text>{will.firstWitness?.name}</Text>
          </HStack>
          <HStack>
            <Icon as={HiIdentification} />
            <Text as="b">Citizenship Id:</Text>
            <Text>{will.firstWitness?.citizenshipCardId}</Text>
          </HStack>
        </GridItem>
        <GridItem>
          <Text pt={5} as="b">
            Second Witness:
          </Text>
          <HStack pt={3}>
            <Icon as={FaUser} />
            <Text as="b">Name:</Text>
            <Text>{will.secondWitness?.name}</Text>
          </HStack>
          <HStack>
            <Icon as={HiIdentification} />
            <Text as="b">Citizenship Id:</Text>
            <Text>{will.secondWitness?.citizenshipCardId}</Text>
          </HStack>
        </GridItem>
      </Grid>
    </Card>
  );
};
