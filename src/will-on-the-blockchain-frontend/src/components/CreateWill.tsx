import {
  Button,
  Text,
  Stack,
  useSteps,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Link,
} from "@chakra-ui/react";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {contractAddresses} from "../constants";
import {Address, useAccount} from "wagmi";
import {useDebounce} from "usehooks-ts";
import {ExternalLinkIcon} from "@chakra-ui/icons";
import CreateWillParams from "../types/CreateWillParams";
import ContractAddressesInterface from "../types/ContractAddressesInterface";
import {useCreateWill} from "../hooks/useCreateWill";
import {useRevokeWill} from "../hooks/useRevokeWill";
import {useFeedbackToast} from "../hooks/useFeedbackToast";
import WillStepper from "./WillStepper";
import {CreateWillButton} from "./CreateWillButton";
import {WillForm} from "./WillForm";

const steps = [
  {
    title: "First",
    description: "Author Information",
    size: "150",
    active: true,
    completed: false,
  },
  {
    title: "Second",
    description: "First Witness Information",
    size: "150",
    active: false,
    completed: false,
  },
  {
    title: "Third",
    description: "Second Witness Information",
    size: "150",
    active: false,
    completed: false,
  },
  {
    title: "Fourth",
    description: "Will Information",
    size: "50",
    active: false,
    completed: false,
  },
];

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

