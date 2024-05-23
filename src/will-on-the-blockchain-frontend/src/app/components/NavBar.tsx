"use client";

import {Flex, HStack, Spacer, Show, IconButton, Text} from "@chakra-ui/react";
import {BiBookHeart} from "react-icons/bi";
import ColorModeSwitch from "./ColorModeSwitch";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import WillsMenu from "./WillsMenu";
import Link from "next/link";

interface NavbarProps {
  onColorModeSwtchClicked(): void;
}

const Navbar = ({onColorModeSwtchClicked}: NavbarProps) => {
  return (
    <>
      <Flex px={15} display="flex" alignItems="center">
        <IconButton as={Link} href={"/"} variant="link" aria-label="Home page">
          <BiBookHeart fontSize="60px" />
        </IconButton>
        <Show above="lg">
          <Text px={5} variant="header">
            Will on the Blockchain
          </Text>
        </Show>

        <Spacer />
        <HStack justifyContent={"flex-end"}>
          <Show below="lg">
            <WillsMenu />
          </Show>
          <ColorModeSwitch onClick={onColorModeSwtchClicked} />
          <ConnectButton />;
        </HStack>
      </Flex>
    </>
  );
};

export default Navbar;
