import {RevokeWillAlertDialog} from "../components/RevokeWillAlertDialog";
import {Stack, useSteps, useDisclosure, Link} from "@chakra-ui/react";
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
import WillStepper from "../components/WillStepper";
import {CreateWillButton} from "../components/CreateWillButton";
import {WillForm} from "../components/WillForm";
import {encrypt} from "../utils/CryptoHelper";

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

interface CreateWillPageProps {
  createWillParams: CreateWillParams;
  isToEncryptWill: boolean;
}

const defaultCreateWillPageProps: CreateWillPageProps = {
  createWillParams: defaultWillParams,
  isToEncryptWill: false,
};

const CreateWillPage = () => {
  // const [will, setWill] = useState<CreateWillParams>(defaultWillParams);
  const [createWillPageProps, setCreateWillPageProps] =
    useState<CreateWillPageProps>(defaultCreateWillPageProps);
  const [secretKey, setSecretkey] = useState("");
  // const debouncedWill = useDebounce(will ? Object.values(will!) : null, 500);
  const debouncedWill = useDebounce(
    createWillPageProps.createWillParams
      ? Object.values(createWillPageProps.createWillParams!)
      : null,
    500
  );
  const {activeStep, setActiveStep} = useSteps({
    index: 0,
    count: steps.length,
  });
  const [willSteps, setWillSteps] = useState(steps);
  const [revokeMode, setRevokeMode] = useState(false);
  const {
    isOpen: isRevokeWillAlertOpen,
    onOpen: openRevokeWillAlertDialog,
    onClose = () => {
      console.log("Closing alert...");
    },
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [setFeedbackToast] = useFeedbackToast();

  const addresses: ContractAddressesInterface = contractAddresses;
  const contractAddress = addresses["11155111"][0] as Address; // sepolia chainId is 11155111
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
    transactionRevokeWillError,
  } = useRevokeWill(contractAddress, debouncedWill, revokeMode);

  useEffect(() => {
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
      createWillPageProps.createWillParams.will.length > 0
    );
  }

  function isAuthorDataCompleted(): boolean {
    return (
      createWillPageProps.createWillParams.authorName.length > 0 &&
      createWillPageProps.createWillParams.testatorCitizenshipCardId.length >
        0 &&
      createWillPageProps.createWillParams.testatorBirthdate != 0
    );
  }

  function isFirstWitnessDataCompleted(): boolean {
    return (
      createWillPageProps.createWillParams.firstWitnessName.length > 0 &&
      createWillPageProps.createWillParams.firstWitnessCitizenshipCardId
        .length > 0 &&
      createWillPageProps.createWillParams.firstWitnessBirthdate != 0
    );
  }

  function isSecondWitnessDataCompleted(): boolean {
    return (
      createWillPageProps.createWillParams.secondWitnessName.length > 0 &&
      createWillPageProps.createWillParams.secondWitnessCitizenshipCardId
        .length > 0 &&
      createWillPageProps.createWillParams.secondWitnessBirthdate != 0
    );
  }

  function setAuthorName(event: ChangeEvent<HTMLInputElement>): void {
    setCreateWillPageProps({
      ...createWillPageProps,
      createWillParams: {
        ...createWillPageProps.createWillParams,
        authorName: event.target.value,
      },
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
    setCreateWillPageProps({
      ...createWillPageProps,
      createWillParams: {
        ...createWillPageProps.createWillParams,
        testatorCitizenshipCardId: event.target.value,
      },
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
    setCreateWillPageProps({
      ...createWillPageProps,
      createWillParams: {
        ...createWillPageProps.createWillParams,
        testatorBirthdate: birthdateTimestamp,
      },
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
    setCreateWillPageProps({
      ...createWillPageProps,
      createWillParams: {
        ...createWillPageProps.createWillParams,
        firstWitnessName: event.target.value,
      },
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
    setCreateWillPageProps({
      ...createWillPageProps,
      createWillParams: {
        ...createWillPageProps.createWillParams,
        firstWitnessCitizenshipCardId: event.target.value,
      },
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

    setCreateWillPageProps({
      ...createWillPageProps,
      createWillParams: {
        ...createWillPageProps.createWillParams,
        firstWitnessBirthdate: birthdateTimestamp,
      },
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
    setCreateWillPageProps({
      ...createWillPageProps,
      createWillParams: {
        ...createWillPageProps.createWillParams,
        secondWitnessName: event.target.value,
      },
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
    setCreateWillPageProps({
      ...createWillPageProps,
      createWillParams: {
        ...createWillPageProps.createWillParams,
        secondWitnessCitizenshipCardId: event.target.value,
      },
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

    setCreateWillPageProps({
      ...createWillPageProps,
      createWillParams: {
        ...createWillPageProps.createWillParams,
        secondWitnessBirthdate: birthdateTimestamp,
      },
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
    setCreateWillPageProps({
      ...createWillPageProps,
      createWillParams: {
        ...createWillPageProps.createWillParams,
        isPublic: nextValue === "public",
      },
    });
  }

  function setWillBody(event: ChangeEvent<HTMLTextAreaElement>): void {
    setCreateWillPageProps({
      ...createWillPageProps,
      createWillParams: {
        ...createWillPageProps.createWillParams,
        will: event.target.value,
      },
    });

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

  function handleCreateWillClick(): void {
    if (!prepareCreateWillError) {
      console.log("Will:", createWillPageProps.createWillParams);

      if (
        encryptWillConditionsMet(
          createWillPageProps.createWillParams.isPublic,
          createWillPageProps.createWillParams.will,
          secretKey
        )
      ) {
        const encryptedWill = encrypt(
          createWillPageProps.createWillParams.will,
          secretKey
        );
        setCreateWillPageProps({
          ...createWillPageProps,
          isToEncryptWill: true,
          createWillParams: {
            ...createWillPageProps.createWillParams,
            will: encryptedWill,
          },
        });
      } else {
        writeCreateWill?.();
      }
    } else if (
      isPrepareCreateWillError &&
      prepareCreateWillError?.message.includes("HasCreatedWill")
    ) {
      openRevokeWillAlertDialog();
    }
  }

  function handleSecretKeyChange(e: ChangeEvent<HTMLInputElement>): void {
    setSecretkey(e.target.value);
  }

  function encryptWillConditionsMet(
    isPublicWill: boolean,
    willBody: string,
    secretKey: string
  ): boolean {
    return !isPublicWill && willBody.length > 0 && secretKey.length > 0;
  }

  useEffect(() => {
    console.log("in isToEncryptWill useEffect");
    console.log("will state", createWillPageProps);

    if (createWillPageProps.isToEncryptWill) {
      console.log("Inside isToEncryptWill useEffect if statement");
      console.log(writeCreateWill);
      writeCreateWill?.();
    }
  }, [createWillPageProps.isToEncryptWill]);

  return (
    <>
      <Stack direction="row">
        <WillStepper activeStep={activeStep} steps={willSteps} />
        <Stack p={10} w="100%" direction="column">
          <WillForm
            onAuthorBirthdateChange={setAuthorBirthdate}
            onAuthorCitizenshipIdChange={setAuthorCitizenshipId}
            onAuthorNameChange={setAuthorName}
            onFirstWitnessBirthdateChange={setFirstWitnessBirthdate}
            onFirstWitnessCitizenshipIdChange={setFirstWitnessCitizenshipId}
            onFirstWitnessNameChange={setFirstWitnessName}
            onSecondWitnessBirthdateChange={setSecondWitnessBirthdate}
            onSecondWitnessCitizenshipIdChange={setSecondWitnessCitizenshipId}
            onSecondWitnessNameChange={setSecondWitnessName}
            onWillBodyChange={setWillBody}
            onWillTypeChange={setWillType}
            onAuthorAccordionButtonClick={toggleAuthorAccordionButton}
            onFirstWitnessAccordionButtonClick={toggleFirstWitnessButton}
            onSecondWitnessAccordionButtonClick={toggleSecondWitnessButton}
            isPrivateWill={!createWillPageProps.createWillParams.isPublic}
            onSecretKeyChange={handleSecretKeyChange}
          />
          <CreateWillButton
            isWriteCreateWillLoading={isWriteCreateWillLoading}
            isTransactionCreateWillLoading={isTransactionCreateWillLoading}
            isWillCompleted={isWillCompleted()}
            onCreateWill={handleCreateWillClick}
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
      <RevokeWillAlertDialog
        isRevokeWillAlertOpen={isRevokeWillAlertOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        isWriteRevokeWillLoading={isWriteRevokeWillLoading}
        isTransactionRevokeWillLoading={isTransactionRevokeWillLoading}
        onActivateRevokeWillMode={activateRevokeWillMode}
        onDeactivateRevokeWillMode={deactivateRevokeWillMode}
      />

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

export default CreateWillPage;
