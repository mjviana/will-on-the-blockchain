"use client";

import {
  Stack,
  useSteps,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  useDisclosure,
  Text,
  SlideFade,
  Link,
} from "@chakra-ui/react";
import React, {ChangeEvent, useEffect, useState} from "react";
import {contractAddresses} from "../../constants";
import {useAccount} from "wagmi";
import ContractAddressesInterface from "../../types/ContractAddressesInterface";
import {useCreateWill} from "../../hooks/useCreateWill";
import WillStepper from "../components/WillStepper";
import {CreateWillButton} from "../components/CreateWillButton";
import {WillForm} from "../components/WillForm";
import {encrypt} from "../../utils/CryptoHelper";
import {BlockchainWill} from "../../types";
import {steps} from "../../constants/willSteps";
import {ExternalLinkIcon} from "@chakra-ui/icons";
import generateRandomGuid from "../../utils/RandomGuidGenerator";
import useSendEmail from "../../hooks/useSendEmail";
import {Address} from "viem";

const defaultCreateWillParamsStruct: BlockchainWill.WillCreationStruct = {
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
  authorEmail: string;
  firstWitnessEmail: string;
  firstWitnessCodeEnabled: boolean;
  firstWitnessCode: string;
  secondWitnessEmail: string;
  secondWitnessCodeEnabled: boolean;
  secondWitnessCode: string;
}

const defaultCreateWillPageProps: CreateWillPageProps = {
  createWillParams: defaultCreateWillParamsStruct,
  isWillEncrypted: false,
  rawWill: "",
  rawSecretCode: "",
  authorEmail: "",
  firstWitnessEmail: "",
  firstWitnessCodeEnabled: false,
  firstWitnessCode: "",
  secondWitnessEmail: "",
  secondWitnessCodeEnabled: false,
  secondWitnessCode: "",
};

const addresses: ContractAddressesInterface = contractAddresses;

const contractAddress = addresses["11155111"][
  addresses["11155111"].length - 1
] as Address; // sepolia chainId is 11155111. We use the last address of the array to make sure that the last deployed contract is used.

