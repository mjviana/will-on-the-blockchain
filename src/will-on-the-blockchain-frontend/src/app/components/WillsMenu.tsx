"use client";

import {ChevronDownIcon} from "@chakra-ui/icons";
import {Menu, MenuButton, Button, MenuList, MenuItem} from "@chakra-ui/react";
import Link from "next/link";

const WillsMenu = () => {
  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Wills Area
        </MenuButton>
        <MenuList>
          <MenuItem as={Link} href={"/public-wills"}>
            Public Wills
          </MenuItem>
          <MenuItem as={Link} href={"/create-will"}>
            Create Will
          </MenuItem>
          <MenuItem as={Link} href={"/search-will"}>
            Search Will
          </MenuItem>
          <MenuItem as={Link} href={"/revoke-will"}>
            Revoke Will
          </MenuItem>
          <MenuItem as={Link} href={"/how-to-create-will"}>
            How to Create a Will
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default WillsMenu;
