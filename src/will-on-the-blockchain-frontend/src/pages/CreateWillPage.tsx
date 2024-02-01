import {Stack, useSteps, Link} from "@chakra-ui/react";
import {ChangeEvent, useEffect, useState} from "react";
import {contractAddresses} from "../constants";
import {Address, useAccount} from "wagmi";
import {ExternalLinkIcon} from "@chakra-ui/icons";
import ContractAddressesInterface from "../types/ContractAddressesInterface";
import {useCreateWill} from "../hooks/useCreateWill";
import WillStepper from "../components/WillStepper";
import {CreateWillButton} from "../components/CreateWillButton";
import {WillForm} from "../components/WillForm";
import {encrypt} from "../utils/CryptoHelper";
import FeedbackToast from "../components/FeedbackToast";
import {BlockchainWill} from "../types";

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

const defaultCreateWillParamsTest: BlockchainWill.WillCreationStruct = {
  will: "",
  isPublic: true,
  secretCode: "",
  testator: {
    name: "",
    citizenshipCardId: "",
    birthdate: 0n,
  } as BlockchainWill.PersonStruct,
  firstWitness: {
    name: "",
    citizenshipCardId: "",
    birthdate: 0n,
  } as BlockchainWill.PersonStruct,
  secondWitness: {
    name: "",
    citizenshipCardId: "",
    birthdate: 0n,
  } as BlockchainWill.PersonStruct,
};

interface CreateWillPageProps {
  createWillParams: BlockchainWill.WillCreationStruct;
  isWillEncrypted: boolean;
  rawWill: string;
  rawSecretCode: string;
}

const defaultCreateWillPageProps: CreateWillPageProps = {
  createWillParams: defaultCreateWillParamsTest,
  isWillEncrypted: false,
  rawWill: "",
  rawSecretCode: "",
};

