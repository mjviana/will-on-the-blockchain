import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
} from "@chakra-ui/react";

interface WillStepperProps {
  activeStep: number;
  steps: {
    title: string;
    description: string;
    size: string;
    active: boolean;
    completed: boolean;
  }[];
}

const WillStepper = ({activeStep, steps}: WillStepperProps) => {
  return (
    <>
      <Stepper
        colorScheme="gold"
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
                complete={step.completed ? <StepIcon /> : <StepNumber />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Box h={step.active ? step.size : "55px"} flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default WillStepper;
