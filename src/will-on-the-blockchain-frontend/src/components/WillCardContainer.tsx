import {Box} from "@chakra-ui/react";
import {ReactNode} from "react";

interface WillCardContainerProps {
  children: ReactNode;
}

const WillCardContainer = ({children}: WillCardContainerProps) => {
  return (
    <Box
      _hover={{
        transform: "scale(1.03)",
        transition: "transform 0.15s ease-in-out",
      }}
      borderRadius={10}
      overflow="hidden"
    >
      {children}
    </Box>
  );
};

export default WillCardContainer;
