import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import SecretCode from "./SecretCode";
import {BlockchainWill} from "../types";

interface WillFormProps {
  onAuthorAccordionButtonClick: () => void;
  onAuthorNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAuthorCitizenshipIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAuthorBirthdateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFirstWitnessAccordionButtonClick: () => void;
  onFirstWitnessNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFirstWitnessCitizenshipIdChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onFirstWitnessBirthdateChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onSecondWitnessAccordionButtonClick: () => void;
  onSecondWitnessNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSecondWitnessCitizenshipIdChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onSecondWitnessBirthdateChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onWillTypeChange: (e: string) => void;
  onWillBodyChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSecretKeyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
  value: BlockchainWill.WillCreationStruct;
  rawWill: string;
  rawSecretCode: string;
}

export function WillForm({
  onAuthorAccordionButtonClick,
  onAuthorNameChange,
  onAuthorCitizenshipIdChange,
  onAuthorBirthdateChange,
  onFirstWitnessAccordionButtonClick,
  onFirstWitnessNameChange,
  onFirstWitnessCitizenshipIdChange,
  onFirstWitnessBirthdateChange,
  onSecondWitnessAccordionButtonClick,
  onSecondWitnessNameChange,
  onSecondWitnessCitizenshipIdChange,
  onSecondWitnessBirthdateChange,
  onWillTypeChange,
  onWillBodyChange,
  onSecretKeyChange,
  isDisabled,
  value,
  rawWill,
  rawSecretCode,
}: WillFormProps) {
  return (
    <>
      <Accordion defaultIndex={[0]} allowMultiple={true}>
        <AccordionItem>
          <AccordionButton onClick={onAuthorAccordionButtonClick}>
            <Box as="span" flex="1" textAlign="left">
              <Heading as="h6" size="sm">
                Author
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Stack>
              <Input
                value={value.testator.name}
                isDisabled={isDisabled}
                placeholder="Name"
                onChange={onAuthorNameChange}
              />
              <Stack direction="row">
                <Input
                  value={value.testator.citizenshipCardId}
                  isDisabled={isDisabled}
                  type="number"
                  placeholder="Citizenship Id"
                  onChange={onAuthorCitizenshipIdChange}
                />
                <Input
                  value={
                    value.testator.birthdate
                      ? new Date((value.testator.birthdate as number) * 1000)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  isDisabled={isDisabled}
                  type="date"
                  placeholder="Birthdate"
                  onChange={onAuthorBirthdateChange}
                />
              </Stack>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton onClick={onFirstWitnessAccordionButtonClick}>
            <Box as="span" flex="1" textAlign="left">
              <Heading as="h6" size="sm" pb={3}>
                First Witness
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Stack>
              <Input
                value={value.firstWitness.name}
                isDisabled={isDisabled}
                placeholder="Name"
                onChange={onFirstWitnessNameChange}
              />
              <Stack direction="row">
                <Input
                  value={value.firstWitness.citizenshipCardId}
                  isDisabled={isDisabled}
                  type="number"
                  placeholder="Citizenship Id"
                  onChange={onFirstWitnessCitizenshipIdChange}
                />
                <Input
                  value={
                    value.firstWitness.birthdate
                      ? new Date(
                          (value.firstWitness.birthdate as number) * 1000
                        )
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  isDisabled={isDisabled}
                  type="date"
                  placeholder="Birthdate"
                  onChange={onFirstWitnessBirthdateChange}
                />
              </Stack>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton onClick={onSecondWitnessAccordionButtonClick}>
            <Box as="span" flex="1" textAlign="left">
              <Heading as="h6" size="sm" pb={3}>
                Second Witness
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Stack>
              <Input
                value={value.secondWitness.name}
                isDisabled={isDisabled}
                placeholder="Name"
                onChange={onSecondWitnessNameChange}
              />
              <Stack direction="row">
                <Input
                  value={value.secondWitness.citizenshipCardId}
                  isDisabled={isDisabled}
                  type="number"
                  placeholder="Citizenship Id"
                  onChange={onSecondWitnessCitizenshipIdChange}
                />
                <Input
                  value={
                    value.secondWitness.birthdate
                      ? new Date(
                          (value.secondWitness.birthdate as number) * 1000
                        )
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  isDisabled={isDisabled}
                  type="date"
                  placeholder="Birthdate"
                  onChange={onSecondWitnessBirthdateChange}
                />
              </Stack>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Heading as="h6" size="sm" pb={3}>
                Will
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <RadioGroup
              value={value.isPublic ? "public" : "private"}
              isDisabled={isDisabled}
              defaultValue="public"
              onChange={onWillTypeChange}
              mb={6}
            >
              <Stack direction="row" spacing={5}>
                <Radio value="public">Public</Radio>
                <Radio value="private">Private</Radio>
                <SecretCode
                  value={rawSecretCode}
                  isDisabled={isDisabled}
                  onSecretCodeChange={onSecretKeyChange}
                />
              </Stack>
            </RadioGroup>
            <Textarea
              value={rawWill}
              isDisabled={isDisabled}
              h="200px"
              size="lg"
              placeholder="Write your will here"
              onChange={onWillBodyChange}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
