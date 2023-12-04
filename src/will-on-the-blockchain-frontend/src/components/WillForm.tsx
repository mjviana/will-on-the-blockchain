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

interface WillFormProps {
  toggleAuthorAccordionButton: () => void;
  setAuthorName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setAuthorCitizenshipId: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setAuthorBirthdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleFirstWitnessButton: () => void;
  setFirstWitnessName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFirstWitnessCitizenshipId: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  setFirstWitnessBirthdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleSecondWitnessButton: () => void;
  setSecondWitnessName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSecondWitnessCitizenshipId: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  setSecondWitnessBirthdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setWillType: (e: string) => void;
  setWillBody: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function WillForm({
  toggleAuthorAccordionButton,
  setAuthorName,
  setAuthorCitizenshipId,
  setAuthorBirthdate,
  toggleFirstWitnessButton,
  setFirstWitnessName,
  setFirstWitnessCitizenshipId,
  setFirstWitnessBirthdate,
  toggleSecondWitnessButton,
  setSecondWitnessName,
  setSecondWitnessCitizenshipId,
  setSecondWitnessBirthdate,
  setWillType,
  setWillBody,
}: WillFormProps) {
  return (
    <>
      <Accordion defaultIndex={[0]} allowMultiple={true}>
        <AccordionItem>
          <AccordionButton onClick={toggleAuthorAccordionButton}>
            <Box as="span" flex="1" textAlign="left">
              <Heading as="h6" size="sm">
                Author
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Stack>
              <Input placeholder="Name" onChange={setAuthorName} />
              <Stack direction="row">
                <Input
                  type="number"
                  placeholder="Citizenship Id"
                  onChange={setAuthorCitizenshipId}
                />
                <Input
                  type="date"
                  placeholder="Birthdate"
                  onChange={setAuthorBirthdate}
                />
              </Stack>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton onClick={toggleFirstWitnessButton}>
            <Box as="span" flex="1" textAlign="left">
              <Heading as="h6" size="sm" pb={3}>
                First Witness
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Stack>
              <Input placeholder="Name" onChange={setFirstWitnessName} />
              <Stack direction="row">
                <Input
                  type="number"
                  placeholder="Citizenship Id"
                  onChange={setFirstWitnessCitizenshipId}
                />
                <Input
                  type="date"
                  placeholder="Birthdate"
                  onChange={setFirstWitnessBirthdate}
                />
              </Stack>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton onClick={toggleSecondWitnessButton}>
            <Box as="span" flex="1" textAlign="left">
              <Heading as="h6" size="sm" pb={3}>
                Second Witness
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Stack>
              <Input placeholder="Name" onChange={setSecondWitnessName} />
              <Stack direction="row">
                <Input
                  type="number"
                  placeholder="Citizenship Id"
                  onChange={setSecondWitnessCitizenshipId}
                />
                <Input
                  type="date"
                  placeholder="Birthdate"
                  onChange={setSecondWitnessBirthdate}
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
            <RadioGroup defaultValue="public" onChange={setWillType} mb={6}>
              <Stack direction="row" spacing={5}>
                <Radio value="public">Public</Radio>
                <Radio value="private">Private</Radio>
              </Stack>
            </RadioGroup>
            <Textarea
              h="200px"
              size="lg"
              placeholder="Write your will here"
              onChange={setWillBody}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
