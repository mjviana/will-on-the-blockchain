import {
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaListUl,
  FaQuestion,
  FaSearch,
  FaUserMinus,
  FaUserPlus,
} from "react-icons/fa";
import {Link as ReactRouterLink} from "react-router-dom";

const Sidebar = () => {
  const value = useColorModeValue("white", "white");
  return (
    <Box color={value}>
      <Heading fontSize="2xl" mb={3}>
        Actions
      </Heading>
      <HStack
        py="5px"
        _hover={{
          transform: "scale(1.1)",
          transition: "transform 0.15s ease-in-out",
        }}
      >
        <Icon as={FaListUl} />
        <Button
          color={value}
          whiteSpace="normal"
          textAlign="left"
          fontWeight={"normal"}
          fontSize="lg"
          variant="link"
          as={ReactRouterLink}
          to={"/public-wills"}
        >
          Public Wills
        </Button>
      </HStack>
      <HStack
        py="5px"
        _hover={{
          transform: "scale(1.1)",
          transition: "transform 0.15s ease-in-out",
        }}
      >
        <Icon as={FaUserPlus} />
        <Button
          color={value}
          whiteSpace="normal"
          textAlign="left"
          fontWeight={"normal"}
          fontSize="lg"
          variant="link"
          as={ReactRouterLink}
          to={"/create-will"}
        >
          Create Will
        </Button>
      </HStack>
      <HStack
        py="5px"
        _hover={{
          transform: "scale(1.1)",
          transition: "transform 0.15s ease-in-out",
        }}
      >
        <Icon as={FaSearch} />
        <Button
          color={value}
          whiteSpace="normal"
          textAlign="left"
          fontWeight={"normal"}
          fontSize="lg"
          variant="link"
          as={ReactRouterLink}
          to={"/search-will"}
        >
          Search Will
        </Button>
      </HStack>
      <HStack
        py="5px"
        _hover={{
          transform: "scale(1.1)",
          transition: "transform 0.15s ease-in-out",
        }}
      >
        <Icon as={FaUserMinus} />
        <Button
          color={value}
          whiteSpace="normal"
          textAlign="left"
          fontWeight={"normal"}
          fontSize="lg"
          variant="link"
          as={ReactRouterLink}
          to={"/revoke-will"}
        >
          Revoke Will
        </Button>
      </HStack>
      <HStack
        py="5px"
        _hover={{
          transform: "scale(1.1)",
          transition: "transform 0.15s ease-in-out",
        }}
      >
        <Icon as={FaQuestion} />
        <Button
          color={value}
          whiteSpace="normal"
          textAlign="left"
          fontWeight={"normal"}
          fontSize="lg"
          variant="link"
          as={ReactRouterLink}
          to={"/how-to-create-will"}
        >
          How to Create a Will
        </Button>
      </HStack>
    </Box>
  );
};

export default Sidebar;
