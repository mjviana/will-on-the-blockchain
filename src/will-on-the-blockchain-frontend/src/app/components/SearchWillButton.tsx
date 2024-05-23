"use client";

import {Button} from "@chakra-ui/react";

interface SearchWillButtonProps {
  onSearchWillClick: () => void;
}

const SearchWillButton = ({onSearchWillClick}: SearchWillButtonProps) => {
  return (
    <>
      <Button onClick={onSearchWillClick}>Search Will</Button>
    </>
  );
};

export default SearchWillButton;
