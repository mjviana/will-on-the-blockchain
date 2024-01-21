import {Button, HStack, Heading, Icon} from "@chakra-ui/react";
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
    <>
      <Heading fontSize="2xl" mb={3}>
        Actions
      </Heading>
      <HStack py="5px">
        <Icon as={FaListUl} />
        <Button
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
      <HStack py="5px">
        <Icon as={FaUserPlus} />
        <Button
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
      <HStack py="5px">
        <Icon as={FaSearch} />
        <Button
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
      <HStack py="5px">
        <Icon as={FaUserMinus} />
        <Button
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
      <HStack py="5px">
        <Icon as={FaQuestion} />
        <Button
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
    </>
  );
};

export default Sidebar;
