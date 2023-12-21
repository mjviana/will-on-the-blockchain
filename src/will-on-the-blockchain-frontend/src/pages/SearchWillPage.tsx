import {Box, Stack} from "@chakra-ui/react";
import SearchWill from "../components/SearchWill";
import {ChangeEvent} from "react";
import SearchWillButton from "../components/SearchWillButton";

const SearchWillPage = () => {
  function handleOnCitizenshipIdChange(e: ChangeEvent<HTMLInputElement>): void {
    console.log(e.target.value);
  }

  return (
    <>
      <Box maxW="1536px" mx="auto">
        <Stack p={10} direction={"row"}>
          <SearchWill onCitizenshipIdChange={handleOnCitizenshipIdChange} />
          <SearchWillButton />
        </Stack>
      </Box>
    </>
  );
};

export default SearchWillPage;
