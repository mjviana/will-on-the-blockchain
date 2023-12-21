import {ChevronDownIcon} from "@chakra-ui/icons";
import {Menu, MenuButton, Button, MenuList, MenuItem} from "@chakra-ui/react";
import {Link as ReactRouterLink} from "react-router-dom";

const WillsMenu = () => {
  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Wills Area
        </MenuButton>
        <MenuList>
          <MenuItem as={ReactRouterLink} to={"/public-wills"}>
            Public Wills
          </MenuItem>
          <MenuItem as={ReactRouterLink} to={"/create-will"}>
            Create Will
          </MenuItem>
          <MenuItem>Search Will</MenuItem>
          <MenuItem>Revoke Will</MenuItem>
          <MenuItem as={ReactRouterLink} to={"/how-to-create-will"}>
            How to Create a Will
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default WillsMenu;