const CreateWill = () => {
  const addresses: ContractAddressesInterface = contractAddresses;
  const contractAddress = addresses["11155111"][0] as Address; // sepolia chainId is 11155111
  const [will, setWill] = useState<CreateWillParams>(defaultWillParams);
  const debouncedWill = useDebounce(will ? Object.values(will!) : null, 500);
  const [revokeMode, setRevokeMode] = useState(false);
  const {activeStep, setActiveStep} = useSteps({
    index: 0,
    count: steps.length,
  });
  const [willSteps, setWillSteps] = useState(steps);
  const {
    isOpen: isRevokeWillAlertOpen,
    onOpen: openRevokeWillAlertDialog,
    onClose = () => {
      console.log("Closing alert...");
    },
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [setFeedbackToast] = useFeedbackToast();

  const {address: walletAddress, isConnected} = useAccount();

  const {
    prepareCreateWillError,
    isPrepareCreateWillError,
    writeCreateWillData,
    isWriteCreateWillLoading,
    writeCreateWillError,
    refetchPrepareCreateWill,
    writeCreateWill,
    isTransactionCreateWillLoading,
    isTransanctionCreateWillSuccess,
    isTransactionCreateWillError,
    transactionCreateWillError,
  } = useCreateWill(contractAddress, debouncedWill, isWillCompleted());

  const {
    prepareRevokeWillError,
    writeRevokeWill,
    writeRevokeWillError,
    refetchPrepareRevokeWill,
    isWriteRevokeWillLoading,
    isTransactionRevokeWillLoading,
    isTransactionRevokeSuccess,
    isTransactionRevokeWillError,
    transactionRevokeWillData,
    transactionRevokeWillError,
  } = useRevokeWill(contractAddress, debouncedWill, revokeMode);

  useEffect(() => {
    {
      if (isTransanctionCreateWillSuccess) {
        setFeedbackToast({
          title: "Will Creation.",
          description: "Your will has been created successfully.",
          status: "success",
        });
      } else if (isTransactionCreateWillError) {
        setFeedbackToast({
          title: "Will Creation.",
          description:
            "Your will has not been created. Here are some details: " +
            transactionCreateWillError?.message,
          status: "error",
        });
      }
      refetchPrepareRevokeWill();
    }
  }, [isTransanctionCreateWillSuccess, isTransactionCreateWillError]);

  useEffect(() => {
    {
      if (isTransactionRevokeSuccess) {
        setFeedbackToast({
          title: "Will Revoke.",
          description: "Your will has been successfully revoked.",
          status: "success",
        });
      } else if (isTransactionRevokeWillError) {
        setFeedbackToast({
          title: "Will Revoke.",
          description:
            "Your will has not been revoked. Here are some details: " +
            transactionRevokeWillError?.message,
          status: "error",
        });
      }
      deactivateRevokeWillMode();
      refetchPrepareCreateWill();
    }
  }, [isTransactionRevokeSuccess, isTransactionRevokeWillError]);

  function isWillCompleted(): boolean {
    return (
      isAuthorDataCompleted() &&
      isFirstWitnessDataCompleted() &&
      isSecondWitnessDataCompleted() &&
      will.will.length > 0
    );
  }

  function isAuthorDataCompleted(): boolean {
    return (
      will.authorName.length > 0 &&
      will.testatorCitizenshipCardId.length > 0 &&
      will.testatorBirthdate != 0
    );
  }

  function isFirstWitnessDataCompleted(): boolean {
    return (
      will.firstWitnessName.length > 0 &&
      will.firstWitnessCitizenshipCardId.length > 0 &&
      will.firstWitnessBirthdate != 0
    );
  }

  function isSecondWitnessDataCompleted(): boolean {
    return (
      will.secondWitnessName.length > 0 &&
      will.secondWitnessCitizenshipCardId.length > 0 &&
      will.secondWitnessBirthdate != 0
    );
  }

  function setAuthorName(event: ChangeEvent<HTMLInputElement>): void {
    setWill({
      ...will,
      authorName: event.target.value, // Set the name to the value of the input field
    });

    if (isAuthorDataCompleted()) {
      setActiveStep(1);
      setWillSteps(
        willSteps.map((step) =>
          step.title === "First" ? {...step, completed: true} : step
        )
      );
    } else {
      setWillSteps(
        willSteps.map((step) =>
          step.title === "First" ? {...step, completed: false} : step
        )
      );
    }
  }

  function setAuthorCitizenshipId(event: ChangeEvent<HTMLInputElement>): void {
    setWill({
      ...will,
      testatorCitizenshipCardId: event.target.value,
    });

    if (isAuthorDataCompleted()) {
      setActiveStep(1);
      setWillSteps(
        willSteps.map((step) =>
          step.title === "First" ? {...step, completed: true} : step
        )
      );
    } else {
      setWillSteps(
        willSteps.map((step) =>
          step.title === "First" ? {...step, completed: false} : step
        )
      );
    }
  }

  function setAuthorBirthdate(event: ChangeEvent<HTMLInputElement>): void {
    // Convert the date string to a timestamp
    const birthdateTimestamp = new Date(event.target.value).getTime() / 1000;

    setWill({
      ...will,
      testatorBirthdate: birthdateTimestamp,
    });

    if (isAuthorDataCompleted()) {
      setActiveStep(1);
      setWillSteps(
        willSteps.map((step) =>
          step.title === "First" ? {...step, completed: true} : step
        )
      );
    } else {
      setWillSteps(
        willSteps.map((step) =>
          step.title === "First" ? {...step, completed: false} : step
        )
      );
    }
  }

  function setFirstWitnessName(event: ChangeEvent<HTMLInputElement>): void {
    setWill({
      ...will,
      firstWitnessName: event.target.value,
    });

    if (isFirstWitnessDataCompleted()) {
      setActiveStep(2);
      setWillSteps(
        willSteps.map((step) =>
          step.title === "Second" ? {...step, completed: true} : step
        )
      );
    } else {
      setWillSteps(
        willSteps.map((step) =>
          step.title === "Second" ? {...step, completed: false} : step
        )
      );
    }
  }

  function setFirstWitnessCitizenshipId(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    setWill({
      ...will,
      firstWitnessCitizenshipCardId: event.target.value,
    });

    if (isFirstWitnessDataCompleted()) {
      setActiveStep(2);
      setWillSteps(
        willSteps.map((step) =>
          step.title === "Second" ? {...step, completed: true} : step
        )
      );
    } else {
      setWillSteps(
        willSteps.map((step) =>
          step.title === "Second" ? {...step, completed: false} : step
        )
      );
    }
  }

  function setFirstWitnessBirthdate(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    // Convert the date string to a timestamp
    const birthdateTimestamp = new Date(event.target.value).getTime() / 1000;

    setWill({
      ...will,
      firstWitnessBirthdate: birthdateTimestamp,
    });

    if (isFirstWitnessDataCompleted()) {
      setActiveStep(2);
      setWillSteps(
        willSteps.map((step) =>
          step.title === "Second" ? {...step, completed: true} : step
        )
      );
    } else {
      setWillSteps(
        willSteps.map((step) =>
          step.title === "Second" ? {...step, completed: false} : step
        )
      );
    }
  }

  function setSecondWitnessName(event: ChangeEvent<HTMLInputElement>): void {
    setWill({
      ...will,
      secondWitnessName: event.target.value,
    });

    if (isSecondWitnessDataCompleted()) {
      setActiveStep(3);
      setWillSteps(
        willSteps.map((step) =>
          step.title === "Third" ? {...step, completed: true} : step
        )
      );
    } else {
      setWillSteps(
        willSteps.map((step) =>
          step.title === "Third" ? {...step, completed: false} : step
        )
      );
    }
  }

  function setSecondWitnessCitizenshipId(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    setWill({
      ...will,
      secondWitnessCitizenshipCardId: event.target.value,
    });

    if (isSecondWitnessDataCompleted()) {
      setActiveStep(3);
      setWillSteps(
        willSteps.map((step) =>
          step.title === "Third" ? {...step, completed: true} : step
        )
      );
    } else {
      setWillSteps(
        willSteps.map((step) =>
          step.title === "Third" ? {...step, completed: false} : step
        )
      );
    }
  }

  function setSecondWitnessBirthdate(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    // Convert the date string to a timestamp
    const birthdateTimestamp = new Date(event.target.value).getTime() / 1000;

    setWill({
      ...will,
      secondWitnessBirthdate: birthdateTimestamp,
    });

    if (isSecondWitnessDataCompleted()) {
      setActiveStep(3);
      setWillSteps(
        willSteps.map((step) =>
          step.title === "Third" ? {...step, completed: true} : step
        )
      );
    } else {
      setWillSteps(
        willSteps.map((step) =>
          step.title === "Third" ? {...step, completed: false} : step
        )
      );
    }
  }

  function setWillType(nextValue: string): void {
    setWill({
      ...will,
      isPublic: nextValue == "public",
    });
  }

  function setWillBody(event: ChangeEvent<HTMLTextAreaElement>): void {
    setWill({...will, will: event.target.value});

    if (isWillCompleted()) {
      setActiveStep(4);
      setWillSteps(
        willSteps.map((step) =>
          step.title === "Fourth" ? {...step, completed: true} : step
        )
      );
    } else {
      setWillSteps(
        willSteps.map((step) =>
          step.title === "Fourth" ? {...step, completed: false} : step
        )
      );
    }
  }

  function activateRevokeWillMode(): void {
    console.log("Revoking will...");
    console.log("Write revoke will", writeRevokeWill);
    setRevokeMode(true);
    writeRevokeWill?.();
  }

  function deactivateRevokeWillMode(): void {
    console.log("Deactivating revoke will mode...");
    setRevokeMode(false);
    onClose();
  }

  function toggleAuthorAccordionButton(): void {
    setWillSteps(
      willSteps.map((step) =>
        step.title === "First" ? {...step, active: !step.active} : step
      )
    );
  }

  function toggleFirstWitnessButton(): void {
    setWillSteps(
      willSteps.map((step) =>
        step.title === "Second" ? {...step, active: !step.active} : step
      )
    );
  }

  function toggleSecondWitnessButton(): void {
    setWillSteps(
      willSteps.map((step) =>
        step.title === "Third" ? {...step, active: !step.active} : step
      )
    );
  }

  return (
    <>
      <Stack direction="row">
        <WillStepper activeStep={activeStep} steps={willSteps} />
        <Stack p={10} w="100%" direction="column">
          <WillForm
            setAuthorBirthdate={setAuthorBirthdate}
            setAuthorCitizenshipId={setAuthorCitizenshipId}
            setAuthorName={setAuthorName}
            setFirstWitnessBirthdate={setFirstWitnessBirthdate}
            setFirstWitnessCitizenshipId={setFirstWitnessCitizenshipId}
            setFirstWitnessName={setFirstWitnessName}
            setSecondWitnessBirthdate={setSecondWitnessBirthdate}
            setSecondWitnessCitizenshipId={setSecondWitnessCitizenshipId}
            setSecondWitnessName={setSecondWitnessName}
            setWillBody={setWillBody}
            setWillType={setWillType}
            toggleAuthorAccordionButton={toggleAuthorAccordionButton}
            toggleFirstWitnessButton={toggleFirstWitnessButton}
            toggleSecondWitnessButton={toggleSecondWitnessButton}
          />
          <CreateWillButton
            isWriteCreateWillLoading={isWriteCreateWillLoading}
            isTransactionCreateWillLoading={isTransactionCreateWillLoading}
            isWillCompleted={isWillCompleted}
            prepareCreateWillError={prepareCreateWillError}
            writeCreateWill={writeCreateWill}
            isPrepareCreateWillError={isPrepareCreateWillError}
            openRevokeWillAlertDialog={openRevokeWillAlertDialog}
          />
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
              isLoading={
                isWriteRevokeWillLoading || isTransactionRevokeWillLoading
              }
              isDisabled={
                isWriteRevokeWillLoading || isTransactionRevokeWillLoading
              }
              loadingText={
                isWriteRevokeWillLoading
                  ? "Waiting for confirmation..."
                  : isTransactionRevokeWillLoading
                  ? "Revoking Will..."
                  : "Yes"
              }
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

      <p>Prepare Errors:</p>
      {prepareCreateWillError && (
        <p>Error prepare Create will: {prepareCreateWillError.message}</p>
      )}
      {prepareRevokeWillError && (
        <p>Error preapre revoke will: {prepareRevokeWillError.message}</p>
      )}

      <p>----------------------------------</p>
      <p>Write Errors:</p>
      {writeCreateWillError && (
        <p>Error write Create will: {writeCreateWillError.message}</p>
      )}
      {writeRevokeWillError && (
        <p>Error write Revoke will: {writeRevokeWillError.message}</p>
      )}
      {isConnected ? <p>Connected to {walletAddress}</p> : <p>Not Connected</p>}
    </>
  );
};

export default CreateWill;
