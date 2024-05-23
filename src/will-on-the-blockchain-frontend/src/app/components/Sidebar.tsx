"use client";

import {Box, Button, HStack, IconButton} from "@chakra-ui/react";
import Link from "next/link";
import {
  FaListUl,
  FaQuestion,
  FaSearch,
  FaUserMinus,
  FaUserPlus,
} from "react-icons/fa";
// import {Link as ReactRouterLink} from "react-router-dom";

const Sidebar = () => {
  return (
    <Box py="55px" pl={15}>
      <HStack
        py="5px"
        _hover={{
          transform: "scale(1.1)",
          transition: "transform 0.15s ease-in-out",
        }}
        as={Link}
        href={"/"}
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
        py="5px"
        _hover={{
          transform: "scale(1.1)",
          transition: "transform 0.15s ease-in-out",
        }}
        as={Link}
        href={"/create-will"}
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
        py="5px"
        _hover={{
          transform: "scale(1.1)",
          transition: "transform 0.15s ease-in-out",
        }}
        as={Link}
        href={"/search-will"}
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
        py="5px"
        _hover={{
          transform: "scale(1.1)",
          transition: "transform 0.15s ease-in-out",
        }}
        as={Link}
        href={"/revoke-will"}
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
        py="5px"
        _hover={{
          transform: "scale(1.1)",
          transition: "transform 0.15s ease-in-out",
        }}
        as={Link}
        href={"/how-to-create-will"}
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