const CreateWillPage = () => {
  const [createWillPageProps, setCreateWillPageProps] =
    useState<CreateWillPageProps>(defaultCreateWillPageProps);

  const [secretKey, setSecretkey] = useState("");
  const {activeStep, setActiveStep} = useSteps({
    index: 0,
    count: steps.length,
  });
  const [willSteps, setWillSteps] = useState(steps);

  const addresses: ContractAddressesInterface = contractAddresses;
  const contractAddress = addresses["11155111"][
    addresses["11155111"].length - 1
  ] as Address; // sepolia chainId is 11155111. We use the last address of the array to make sure that the last deployed contract is used.
  const {address: walletAddress, isConnected} = useAccount();
  const {
    prepareCreateWillError,
    isPrepareCreateWillError,
    writeCreateWillData,
    isWriteCreateWillLoading,
    writeCreateWillError,
    writeCreateWill,
    resetWriteCreateWill,
    isTransactionCreateWillLoading,
    isTransactionCreateWillSuccess,
    isTransactionCreateWillError,
    transactionCreateWillError,
    refetchPrepareCreateWill,
  } = useCreateWill(
    contractAddress,
    createWillPageProps.createWillParams,
    isWillCompleted()
  );

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
      createWillPageProps.createWillParams.testator.name.length > 0 &&
      createWillPageProps.createWillParams.testator.citizenshipCardId.length >
        0 &&
      createWillPageProps.createWillParams.testator.birthdate != 0
    );
  }

  function isFirstWitnessDataCompleted(): boolean {
    return (
      createWillPageProps.createWillParams.firstWitness.name.length > 0 &&
      createWillPageProps.createWillParams.firstWitness.citizenshipCardId
        .length > 0 &&
      createWillPageProps.createWillParams.firstWitness.birthdate != 0
    );
  }

  function isSecondWitnessDataCompleted(): boolean {
    return (
      createWillPageProps.createWillParams.secondWitness.name.length > 0 &&
      createWillPageProps.createWillParams.secondWitness.citizenshipCardId
        .length > 0 &&
      createWillPageProps.createWillParams.secondWitness.birthdate != 0
    );
  }

  function isSecretKeySettled(): boolean {
    return secretKey.length > 0;
  }

  function setAuthorName(event: ChangeEvent<HTMLInputElement>): void {
    setCreateWillPageProps({
      ...createWillPageProps,
      createWillParams: {
        ...createWillPageProps.createWillParams,
        testator: {
          ...createWillPageProps.createWillParams.testator,
          name: event.target.value,
        },
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
        testator: {
          ...createWillPageProps.createWillParams.testator,
          citizenshipCardId: event.target.value,
        },
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
        testator: {
          ...createWillPageProps.createWillParams.testator,
          birthdate: birthdateTimestamp,
        },
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
        firstWitness: {
          ...createWillPageProps.createWillParams.firstWitness,
          name: event.target.value,
        },
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
        firstWitness: {
          ...createWillPageProps.createWillParams.firstWitness,
          citizenshipCardId: event.target.value,
        },
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
        firstWitness: {
          ...createWillPageProps.createWillParams.firstWitness,
          birthdate: birthdateTimestamp,
        },
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
        secondWitness: {
          ...createWillPageProps.createWillParams.secondWitness,
          name: event.target.value,
        },
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
        secondWitness: {
          ...createWillPageProps.createWillParams.secondWitness,
          citizenshipCardId: event.target.value,
        },
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
        secondWitness: {
          ...createWillPageProps.createWillParams.secondWitness,
          birthdate: birthdateTimestamp,
        },
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
    console.log("Will type: ", nextValue);

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
      rawWill: event.target.value,
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

  function handleSecretKeyChange(e: ChangeEvent<HTMLInputElement>): void {
    setSecretkey(e.target.value);

    setCreateWillPageProps({
      ...createWillPageProps,
      createWillParams: {
        ...createWillPageProps.createWillParams,
        secretCode: e.target.value,
      },
      rawSecretCode: e.target.value,
    });
  }

  function encryptWillConditionsMet(
    willBody: string,
    secretKey: string
  ): boolean {
    return willBody.length > 0 && secretKey.length > 0;
  }

  function handleCreateWillClick(): void {
    if (!prepareCreateWillError) {
      console.log("Creating will...");
      console.log("State will", createWillPageProps.createWillParams);

      // test for encryption
      const encryptedSecret = encryptWIll();

      console.log("Encrypted secret: ", encryptedSecret);
      console.log("State will", createWillPageProps.createWillParams);
      // refetchPrepareCreateWill?.();
      // writeCreateWill?.();
      // setCreateWillPageProps({
      //   createWillParams: {
      //     will: "",
      //     isPublic: true,
      //     secretCode: "",
      //     testator: {
      //       name: "",
      //       citizenshipCardId: "",
      //       birthdate: 0n,
      //     } as BlockchainWill.PersonStruct,
      //     firstWitness: {
      //       name: "",
      //       citizenshipCardId: "",
      //       birthdate: 0n,
      //     } as BlockchainWill.PersonStruct,
      //     secondWitness: {
      //       name: "",
      //       citizenshipCardId: "",
      //       birthdate: 0n,
      //     } as BlockchainWill.PersonStruct,
      //   },
      //   isWillEncrypted: false,
      // });

      //TODO add a clean up function to reset the state of the page
    } else if (
      isPrepareCreateWillError &&
      prepareCreateWillError?.message.includes("HasCreatedWill")
    ) {
      //TODO: add a modal to warn the user that he has already created a will
      console.log("The user has already created a will");
    } else {
      console.log(
        "Error prepare Create will: ",
        prepareCreateWillError.message
      );
    }
  }

  function encryptWIll() {
    const encryptedSecret = encrypt(
      createWillPageProps.createWillParams.secretCode,
      secretKey
    );

    if (!createWillPageProps.createWillParams.isPublic) {
      const encryptedWill = encrypt(
        createWillPageProps.createWillParams.will,
        secretKey
      );

      console.log("Encrypted will: ", encryptedWill);

      setCreateWillPageProps({
        ...createWillPageProps,
        createWillParams: {
          ...createWillPageProps.createWillParams,
          will: encryptedWill,
          secretCode: encryptedSecret,
        },
        isWillEncrypted: true,
      });
    } else {
      setCreateWillPageProps({
        ...createWillPageProps,
        createWillParams: {
          ...createWillPageProps.createWillParams,
          secretCode: encryptedSecret,
        },
        isWillEncrypted: true,
      });
    }
    return encryptedSecret;
  }

  useEffect(() => {
    if (createWillPageProps.isWillEncrypted) {
      writeCreateWill?.();
    }
    return () => {};
  }, [writeCreateWill, createWillPageProps.isWillEncrypted]);

  useEffect(() => {
    if (isTransactionCreateWillSuccess || isTransactionCreateWillError) {
      // Reset the state of the page
      resetWriteCreateWill?.();
      setCreateWillPageProps({
        createWillParams: {
          will: "",
          isPublic: true,
          secretCode: "",
          testator: {
            name: "",
            citizenshipCardId: "",
            birthdate: 0n,
          } as BlockchainWill.PersonStruct,
          firstWitness: {
            name: "",
            citizenshipCardId: "",
            birthdate: 0n,
          } as BlockchainWill.PersonStruct,
          secondWitness: {
            name: "",
            citizenshipCardId: "",
            birthdate: 0n,
          } as BlockchainWill.PersonStruct,
        },
        isWillEncrypted: false,
        rawWill: "",
        rawSecretCode: "",
      });
    }
  }, [
    isTransactionCreateWillError,
    isTransactionCreateWillSuccess,
    resetWriteCreateWill,
  ]);

  return (
    <>
      <Stack mx={"auto"} maxW={{base: "100%", md: "1536px"}} direction="row">
        <WillStepper activeStep={activeStep} steps={willSteps} />
        <Stack p={10} w="100%" direction="column">
          <WillForm
            value={createWillPageProps.createWillParams}
            rawWill={createWillPageProps.rawWill}
            rawSecretCode={createWillPageProps.createWillParams.secretCode}
            isDisabled={
              isTransactionCreateWillLoading || isWriteCreateWillLoading
            }
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
            onSecretKeyChange={handleSecretKeyChange}
          />
          <Stack direction="row" spacing={4}>
            <CreateWillButton
              isWriteCreateWillLoading={isWriteCreateWillLoading}
              isTransactionCreateWillLoading={isTransactionCreateWillLoading}
              isWillCompleted={isWillCompleted()}
              onCreateWill={handleCreateWillClick}
            />
          </Stack>
        </Stack>
      </Stack>
      {isTransactionCreateWillSuccess && (
        <>
          <Link
            href={`https://sepolia.etherscan.io/tx/${writeCreateWillData?.hash}`}
            isExternal
          >
            Your Will transaction Data <ExternalLinkIcon mx="2px" />
          </Link>
        </>
      )}

      {isTransactionCreateWillSuccess && (
        <FeedbackToast
          toastState={{
            status: "success",
            title: "Will Creation",
            description: "Your will has been created successfully.",
            link: `https://sepolia.etherscan.io/tx/${writeCreateWillData?.hash}`,
          }}
        ></FeedbackToast>
      )}
      {isTransactionCreateWillError && (
        <FeedbackToast
          toastState={{
            status: "error",
            title: "Will Creation",
            description:
              "Your will has not been created. Here are some details: " +
              transactionCreateWillError?.message,
            position: "top",
          }}
        ></FeedbackToast>
      )}

      <p>Prepare Errors:</p>
      {prepareCreateWillError && (
        <p>Error prepare Create will: {prepareCreateWillError.message}</p>
      )}

      <p>----------------------------------</p>
      <p>Write Errors:</p>
      {writeCreateWillError && (
        <p>Error write Create will: {writeCreateWillError.message}</p>
      )}
      {isConnected ? <p>Connected to {walletAddress}</p> : <p>Not Connected</p>}
    </>
  );
};

export default CreateWillPage;
