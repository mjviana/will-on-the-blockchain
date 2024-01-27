import {Box, Button, HStack, IconButton} from "@chakra-ui/react";
import {
  FaListUl,
  FaQuestion,
  FaSearch,
  FaUserMinus,
  FaUserPlus,
} from "react-icons/fa";
import {Link as ReactRouterLink} from "react-router-dom";

const Sidebar = () => {
  return (
    <Box py="55px" pl={15}>
      <HStack
        as={ReactRouterLink}
        to={"/public-wills"}
        py="5px"
        _hover={{
          transform: "scale(1.1)",
          transition: "transform 0.15s ease-in-out",
        }}
      >
        <IconButton
          variant="link"
          aria-label="Public Wills"
          icon={<FaListUl />}
        />
        <Button
          colorScheme="gold"
          whiteSpace="normal"
          textAlign="left"
          fontWeight={"normal"}
          fontSize="lg"
          variant="link"
        >
          Public Wills
        </Button>
      </HStack>
      <HStack
        as={ReactRouterLink}
        to={"/create-will"}
        py="5px"
        _hover={{
          transform: "scale(1.1)",
          transition: "transform 0.15s ease-in-out",
        }}
      >
        <IconButton
          variant="link"
          aria-label="Create Will"
          icon={<FaUserPlus />}
        />
        <Button
          whiteSpace="normal"
          textAlign="left"
          fontWeight={"normal"}
          fontSize="lg"
          variant="link"
        >
          Create Will
        </Button>
      </HStack>
      <HStack
        as={ReactRouterLink}
        to={"/search-will"}
        py="5px"
        _hover={{
          transform: "scale(1.1)",
          transition: "transform 0.15s ease-in-out",
        }}
      >
        <IconButton
          variant="link"
          aria-label="Search Will"
          icon={<FaSearch />}
        />
        <Button
          whiteSpace="normal"
          textAlign="left"
          fontWeight={"normal"}
          fontSize="lg"
          variant="link"
        >
          Search Will
        </Button>
      </HStack>
      <HStack
        as={ReactRouterLink}
        to={"/revoke-will"}
        py="5px"
        _hover={{
          transform: "scale(1.1)",
          transition: "transform 0.15s ease-in-out",
        }}
      >
        <IconButton
          variant="link"
          aria-label="Revoke WIll"
          icon={<FaUserMinus />}
        />
        <Button
          whiteSpace="normal"
          textAlign="left"
          fontWeight={"normal"}
          fontSize="lg"
          variant="link"
        >
          Revoke Will
        </Button>
      </HStack>
      <HStack
        as={ReactRouterLink}
        to={"/how-to-create-will"}
        py="5px"
        _hover={{
          transform: "scale(1.1)",
          transition: "transform 0.15s ease-in-out",
        }}
      >
        <IconButton
          variant="link"
          aria-label="How to create a Will"
          icon={<FaQuestion />}
        />
        <Button
          whiteSpace="normal"
          textAlign="left"
          fontWeight={"normal"}
          fontSize="lg"
          variant="link"
        >
          How to Create a Will
        </Button>
      </HStack>
    </Box>
  );
};

export default Sidebar;
