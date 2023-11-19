import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Text,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Textarea,
  useSteps,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
  Link,
} from "@chakra-ui/react";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {abi, contractAddresses} from "../constants";
import {
  Address,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import {useDebounce} from "usehooks-ts";
import {FocusableElement} from "@chakra-ui/react";
import {BaseError, ContractFunctionExecutionError} from "viem";
import {ExternalLinkIcon} from "@chakra-ui/icons";

const steps = [
  {title: "First", description: "Author Information"},
  {title: "Second", description: "First Witness Information"},
  {title: "Third", description: "Second Witness Information"},
  {title: "Fourth", description: "Will Information"},
];

interface CreateWillParams {
  authorName: string;
  will: string;
  testatorCitizenshipCardId: string;
  testatorBirthdate: number;
  isPublic: boolean;
  firstWitnessName: string;
  firstWitnessCitizenshipCardId: string;
  firstWitnessBirthdate: number;
  secondWitnessName: string;
  secondWitnessCitizenshipCardId: string;
  secondWitnessBirthdate: number;
}

interface contractAddressesInterface {
  [key: string]: string[];
}

const CreateWill = () => {
  const addresses: contractAddressesInterface = contractAddresses;
  const contractAddress = addresses["11155111"][0] as Address; // sepolia chainId is 11155111

  const defaultWillParams: CreateWillParams = {
    authorName: "",
    will: "",
    testatorCitizenshipCardId: "",
    testatorBirthdate: 0,
    isPublic: true,
    firstWitnessName: "",
    firstWitnessCitizenshipCardId: "",
    firstWitnessBirthdate: 0,
    secondWitnessName: "",
    secondWitnessCitizenshipCardId: "",
    secondWitnessBirthdate: 0,
  };

  const [will, setWill] = useState<CreateWillParams>(defaultWillParams);
  const debouncedWill = useDebounce(will ? Object.values(will!) : null, 500);
  const [revokeMode, setRevokeMode] = useState(false);
  const {activeStep} = useSteps({
    index: 1,
    count: steps.length,
  });
  const {
    isOpen: isRevokeWillAlertOpen,
    onOpen: openRevokeWillAlertDialog,
    onClose,
  } = useDisclosure();
  const cancelRef = useRef<FocusableElement>(null);
  const toast = useToast();

  // usePrepareContractWrite hook fetches the parameters required for sending a contract write transaction.
  const {
    config: prepareCreateWillConfig,
    error: prepareCreateWillError,
    isError: isPrepareCreateWillError,
    refetch: refetchPrepareCreateWill,
  } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "createWill",
    enabled: Boolean(isWillCompleted()), // Enable the hook only when the debouncedWill is not null and all the fields are filled.
    args: debouncedWill ? debouncedWill : [],
    gas: 3100000n,
    onError: onPrepareCreateWillError,
  });

  // useContractWrite hook performs the actual contract write transaction.
  const {
    data: writeCreateWillData,
    write: writeCreateWill,
    reset: resetWriteCreateWill,
  } = useContractWrite(prepareCreateWillConfig);

  // useWaitForTransaction hook provides the ability to show feedback on the status of the transaction to the user.
  const {
    isLoading: isTransactionCreateWillLoading,
    isSuccess: isTransanctionCreateWillSuccess,
    isError: isTransactionCreateWillError,
    error: transactionCreateWillError,
  } = useWaitForTransaction({
    hash: writeCreateWillData?.hash,
  });

  // usePrepareContractWrite hook fetches the parameters required for sending a contract write transaction.
  const {
    config: prepareRevokePublicWillConfig,
    refetch: refetchPrepareRevokeWill,
  } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "revokePublicWill",
    enabled: Boolean(revokeMode), // Enable the hook only when the debouncedWill is not null and revokeMode is true.
    args: debouncedWill
      ? debouncedWill[2] != ""
        ? [debouncedWill[2]]
        : []
      : [], // The element at index 2 is the testatorCitizenshipCardId
    onError: onPrepareCreateWillError,
  });

  // useContractWrite hook performs the actual contract write transaction.
  const {
    data: writeRevokeWillData,
    write: revokeWrite,
    reset: resetWriteRevokeWill,
  } = useContractWrite(prepareRevokePublicWillConfig);

  const {
    isLoading: isTransactionRevokeWillLoading,
    isSuccess: isTransactionRevokeSuccess,
    isError: isTransactionRevokeWillError,
    data: transactionRevokeWillData,
    error: transactionRevokeWillError,
  } = useWaitForTransaction({
    hash: writeRevokeWillData?.hash,
  });

  useEffect(() => {
    if (
      isRevokeWillAlertOpen &&
      revokeMode &&
      !isTransactionRevokeWillLoading &&
      transactionRevokeWillData != null
    ) {
      console.log("Inside if statement to close modal");
      console.log("isRevokeWillModalOpen", isRevokeWillAlertOpen);
      console.log(
        "isTransactionRevokeWillLoading",
        isTransactionRevokeWillLoading
      );
      console.log("revokeMode", revokeMode);

      setRevokeMode(false);
      onClose();
    }
  }, [isTransactionRevokeWillLoading, revokeWrite, revokeMode]);

  useEffect(() => {
    resetWriteCreateWill();
    resetWriteRevokeWill();
    refetchPrepareCreateWill();
    refetchPrepareRevokeWill();
  }, [
    writeCreateWill,
    revokeWrite,
    isTransanctionCreateWillSuccess,
    isTransactionRevokeSuccess,
    isTransactionCreateWillError,
    isTransactionRevokeWillError,
  ]);

  useEffect(() => {
    {
      console.log("Inside useEffect for transaction status");
      if (isTransanctionCreateWillSuccess) {
        console.log("Success from create will", writeCreateWillData);
        toast({
          title: "Will Creation.",
          description: "Your will has been created successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else if (isTransactionCreateWillError) {
        console.log("Error from create will", transactionCreateWillError);

        toast({
          title: "Will Creation.",
          description:
            "Your will has not been created. Here are some details: " +
            transactionCreateWillError?.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  }, [isTransanctionCreateWillSuccess, isTransactionCreateWillError]);

  useEffect(() => {
    {
      if (isTransactionRevokeSuccess) {
        toast({
          title: "Will Revoke.",
          description: "Your will has been successfully revoked.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else if (isTransactionRevokeWillError) {
        toast({
          title: "Will Revoke.",
          description:
            "Your will has not been revoked. Here are some details: " +
            transactionRevokeWillError?.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  }, [isTransactionRevokeSuccess, isTransactionRevokeWillError]);

  function isWillCompleted(): boolean {
    return (
      will.authorName != "" &&
      will.testatorCitizenshipCardId != "" &&
      will.testatorBirthdate != 0 &&
      will.firstWitnessName != "" &&
      will.firstWitnessCitizenshipCardId != "" &&
      will.firstWitnessBirthdate != 0 &&
      will.secondWitnessName != "" &&
      will.secondWitnessCitizenshipCardId != "" &&
      will.secondWitnessBirthdate != 0 &&
      will.will != ""
    );
  }

  function onPrepareCreateWillError(error: Error): void {
    const baseError = error as BaseError;
    const isConstractFunctionExecutionError =
      baseError.walk(
        (e) => e instanceof ContractFunctionExecutionError
      ) instanceof ContractFunctionExecutionError;

    if (isConstractFunctionExecutionError) {
      const err = baseError as ContractFunctionExecutionError;
      // The reason for the error is available in the metaMessages property in the first element.
      console.log("Reason", err.metaMessages?.at(0));
    } else {
      console.log("Error from prepare write", error);
    }
  }

  function setAuthorName(event: ChangeEvent<HTMLInputElement>): void {
    console.log("Testator Name:", event.target.value);

    console.log("Debounced Will Params size", debouncedWill?.length);
    console.log("Debounced Will", debouncedWill);

    setWill({
      ...will,
      authorName: event.target.value, // Set the name to the value of the input field
    });

    console.log("Testator Name:", will.authorName);
  }

  function setAuthorCitizenshipId(event: ChangeEvent<HTMLInputElement>): void {
    console.log("Testator Citizenship Id:", event.target.value);

    console.log("Debounced Will Params size", debouncedWill?.length);
    console.log("Debounced Will", debouncedWill);

    setWill({
      ...will,
      testatorCitizenshipCardId: event.target.value,
    });
  }

  function setAuthorBirthdate(event: ChangeEvent<HTMLInputElement>): void {
    console.log("Testator Birthdate:", event.target.value);
    // Convert the date string to a timestamp
    const birthdateTimestamp = new Date(event.target.value).getTime() / 1000;

    console.log("Testator Birthdate Timestamp:", birthdateTimestamp);

    console.log("Debounced Will Params size", debouncedWill?.length);
    console.log("Debounced Will", debouncedWill);

    setWill({
      ...will,
      testatorBirthdate: birthdateTimestamp,
    });
  }

  function setFirstWitnessName(event: ChangeEvent<HTMLInputElement>): void {
    console.log("First Witness Name:", event.target.value);

    console.log("Debounced Will Params size", debouncedWill?.length);
    console.log("Debounced Will", debouncedWill);
    setWill({
      ...will,
      firstWitnessName: event.target.value,
    });
  }

  function setFirstWitnessCitizenshipId(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    console.log("First Witness CitizenshipId:", event.target.value);

    console.log("Debounced Will Params size", debouncedWill?.length);
    console.log("Debounced Will", debouncedWill);
    setWill({
      ...will,
      firstWitnessCitizenshipCardId: event.target.value,
    });
  }

  function setFirstWitnessBirthdate(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    console.log("First Witness Birthdate:", event.target.value);
    // Convert the date string to a timestamp
    const birthdateTimestamp = new Date(event.target.value).getTime() / 1000;

    console.log("Debounced Will Params size", debouncedWill?.length);
    console.log("Debounced Will", debouncedWill);

    console.log("First Witness Birthdate Timestamp:", birthdateTimestamp);

    setWill({
      ...will,
      firstWitnessBirthdate: birthdateTimestamp,
    });
  }

  function setSecondWitnessName(event: ChangeEvent<HTMLInputElement>): void {
    console.log("Second Witness Name:", event.target.value);

    console.log("Debounced Will Params size", debouncedWill?.length);
    console.log("Debounced Will", debouncedWill);
    setWill({
      ...will,
      secondWitnessName: event.target.value,
    });
  }

  function setSecondWitnessCitizenshipId(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    console.log("Second Witness CitizenshipId:", event.target.value);
    console.log("Debounced Will Params size", debouncedWill?.length);
    console.log("Debounced Will", debouncedWill);

    setWill({
      ...will,
      secondWitnessCitizenshipCardId: event.target.value,
    });
  }

  function setSecondWitnessBirthdate(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    console.log("Second Witness Birthdate:", event.target.value);
    // Convert the date string to a timestamp
    const birthdateTimestamp = new Date(event.target.value).getTime() / 1000;
    console.log("Debounced Will Params size", debouncedWill?.length);
    console.log("Debounced Will", debouncedWill);

    console.log("Second Witness Birthdate Timestamp:", birthdateTimestamp);

    setWill({
      ...will,
      secondWitnessBirthdate: birthdateTimestamp,
    });
  }

  function setWillType(nextValue: string): void {
    console.log("Will Type:", nextValue);
    console.log("Debounced Will Params size", debouncedWill?.length);
    console.log("Debounced Will", debouncedWill);

    setWill({
      ...will,
      isPublic: nextValue == "public",
    });
  }

  function setWillBody(event: ChangeEvent<HTMLTextAreaElement>): void {
    console.log("Will Body:", event.target.value);

    console.log("Debounced Will Params size", debouncedWill?.length);
    console.log("Debounced Will", debouncedWill);

    setWill({...will, will: event.target.value});
  }

  function activateRevokeWillMode(): void {
    setRevokeMode(true);
    revokeWrite?.();
  }

  function deactivateRevokeWillMode(): void {
    setRevokeMode(false);
    onClose();
  }

  return (
    <>
      <Stack direction="row">
        <Stepper
          p={10}
          index={activeStep}
          orientation="vertical"
          gap="0"
          h={300}
        >
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>

        <Stack p={10} w="100%" direction="column">
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem>
              <AccordionButton>
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
              <AccordionButton>
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
              <AccordionButton>
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
          <Button
            w="fit-content"
            isLoading={isTransactionCreateWillLoading}
            loadingText="Creating Will..."
            isDisabled={isTransactionCreateWillLoading}
            onClick={() => {
              if (!isPrepareCreateWillError) {
                writeCreateWill?.();
              } else if (
                isPrepareCreateWillError &&
                prepareCreateWillError?.message.includes("HasCreatedWill")
              ) {
                openRevokeWillAlertDialog();
              }
            }}
          >
            {isTransactionCreateWillLoading
              ? "Creating Will..."
              : "Create Will"}
          </Button>
        </Stack>
      </Stack>
      {isTransanctionCreateWillSuccess && (
        <>
          <Link
            href={`https://sepolia.etherscan.io/tx/${writeCreateWillData?.hash}`}
            isExternal
          >
            Your Will transaction Data <ExternalLinkIcon mx="2px" />
          </Link>
        </>
      )}
      <AlertDialog
        closeOnOverlayClick={false}
        isOpen={isRevokeWillAlertOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Revoke Will?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Text>
              You've previously created a will. Would you like to revoke it and
              designate this as your new will? Click 'Yes' to proceed, and then
              press the 'Create Will' button to generate your will.
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              isLoading={isTransactionRevokeWillLoading}
              loadingText="Revoking Will..."
              colorScheme="blue"
              mr={3}
              onClick={activateRevokeWillMode}
            >
              Yes
            </Button>
            <Button onClick={deactivateRevokeWillMode}>Cancel</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CreateWill;