const CreateWillPage = () => {
  const {isConnected} = useAccount();

  const [createWillPageProps, setCreateWillPageProps] =
    useState<CreateWillPageProps>(defaultCreateWillPageProps);

  const [secretKey, setSecretkey] = useState("");

  const [firstWitnessGeneratedCode, setFirstWitnessGeneratedCode] =
    useState<string>("");
  const [secondWitnessGeneratedCode, setSecondWitnessGeneratedCode] =
    useState<string>("");

  const {activeStep, setActiveStep} = useSteps({
    index: 0,
    count: steps.length,
  });

  const [willSteps, setWillSteps] = useState(steps);

  const {sendEmail: sendAuthorEmail} = useSendEmail();
  const {
    isLoading: sendingFirstWitnessEmail,
    sendEmail: sendFirstWitnessEmail,
  } = useSendEmail();
  const {
    isLoading: sendingSecondWitnessEmail,
    sendEmail: sendSecondWitnessEmail,
  } = useSendEmail();

  // const {address: walletAddress, isConnected} = useAccount();
  const {
    prepareCreateWillError,
    isPrepareCreateWillError,
    writeCreateWillData,
    isWriteCreateWillLoading,
    // writeCreateWillError,
    writeCreateWill,
    resetWriteCreateWill,
    isWriteCreateWillSuccess,
    // isWriteCreateWillError,
    isTransactionCreateWillLoading,
    isTransactionCreateWillSuccess,
    isTransactionCreateWillError,
    transactionCreateWillError,
    useSimulateContractData,
  } = useCreateWill(
    contractAddress,
    createWillPageProps.createWillParams
    // isWillCompleted()
  );

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({defaultIsOpen: false});

  const {
    isOpen: isAlreadyCreatedWillVisible,
    onClose: onAlreadyCreatedWillClose,
    onOpen: onAlreadyCreatedWillOpen,
  } = useDisclosure({defaultIsOpen: false});

  function isWillCompleted(): boolean {
    console.log("Checking if will is completed");

    console.log("is prepare create will error?", isPrepareCreateWillError);
    console.log("prepare create will error?", prepareCreateWillError);
    console.log("current prepata create will data", useSimulateContractData);

    return (
      isAuthorDataCompleted() &&
      isFirstWitnessDataCompleted() &&
      isSecondWitnessDataCompleted() &&
      encryptWillConditionsMet()
    );
  }

  function isAuthorDataCompleted(): boolean {
    return (
      createWillPageProps.createWillParams.testator.name.length > 0 &&
      createWillPageProps.createWillParams.testator.citizenshipCardId.length >
        0 &&
      createWillPageProps.createWillParams.testator.birthdate != 0 &&
      createWillPageProps.authorEmail.length > 0
    );
  }

  function isFirstWitnessDataCompleted(): boolean {
    return (
      createWillPageProps.createWillParams.firstWitness.name.length > 0 &&
      createWillPageProps.createWillParams.firstWitness.citizenshipCardId
        .length > 0 &&
      createWillPageProps.firstWitnessEmail.length > 0 &&
      createWillPageProps.createWillParams.firstWitness.birthdate != 0 &&
      isWitnessCodeValid(
        createWillPageProps.firstWitnessCode,
        firstWitnessGeneratedCode
      )
    );
  }

  function isSecondWitnessDataCompleted(): boolean {
    return (
      createWillPageProps.createWillParams.secondWitness.name.length > 0 &&
      createWillPageProps.createWillParams.secondWitness.citizenshipCardId
        .length > 0 &&
      createWillPageProps.secondWitnessEmail.length > 0 &&
      createWillPageProps.createWillParams.secondWitness.birthdate != 0 &&
      isWitnessCodeValid(
        createWillPageProps.secondWitnessCode,
        secondWitnessGeneratedCode
      )
    );
  }

  function encryptWillConditionsMet(): boolean {
    return (
      createWillPageProps.createWillParams.will.length > 0 &&
      createWillPageProps.createWillParams.secretCode.length > 0
    );
  }

  function isWitnessCodeValid(code: string, generatedCode: string): boolean {
    console.log("Generated code: ", generatedCode);
    console.log("Code: ", code);

    return code === generatedCode;
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

  function setAuthorEmail(event: ChangeEvent<HTMLInputElement>): void {
    setCreateWillPageProps({
      ...createWillPageProps,
      authorEmail: event.target.value,
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

  function setFirstWitnessEmail(event: ChangeEvent<HTMLInputElement>): void {
    setCreateWillPageProps({
      ...createWillPageProps,
      firstWitnessEmail: event.target.value,
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

  function setFirstWitnessConfirmationCode(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    setCreateWillPageProps({
      ...createWillPageProps,
      firstWitnessCode: event.target.value,
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

  function setSecondWitnessEmail(event: ChangeEvent<HTMLInputElement>): void {
    setCreateWillPageProps({
      ...createWillPageProps,
      secondWitnessEmail: event.target.value,
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

  function setSecondWitnessConfirmationCode(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    setCreateWillPageProps({
      ...createWillPageProps,
      secondWitnessCode: event.target.value,
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

  function handleCreateWillClick(): void {
    if (!prepareCreateWillError) {
      console.log("Creating will...");
      console.log("State will", createWillPageProps.createWillParams);

      const encryptedSecret = encryptWIll();

      console.log("Encrypted secret: ", encryptedSecret);
      console.log("State will", createWillPageProps.createWillParams);

      console.log("current prepare create will data", useSimulateContractData);

      const test = useSimulateContractData!.request;

      test.args[0].secretCode = encryptedSecret;

      console.log(
        "simulated contract data: ",
        useSimulateContractData!.request
      );

      writeCreateWill?.(useSimulateContractData!.request);
    } else if (
      isPrepareCreateWillError &&
      prepareCreateWillError?.message.includes("HasCreatedWill")
    ) {
      //TODO: add a modal to warn the user that he has already created a will
      console.log("The user has already created a will");
      console.log("%c The user has already created a will", "color: red");
      onAlreadyCreatedWillOpen();
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
    if (
      isPrepareCreateWillError &&
      prepareCreateWillError?.message.includes("HasCreatedWill")
    ) {
      console.log(
        "Error prepare Create will: ",
        prepareCreateWillError?.message
      );
      onAlreadyCreatedWillOpen();
    }

    return () => {
      onAlreadyCreatedWillClose();
    };
  }, [prepareCreateWillError]);

  // useEffect(() => {
  //   if (createWillPageProps.isWillEncrypted) {
  //     console.log(
  //       "current prepare create will data (in useeffect)",
  //       useSimulateContractData
  //     );
  //     console.log(writeCreateWill);

  //     // console.log(useSimulateContractData);
  //     // writeCreateWill?.(useSimulateContractData!.request);
  //   }
  //   return () => {};
  // }, [writeCreateWill, createWillPageProps.isWillEncrypted]);

  // Send email to the testator and clear the form
  useEffect(() => {
    if (isTransactionCreateWillSuccess || isTransactionCreateWillError) {
      console.log(
        "Inside transaction create will - create will page props",
        createWillPageProps
      );

      if (isTransactionCreateWillSuccess) {
        console.log(
          "sending email to the author with code",
          createWillPageProps.rawSecretCode
        );

        sendAuthorEmail({
          code: createWillPageProps.rawSecretCode,
          type: "testator",
          recipientEmail: createWillPageProps.authorEmail,
          senderName: createWillPageProps.createWillParams.testator.name,
        });
      }

      if (isTransactionCreateWillError) {
        console.log(
          "Error creating will: ",
          transactionCreateWillError?.message
        );
      }
      onOpen();
      setCreateWillPageProps({
        createWillParams: {
          will: "",
          isPublic: true,
          secretCode: "",
          testator: {
            name: "",
            citizenshipCardId: "",
          } as BlockchainWill.PersonStruct,
          firstWitness: {
            name: "",
            citizenshipCardId: "",
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
        authorEmail: "",
        firstWitnessEmail: "",
        firstWitnessCodeEnabled: false,
        firstWitnessCode: "",
        secondWitnessEmail: "",
        secondWitnessCodeEnabled: false,
        secondWitnessCode: "",
      });
    }
  }, [
    isTransactionCreateWillError,
    isTransactionCreateWillSuccess,
    createWillPageProps.authorEmail,
    createWillPageProps.rawSecretCode,
    resetWriteCreateWill,
    onOpen,
  ]);

  // Close the alert message after 5 seconds
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        onClose();
        resetWriteCreateWill?.();
      }, 5000);
    }
  }, [isVisible, onClose, resetWriteCreateWill]);

  // Send email to the first witness
  useEffect(() => {
    if (firstWitnessGeneratedCode.length > 0) {
      sendFirstWitnessEmail({
        code: firstWitnessGeneratedCode,
        recipientEmail: createWillPageProps.firstWitnessEmail,
        type: "witness",
        recipientName: createWillPageProps.createWillParams.firstWitness.name,
        senderName: createWillPageProps.createWillParams.testator.name,
      });
    }
    return () => {};
  }, [firstWitnessGeneratedCode]);

  // Send email to the second witness
  useEffect(() => {
    if (secondWitnessGeneratedCode.length > 0) {
      sendSecondWitnessEmail({
        code: secondWitnessGeneratedCode,
        recipientEmail: createWillPageProps.secondWitnessEmail,
        type: "witness",
        recipientName: createWillPageProps.createWillParams.secondWitness.name,
        senderName: createWillPageProps.createWillParams.testator.name,
      });
    }
    return () => {};
  }, [secondWitnessGeneratedCode]);

  if (!isConnected) {
    return <Text>Connect your wallet to continue</Text>;
  } else
    return (
      <>
        <Stack mx={"auto"} maxW={{base: "100%", md: "1536px"}} direction="row">
          <WillStepper activeStep={activeStep} steps={willSteps} />
          <Stack p={10} w="100%" direction="column">
            <WillForm
              value={createWillPageProps.createWillParams}
              rawWill={createWillPageProps.rawWill}
              rawSecretCode={createWillPageProps.rawSecretCode}
              isDisabled={
                isTransactionCreateWillLoading || isWriteCreateWillLoading
              }
              onAuthorEmailChange={setAuthorEmail}
              onAuthorCitizenshipIdChange={setAuthorCitizenshipId}
              onAuthorNameChange={setAuthorName}
              onAuthorBirthdateChange={setAuthorBirthdate}
              onFirstWitnessNameChange={setFirstWitnessName}
              onFirstWitnessCitizenshipIdChange={setFirstWitnessCitizenshipId}
              onFirstWitnessEmailChange={setFirstWitnessEmail}
              onFirstWitnessRequestCodeClick={() => {
                setFirstWitnessGeneratedCode(generateRandomGuid());
                console.log(
                  "First witness generated code: ",
                  firstWitnessGeneratedCode
                );
              }}
              onFirstWitnessConfirmationCodeChange={
                setFirstWitnessConfirmationCode
              }
              onFirstWitnessBirthdateChange={setFirstWitnessBirthdate}
              onSecondWitnessNameChange={setSecondWitnessName}
              onSecondWitnessCitizenshipIdChange={setSecondWitnessCitizenshipId}
              onSecondWitnessEmailChange={setSecondWitnessEmail}
              onSecondWitnessRequestCodeClick={() => {
                setSecondWitnessGeneratedCode(generateRandomGuid());
                console.log(
                  "Second witness generated code: ",
                  secondWitnessGeneratedCode
                );
              }}
              onSecondWitnessConfirmationCodeChange={
                setSecondWitnessConfirmationCode
              }
              onSecondWitnessBirthdateChange={setSecondWitnessBirthdate}
              onWillBodyChange={setWillBody}
              onWillTypeChange={setWillType}
              onAuthorAccordionButtonClick={toggleAuthorAccordionButton}
              onFirstWitnessAccordionButtonClick={toggleFirstWitnessButton}
              onSecondWitnessAccordionButtonClick={toggleSecondWitnessButton}
              onSecretKeyChange={handleSecretKeyChange}
              authorEmail={createWillPageProps.authorEmail}
              firstWitnessEmail={createWillPageProps.firstWitnessEmail}
              firstWitnessCodeEnabled={
                createWillPageProps.firstWitnessEmail.length > 10 &&
                firstWitnessGeneratedCode.length > 0
              }
              firstWitnessCode={createWillPageProps.firstWitnessCode}
              secondWitnessEmail={createWillPageProps.secondWitnessEmail}
              secondWitnessCodeEnabled={
                createWillPageProps.secondWitnessEmail.length > 10 &&
                secondWitnessGeneratedCode.length > 0
              }
              secondWitnessCode={createWillPageProps.secondWitnessCode}
              isFirstWitnessEmailSending={sendingFirstWitnessEmail}
              isSecondWitnessEmailSending={sendingSecondWitnessEmail}
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

        <SlideFade
          offsetY="20px"
          unmountOnExit={true}
          in={isVisible}
          style={{zIndex: 10}}
        >
          <Alert
            mx={"auto"}
            w="fit-content"
            status={isWriteCreateWillSuccess ? "success" : "error"}
          >
            <AlertIcon />
            <Box>
              <AlertTitle>
                {isWriteCreateWillSuccess ? "Success" : "Error"}
              </AlertTitle>
              <AlertDescription>
                {isWriteCreateWillSuccess && (
                  <>
                    <Text>Your will has been created successfully.</Text>
                    <Link
                      href={`https://sepolia.etherscan.io/tx/${writeCreateWillData}`}
                      isExternal
                    >
                      <Text as="b">
                        Transaction Data <ExternalLinkIcon mx="2px" />
                      </Text>
                    </Link>
                  </>
                )}
                {isTransactionCreateWillError && (
                  <>
                    <Text>
                      Your will has not been created. Here are some details:{" "}
                      {transactionCreateWillError?.message}
                    </Text>
                  </>
                )}
              </AlertDescription>
            </Box>
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={onClose}
            />
          </Alert>
        </SlideFade>

        <SlideFade
          offsetY="20px"
          unmountOnExit={true}
          in={isAlreadyCreatedWillVisible}
          style={{zIndex: 10}}
        >
          <Alert mx={"auto"} w="fit-content" status={"error"}>
            <AlertIcon />
            <Box>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                <Text>
                  There is a will registered with the given citizenship id, to
                  create a new one it's necessary to revoke the previous one.
                </Text>
              </AlertDescription>
            </Box>
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={onAlreadyCreatedWillClose}
            />
          </Alert>
        </SlideFade>
      </>
    );
};

export default CreateWillPage;
